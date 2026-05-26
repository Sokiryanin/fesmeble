//#region src/js/common/functions.js
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	}
};
function addTouchAttr() {
	if (isMobile.any()) document.documentElement.setAttribute("data-fls-touch", "");
}
function addLoadedAttr() {
	if (!document.documentElement.hasAttribute("data-fls-preloader-loading")) window.addEventListener("load", function() {
		setTimeout(function() {
			document.documentElement.setAttribute("data-fls-loaded", "");
		}, 0);
	});
}
var slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("--slide")) {
		target.classList.add("--slide");
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore && target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			!showmore && target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
			document.dispatchEvent(new CustomEvent("slideUpDone", { detail: { target } }));
		}, duration);
	}
};
var slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains("--slide")) {
		target.classList.add("--slide");
		target.hidden = target.hidden ? false : null;
		showmore && target.style.removeProperty("height");
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
			target.classList.remove("--slide");
			document.dispatchEvent(new CustomEvent("slideDownDone", { detail: { target } }));
		}, duration);
	}
};
var slideToggle = (target, duration = 500) => {
	if (target.hidden) return slideDown(target, duration);
	else return slideUp(target, duration);
};
var bodyLockStatus = true;
var bodyLockToggle = (delay = 500) => {
	if (document.documentElement.hasAttribute("data-fls-scrolllock")) bodyUnlock(delay);
	else bodyLock(delay);
};
var bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		setTimeout(() => {
			lockPaddingElements.forEach((lockPaddingElement) => {
				lockPaddingElement.style.paddingRight = "";
			});
			document.body.style.paddingRight = "";
			document.documentElement.removeAttribute("data-fls-scrolllock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
var bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		const lockPaddingElements = document.querySelectorAll("[data-fls-lp]");
		const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
		lockPaddingElements.forEach((lockPaddingElement) => {
			lockPaddingElement.style.paddingRight = lockPaddingValue;
		});
		document.body.style.paddingRight = lockPaddingValue;
		document.documentElement.setAttribute("data-fls-scrolllock", "");
		bodyLockStatus = false;
		setTimeout(function() {
			bodyLockStatus = true;
		}, delay);
	}
};
function getDigFormat(item, sepp = " ") {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${sepp}`);
}
function uniqArray(array) {
	return array.filter((item, index, self) => self.indexOf(item) === index);
}
function dataMediaQueries(array, dataSetValue) {
	const media = Array.from(array).filter((item) => item.dataset[dataSetValue]).map((item) => {
		const [value, type = "max"] = item.dataset[dataSetValue].split(",");
		return {
			value,
			type,
			item
		};
	});
	if (media.length === 0) return [];
	const breakpointsArray = media.map(({ value, type }) => `(${type}-width: ${value}px),${value},${type}`);
	return [...new Set(breakpointsArray)].map((query) => {
		const [mediaQuery, mediaBreakpoint, mediaType] = query.split(",");
		const matchMedia = window.matchMedia(mediaQuery);
		return {
			itemsArray: media.filter((item) => item.value === mediaBreakpoint && item.type === mediaType),
			matchMedia
		};
	});
}
//#endregion
//#region src/js/modules/tabs.js
function tabsInit() {
	const worksTabs = document.getElementById("worksTabs");
	const worksGrid = document.getElementById("worksGrid");
	if (!worksTabs || !worksGrid) return;
	const buttons = worksTabs.querySelectorAll(".works-tabs__tab");
	const cards = worksGrid.querySelectorAll(".work-card");
	const counts = {};
	cards.forEach((card) => {
		const cat = card.dataset.cat;
		counts[cat] = (counts[cat] || 0) + 1;
	});
	buttons.forEach((btn) => {
		const cat = btn.dataset.cat;
		const countEl = btn.querySelector(".works-tabs__count");
		if (!countEl) return;
		if (cat === "all") countEl.textContent = `· ${cards.length}`;
		else countEl.textContent = `· ${counts[cat] || 0}`;
	});
	function filterCards(cat) {
		const visible = [];
		cards.forEach((card) => {
			if (cat === "all" || card.dataset.cat === cat) {
				card.classList.remove("hidden");
				visible.push(card);
			} else {
				card.classList.add("hidden");
				card.style.opacity = 0;
				card.style.transform = "translateY(20px)";
			}
		});
		visible.forEach((card, i) => {
			card.style.willChange = "transform, opacity";
			card.style.transition = "opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
			card.style.transitionDelay = `${i * 40}ms`;
			requestAnimationFrame(() => {
				card.style.opacity = 1;
				card.style.transform = "translateY(0)";
			});
		});
	}
	worksTabs.addEventListener("click", (e) => {
		const btn = e.target.closest(".works-tabs__tab");
		if (!btn) return;
		const cat = btn.dataset.cat;
		buttons.forEach((b) => b.classList.remove("works-tabs__tab--active"));
		btn.classList.add("works-tabs__tab--active");
		filterCards(cat);
	});
	filterCards("all");
}
//#endregion
//#region src/js/modules/year-counter.js
var initYearCounter = (selector = "[data-years]") => {
	document.querySelectorAll(selector).forEach((el) => {
		el.textContent = (/* @__PURE__ */ new Date()).getFullYear() - 2022 + 1;
	});
};
//#endregion
//#region src/js/modules/timeline.js
/**
* 
Тепер можна регулювати трьома способами:
Глобально для всіх — в CSS/SCSS:
.kitchen-tl-item {
--tl-duration: 1.2s;
}
На конкретний елемент — в HTML через data-атрибут:

<div class="kitchen-tl-item" data-tl-duration="1.5s">...</div>
<div class="kitchen-tl-item" data-tl-duration="0.3s">...</div>
Динамічно з JS — якщо потрібно розраховувати на льоту (наприклад, пропорційно висоті лінії):

item.style.setProperty('--tl-duration', '2s'); 
* 
*/
var initTimelineItems = (selector, activeClass) => {
	const items = document.querySelectorAll(selector);
	if (!items.length) return;
	const obs = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) entry.target.classList.add(activeClass);
		});
	}, { threshold: .4 });
	items.forEach((item) => {
		const dur = item.dataset.tlDuration;
		if (dur) item.style.setProperty("--tl-duration", dur);
		obs.observe(item);
	});
};
var initTimeline = () => {
	initTimelineItems(".kitchen-tl-item", "kitchen-tl-item--active");
	initTimelineItems(".horeca-tl-item", "horeca-tl-item--active");
};
//#endregion
//#region src/js/app.js
document.addEventListener("DOMContentLoaded", () => {
	tabsInit();
});
addTouchAttr();
addLoadedAttr();
initYearCounter();
initTimeline();
//#endregion
export { slideToggle as a, getDigFormat as i, bodyLockToggle as n, slideUp as o, dataMediaQueries as r, uniqArray as s, bodyLockStatus as t };
