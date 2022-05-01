const petsData = await fetch('../pets.json').then(response => response.json());
import { closeMenu } from "../script.js";
import { createPets } from "../script.js";

const petsItemsContainer = document.querySelector(".pets-items-container");
const paginationArrows = document.querySelectorAll(".pagination-arrow");


let slideLength = window.innerWidth >= 1280 ? 3 : window.innerWidth < 768 ? 1 : 2;
let lastSlides = [];

paginationArrows.forEach((arrow) => arrow.addEventListener("click", onClickPaginationArrow));
window.addEventListener(`resize`, onResizeWindow);

chosePetsForSlides();

// =====выбор слайдов=====

function chosePetsForSlides() {
  let actualPets = petsData.filter((pet) => !lastSlides.includes(pet));
  let selectedPets = [];

  for (let i = 0; i < slideLength; i++) {
    let pet = actualPets[Math.floor(Math.random() * actualPets.length)];
    selectedPets.push(pet);
    actualPets = actualPets.filter((pet) => !selectedPets.includes(pet));
  }

  createPets(petsItemsContainer, selectedPets);
  lastSlides = selectedPets;
}

// =====переключение слайдов=====

function onClickPaginationArrow(ev) {
  if (ev.target.dataset.arrow === "next") {
    document.documentElement.style.setProperty("--animation-from", "fromRight");
    document.documentElement.style.setProperty("--animation-to", "toLeft");
  } else {
    document.documentElement.style.setProperty("--animation-from", "fromLeft");
    document.documentElement.style.setProperty("--animation-to", "toRight");
  }

  changeSlides();
}

function changeSlides() {
  const oldSlide = document.querySelector(".pets-items");
  oldSlide.classList.add("pets-items-old");

  chosePetsForSlides();
  setTimeout(() => oldSlide.remove(), 500);
}

// ====изменение ширины окна=====

function onResizeWindow() {
  let sLength = window.innerWidth >= 1280 ? 3 : window.innerWidth < 768 ? 1 : 2;
  if (sLength != slideLength) {
    slideLength = sLength;
    changeSlides();
    closeMenu()
  }
}

