const logoContainer = document.querySelector(".header-logo");
const burgerButton = document.querySelector(".burger-menu");
const burgerMenu = document.querySelector(".nav");
const burgerLink = document.querySelectorAll(".nav-link");
const blackout = document.querySelector(".blackout");

blackout.addEventListener("click", (ev) => {
  if (ev.target === blackout) {
    closeModal();
  }
});

export const closeMenu = () => {
  if (burgerMenu.classList.contains("burger-menu-active")) {
    burgerButton.classList.remove("burger-active");
    burgerMenu.classList.remove("burger-menu-active");
    logoContainer.classList.remove("burger-active-logo");
    blackout.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

burgerButton.addEventListener("click", () => {
  burgerButton.classList.toggle("burger-active");
  burgerMenu.classList.toggle("burger-menu-active");
  logoContainer.classList.toggle("burger-active-logo");

  if (burgerMenu.classList.contains("burger-menu-active")) {
    blackout.style.display = "block";
    document.body.style.overflow = "hidden";
  } else {
    blackout.style.display = "none";
    document.body.style.overflow = "visible";
  }
});

burgerLink.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (ev) => {
  if (!ev.composedPath().includes(burgerMenu) && !ev.composedPath().includes(burgerButton)) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (ev) {
  if (ev.key == "Escape") {
    closeMenu();
  }
});

// ====создание карточек=====

export function createPets(petsItemsContainer, petsArr) {
  const petsItems = document.createElement("div");
  petsItems.classList.add("pets-items");

  petsArr.forEach((pet) => {
    const div = document.createElement("div");
    div.classList.add("pets-item");
    div.id = pet.id;

    div.innerHTML = `
            <img src="${pet.img}" alt="${pet.name}">
            <h4>${pet.name}</h4>
            <button class="button button-secondary" id="${pet.id}">Learn more</button>
        `;
    div.addEventListener("click", () => {
      modalWindow(pet);
    });
    petsItems.append(div);
  });
  petsItemsContainer.prepend(petsItems);
}

// =====модальное окно======

function modalWindow(pet) {
  blackout.style.display = "flex";
  document.body.style.overflow = "hidden";

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929"/>
  </svg>`;
  closeButton.classList.add("close-modal");
  closeButton.addEventListener("click", closeModal);

  modal.innerHTML = `
    ${window.innerWidth >= 768 ? `<img src="${pet.img}" alt="${pet.name}" class="modal-img">` : ''}
    <div class="modal-desc-container">
      <h3>${pet.name}</h3>
      <h4>${pet.type} - ${pet.breed}</h4>
      <p>${pet.description}</p>
      <ul class="modal-desc">
        <li><span>Age:</span> ${pet.age}</li>
        <li><span>Inoculations:</span> ${pet.inoculations.join(", ")}</li>
        <li><span>Diseases:</span> ${pet.diseases.join(", ")}</li>
        <li><span>Parasites:</span> ${pet.parasites.join(", ")}</li>
      </ul>
    <div>
    `;

  modal.prepend(closeButton);
  blackout.append(modal);
}

function closeModal() {
  blackout.innerHTML = "";
  blackout.style.display = "none";
  document.body.style.overflow = "visible";
}
