//#region src/components/pages/works/works.js
var htmlLang = (document.documentElement.lang || "").toLowerCase();
var isUkrainian = htmlLang.startsWith("uk") || htmlLang.startsWith("ua") || window.location.pathname.includes("/ua/");
var worksGrid = document.getElementById("worksGrid");
var worksTabs = document.getElementById("worksTabs");
var modalBackdrop = document.getElementById("modalBackdrop");
var modalClose = document.getElementById("modalClose");
var modalGallery = document.getElementById("modalGallery");
var modalPrev = document.getElementById("modalPrev");
var modalNext = document.getElementById("modalNext");
var modalDots = document.getElementById("modalDots");
var modalCounter = document.getElementById("modalCounter");
var modalCat = document.getElementById("modalCat");
var modalTitle = document.getElementById("modalTitle");
var modalDesc = document.getElementById("modalDesc");
var modalSpecs = document.getElementById("modalSpecs");
var modalChips = document.getElementById("modalChips");
var projects = [];
var currentProject = null;
var currentImgIdx = 0;
function updateTabCounts() {
	worksTabs.querySelectorAll(".works-tabs__tab").forEach((tab) => {
		const cat = tab.dataset.cat;
		const count = cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;
		const countEl = tab.querySelector(".works-tabs__count");
		if (countEl) countEl.textContent = count;
	});
}
function applyFilter(filter) {
	worksGrid.querySelectorAll(".work-card[data-project]").forEach((card) => {
		card.style.display = filter === "all" || card.dataset.cat === filter ? "" : "none";
	});
}
function setupTabs() {
	const tabs = worksTabs.querySelectorAll(".works-tabs__tab");
	tabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			tabs.forEach((t) => t.classList.remove("works-tabs__tab--active"));
			tab.classList.add("works-tabs__tab--active");
			applyFilter(tab.dataset.cat);
		});
	});
}
function initFromDOM() {
	worksGrid.querySelectorAll(".work-card[data-project]").forEach((card, idx) => {
		const project = JSON.parse(card.dataset.project);
		projects.push({
			...project,
			category: card.dataset.cat
		});
		card.style.setProperty("--card-delay", `${idx * 40}ms`);
		card.setAttribute("role", "button");
		card.setAttribute("tabindex", "0");
		card.setAttribute("aria-label", isUkrainian ? `Відкрити проєкт: ${project.title}` : `Otwórz projekt: ${project.title}`);
		const open = () => openModal(project);
		card.addEventListener("click", open);
		card.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				open();
			}
		});
	});
	worksGrid.setAttribute("aria-busy", "false");
	updateTabCounts();
	setupTabs();
}
function renderGallery() {
	if (!currentProject) return;
	modalGallery.querySelectorAll(".project-modal__gallery-img").forEach((i) => i.remove());
	currentProject.images.forEach((src, i) => {
		const img = document.createElement("img");
		img.className = "project-modal__gallery-img" + (i === currentImgIdx ? " active" : "");
		img.src = src;
		img.alt = isUkrainian ? `${currentProject.title} — фото ${i + 1} з ${currentProject.images.length}` : `${currentProject.title} — zdjęcie ${i + 1} z ${currentProject.images.length}`;
		img.decoding = "async";
		img.loading = i === 0 ? "eager" : "lazy";
		modalGallery.prepend(img);
	});
	modalDots.innerHTML = "";
	currentProject.images.forEach((_, i) => {
		const dot = document.createElement("button");
		dot.className = "project-modal__dot" + (i === currentImgIdx ? " active" : "");
		dot.setAttribute("aria-label", isUkrainian ? `Перейти до фото ${i + 1}` : `Przejdź do zdjęcia ${i + 1}`);
		dot.onclick = () => {
			currentImgIdx = i;
			updateGallery();
		};
		modalDots.appendChild(dot);
	});
	updateGallery();
}
function updateGallery() {
	if (!currentProject) return;
	modalGallery.querySelectorAll(".project-modal__gallery-img").forEach((img, i) => {
		const actualIdx = currentProject.images.length - 1 - i;
		img.classList.toggle("active", actualIdx === currentImgIdx);
	});
	modalDots.querySelectorAll(".project-modal__dot").forEach((d, i) => d.classList.toggle("active", i === currentImgIdx));
	modalCounter.textContent = currentImgIdx + 1 + " / " + currentProject.images.length;
}
function openModal(project) {
	currentProject = project;
	currentImgIdx = 0;
	modalCat.textContent = project.cat;
	modalTitle.textContent = project.title;
	modalDesc.textContent = project.desc;
	modalSpecs.innerHTML = "";
	Object.entries(project.specs).forEach(([k, v]) => {
		const row = document.createElement("div");
		row.className = "project-modal__spec-row";
		row.innerHTML = `<span>${k}</span><span>${v}</span>`;
		modalSpecs.appendChild(row);
	});
	modalChips.innerHTML = "";
	Object.entries(project.specs).slice(0, 2).forEach(([k, v]) => {
		const chip = document.createElement("div");
		chip.className = "project-modal__chip";
		chip.innerHTML = `${k} · <span class="project-modal__chip-value">${v}</span>`;
		modalChips.appendChild(chip);
	});
	renderGallery();
	modalBackdrop.classList.add("open");
	modalBackdrop.setAttribute("aria-hidden", "false");
	document.body.classList.add("project-modal--open");
}
function closeModal() {
	modalBackdrop.classList.remove("open");
	modalBackdrop.setAttribute("aria-hidden", "true");
	document.body.classList.remove("project-modal--open");
}
window.closeModal = closeModal;
document.querySelectorAll(".work-card[onclick]").forEach((card) => {
	if (card.hasAttribute("aria-label")) return;
	card.setAttribute("role", "button");
	card.setAttribute("tabindex", "0");
	const title = card.querySelector(".work-card__title");
	if (title) card.setAttribute("aria-label", isUkrainian ? `Переглянути проєкт: ${title.textContent}` : `Zobacz projekt: ${title.textContent}`);
	card.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			card.click();
		}
	});
});
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
	if (e.target === modalBackdrop) closeModal();
});
modalPrev.addEventListener("click", (e) => {
	e.stopPropagation();
	if (!currentProject) return;
	currentImgIdx = (currentImgIdx - 1 + currentProject.images.length) % currentProject.images.length;
	updateGallery();
});
modalNext.addEventListener("click", (e) => {
	e.stopPropagation();
	if (!currentProject) return;
	currentImgIdx = (currentImgIdx + 1) % currentProject.images.length;
	updateGallery();
});
document.addEventListener("keydown", (e) => {
	if (!modalBackdrop.classList.contains("open")) return;
	if (e.key === "Escape") closeModal();
	if (e.key === "ArrowLeft") modalPrev.click();
	if (e.key === "ArrowRight") modalNext.click();
});
var touchStartX = 0;
var touchStartY = 0;
var touchMoved = false;
modalGallery.addEventListener("touchstart", (e) => {
	touchStartX = e.touches[0].clientX;
	touchStartY = e.touches[0].clientY;
	touchMoved = false;
}, { passive: true });
modalGallery.addEventListener("touchmove", () => {
	touchMoved = true;
}, { passive: true });
modalGallery.addEventListener("touchend", (e) => {
	if (!touchMoved || !currentProject) return;
	const dx = e.changedTouches[0].clientX - touchStartX;
	const dy = e.changedTouches[0].clientY - touchStartY;
	if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
		if (dx < 0) currentImgIdx = (currentImgIdx + 1) % currentProject.images.length;
		else currentImgIdx = (currentImgIdx - 1 + currentProject.images.length) % currentProject.images.length;
		updateGallery();
	}
}, { passive: true });
initFromDOM();
//#endregion
