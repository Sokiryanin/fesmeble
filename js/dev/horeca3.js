//#region src/js/modules/my-slider.js
/**
* @param {object} opts
* @param {HTMLElement|string} opts.track  - track element or its ID
* @param {HTMLElement|string} [opts.prev] - prev button element or its ID
* @param {HTMLElement|string} [opts.next] - next button element or its ID
* @param {string} opts.itemSelector       - CSS selector for slide items
* @param {number} [opts.gap=16]           - gap between items in px
*/
var createSlider = ({ track, prev, next, itemSelector, gap = 16 }) => {
	const el = (ref) => typeof ref === "string" ? document.getElementById(ref) : ref;
	const trackEl = el(track);
	if (!trackEl) return;
	const prevBtn = el(prev);
	const nextBtn = el(next);
	const items = trackEl.querySelectorAll(itemSelector);
	if (!items.length) return;
	trackEl.style.touchAction = "pan-y";
	let current = 0;
	let activeId = null;
	let startX = 0;
	let startY = 0;
	let startPos = 0;
	let horizLocked = false;
	const itemW = () => items[0].offsetWidth + gap;
	const max = () => items.length - 1;
	const goTo = (idx) => {
		current = Math.min(Math.max(idx, 0), max());
		trackEl.style.transform = `translateX(-${current * itemW()}px)`;
		if (prevBtn) prevBtn.disabled = current === 0;
		if (nextBtn) nextBtn.disabled = current === max();
	};
	goTo(0);
	nextBtn?.addEventListener("click", () => goTo(current + 1));
	prevBtn?.addEventListener("click", () => goTo(current - 1));
	const detach = () => {
		activeId = null;
		horizLocked = false;
		document.removeEventListener("pointermove", onMove);
		document.removeEventListener("pointerup", onUp);
		document.removeEventListener("pointercancel", onCancel);
	};
	const onMove = (e) => {
		if (e.pointerId !== activeId) return;
		const dx = Math.abs(e.clientX - startX);
		const dy = Math.abs(e.clientY - startY);
		if (!horizLocked) {
			if (dx < 5 && dy < 5) return;
			if (dy > dx) {
				detach();
				return;
			}
			horizLocked = true;
			trackEl.style.transition = "none";
		}
		e.preventDefault();
		trackEl.style.transform = `translateX(${-startPos + (e.clientX - startX)}px)`;
	};
	const onUp = (e) => {
		if (e.pointerId !== activeId) return;
		trackEl.style.transition = "";
		if (horizLocked) {
			const diff = e.clientX - startX;
			goTo(Math.abs(diff) > 60 ? diff < 0 ? current + 1 : current - 1 : current);
		}
		detach();
	};
	const onCancel = (e) => {
		if (e.pointerId !== activeId) return;
		if (horizLocked) {
			trackEl.style.transition = "";
			goTo(current);
		}
		detach();
	};
	trackEl.addEventListener("pointerdown", (e) => {
		if (activeId !== null) return;
		activeId = e.pointerId;
		startX = e.clientX;
		startY = e.clientY;
		startPos = current * itemW();
		horizLocked = false;
		document.addEventListener("pointermove", onMove, { passive: false });
		document.addEventListener("pointerup", onUp);
		document.addEventListener("pointercancel", onCancel);
	});
	trackEl.addEventListener("keydown", (e) => {
		if (e.key === "ArrowRight") goTo(current + 1);
		if (e.key === "ArrowLeft") goTo(current - 1);
	});
	window.addEventListener("resize", () => goTo(current));
};
//#endregion
//#region src/components/pages/horeca/horeca.js
var initSegmentTabs = (containerId) => {
	const container = document.getElementById(containerId);
	if (!container) return;
	const btns = container.querySelectorAll("[role=\"tab\"]");
	const panels = container.querySelectorAll("[role=\"tabpanel\"]");
	btns.forEach((btn) => {
		btn.addEventListener("click", () => {
			btns.forEach((b) => {
				b.classList.remove("horeca-tabs__btn--active", "horeca-mat-tabs__btn--active");
				b.setAttribute("aria-selected", "false");
			});
			panels.forEach((p) => {
				p.hidden = true;
			});
			btn.classList.add(containerId === "horecaMatTabs" ? "horeca-mat-tabs__btn--active" : "horeca-tabs__btn--active");
			btn.setAttribute("aria-selected", "true");
			const target = document.getElementById(btn.getAttribute("aria-controls"));
			if (target) target.hidden = false;
		});
	});
};
createSlider({
	track: "horecaGalleryTrack",
	prev: "horecaGalleryPrev",
	next: "horecaGalleryNext",
	itemSelector: ".horeca-gallery__item"
});
initSegmentTabs("horecaTabs");
initSegmentTabs("horecaMatTabs");
//#endregion
