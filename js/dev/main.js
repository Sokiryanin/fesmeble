import { n as bodyLockToggle, t as bodyLockStatus } from "./common.min.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/components/layout/menu/menu.js
function menuInit() {
	const mobileCta = document.getElementById("mobileCta");
	function isFooterVisible() {
		const footer = document.querySelector(".footer");
		if (!footer) return false;
		return footer.getBoundingClientRect().top < window.innerHeight - 40;
	}
	function ctaHide() {
		if (mobileCta) mobileCta.classList.add("hidden");
	}
	function ctaShow() {
		if (mobileCta && !isFooterVisible()) mobileCta.classList.remove("hidden");
	}
	document.addEventListener("click", function(e) {
		if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
			bodyLockToggle();
			document.documentElement.toggleAttribute("data-fls-menu-open");
			const burger = e.target.closest("[data-fls-menu]");
			const isOpen = document.documentElement.hasAttribute("data-fls-menu-open");
			burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
			isOpen ? ctaHide() : ctaShow();
		}
	});
	document.addEventListener("click", function(e) {
		if (!e.target.closest(".menu__link, .menu__cta")) return;
		if (!document.documentElement.hasAttribute("data-fls-menu-open")) return;
		bodyLockToggle();
		document.documentElement.removeAttribute("data-fls-menu-open");
		const burger = document.querySelector("[data-fls-menu]");
		if (burger) burger.setAttribute("aria-expanded", "false");
		ctaShow();
	});
	let resizeTimeout;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			if (window.innerWidth > 1024 && document.documentElement.hasAttribute("data-fls-menu-open")) {
				bodyLockToggle();
				document.documentElement.removeAttribute("data-fls-menu-open");
				ctaShow();
			}
		}, 100);
	});
}
document.querySelector("[data-fls-menu]") && window.addEventListener("load", menuInit);
//#endregion
//#region src/components/layout/header/header.js
var header = document.querySelector("[data-fls-header]");
var mobileCta = document.getElementById("mobileCta");
function revealHeader() {
	header.style.opacity = "1";
	header.style.animation = "none";
	if (mobileCta) mobileCta.classList.add("is-ready");
}
if (header) {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) revealHeader();
	else header.addEventListener("animationend", revealHeader, { once: true });
	window.addEventListener("scroll", () => {
		header.classList.toggle("header--scrolled", window.scrollY > 20);
	}, { passive: true });
}
var footerEl = document.querySelector(".footer");
if (mobileCta && footerEl) new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		mobileCta.classList.toggle("hidden", entry.isIntersecting);
	});
}, {
	rootMargin: "0px 0px -40px 0px",
	threshold: 0
}).observe(footerEl);
//#endregion
