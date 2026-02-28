"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// ================= SIDEBAR =================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ================= TESTIMONIAL MODAL =================
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("time");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach((item) => {
  item.addEventListener("click", function () {
    const avatar =
      this.dataset.avatar ||
      this.querySelector("[data-testimonials-avatar]")?.src;

    const name =
      this.dataset.name ||
      this.querySelector("[data-testimonials-title]")?.innerHTML;

    const text =
      this.dataset.text ||
      this.querySelector("[data-testimonials-text]")?.innerHTML;

    const date = this.dataset.date || new Date().toISOString().split("T")[0];

    if (modalImg) {
      modalImg.src = avatar;
      modalImg.alt = name;
    }

    if (modalTitle) modalTitle.innerHTML = name;
    if (modalText) modalText.innerHTML = text;

    if (modalDate) {
      modalDate.setAttribute("datetime", date);
      modalDate.textContent = new Date(date).toLocaleDateString();
    }

    testimonialsModalFunc();
  });
});

if (modalCloseBtn)
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

// ================= FILTER SYSTEM (Reusable for ALL Sections) =================
const selectElements = document.querySelectorAll("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

// Toggle dropdown
selectElements.forEach((select) => {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
});

// Filter function
const filterFunc = function (selectedValue) {
  filterItems.forEach((item) => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Update active state for large buttons
  filterBtns.forEach((btn) => {
    if (btn.innerText.toLowerCase() === selectedValue) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
};

// Dropdown item click
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    const parentBox = this.closest(".filter-select-box");
    const valueElement = parentBox.querySelector("[data-selecct-value]");
    const selectButton = parentBox.querySelector("[data-select]");

    valueElement.innerText = this.innerText;
    selectButton.classList.remove("active");

    filterFunc(selectedValue);
  });
});

// Large screen filter buttons
let lastClickedBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();

    document.querySelectorAll("[data-selecct-value]").forEach((val) => {
      val.innerText = this.innerText;
    });

    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// ================= CONTACT FORM =================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

// ================= PAGE NAVIGATION =================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    pages.forEach((page, index) => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[index].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navigationLinks[index].classList.remove("active");
      }
    });
  });
});
