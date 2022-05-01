const petsData = await fetch("../pets.json").then((response) => response.json());

import { createPets } from "../script.js";

const petsItemsContainer = document.querySelector(".pets-items-container");
const paginationButtons = document.querySelectorAll(".pagination-arrow");
const paginationPage = document.querySelector(".pagination-page");

let pageLength = window.innerWidth >= 1280 ? 8 : window.innerWidth < 768 ? 3 : 6;

let petsDataArray = [];
let page = 1;

window.addEventListener("resize", onResizeWindow);
paginationButtons.forEach((but) => but.addEventListener("click", onClickButton));

createPetsDataArray();

// ====создание массива====
function createPetsDataArray() {
  petsDataArray = [];
  const array = [...petsData, ...petsData, ...petsData, ...petsData, ...petsData, ...petsData];

  for (let i = 0; i < 48; i = i + pageLength) {
    petsDataArray.push(array.slice(i, i + pageLength).sort(() => Math.random() - 0.5));
    petsDataArray.sort(() => Math.random() - 0.5);
  }

  createPets(petsItemsContainer, petsDataArray[page - 1]);
}

// =====пагинация=====

function onClickButton(ev) {
  switch (ev.target.dataset.pag) {
    case "first":
      page = 1;
      break;
    case "back":
      page--;
      break;
    case "next":
      page++;
      break;
    case "last":
      page = petsDataArray.length;
      break;
  }
  changePage(false);
}

function changePage(resize) {
  const oldPage = document.querySelector(".pets-items");
  oldPage.classList.add("pets-items-old");

  if (resize) {
    oldPage.remove();
    createPetsDataArray();
  } else {
    setTimeout(() => oldPage.remove(), 500);
    createPets(petsItemsContainer, petsDataArray[page - 1]);
  }

  paginationPage.innerHTML = page;

  paginationButtons.forEach((but) => (but.disabled = ""));

  if (page === 1) {
    paginationButtons[0].disabled = true;
    paginationButtons[1].disabled = true;
  }

  if (page === petsDataArray.length) {
    paginationButtons[2].disabled = true;
    paginationButtons[3].disabled = true;
  }
}

// ====изменение окна=====

function onResizeWindow() {
  let pLength = window.innerWidth >= 1280 ? 8 : window.innerWidth < 768 ? 3 : 6;
  if (pLength != pageLength) {
    pageLength = pLength;
    page = 1;
    changePage(true);
  }
}
