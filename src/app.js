/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  const icons = ["♦", "♥", "♠", "♣"];
  const numbers = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];

  //Selección de elementos y creación de variables
  let iconTop = document.querySelector("#icon_top");
  let cardNumber = document.querySelector("#number");
  let iconBot = document.querySelector("#icon_bot");

  let createCardButton = document.querySelector("#create-card-button");

  let cardSize = document.querySelector("#card-size");
  let cardWidthInput = document.querySelector("#card-width");
  let cardHeightInput = document.querySelector("#card-height");
  let errorNotice = document.querySelector("#error-notice");

  let interval = document.querySelector("#interval");
  let countdown = 10;

  //Creamos todas las funciones
  const randomEl = arr => arr[Math.floor(Math.random() * arr.length)];

  function createCard() {
    let selectedIcon = randomEl(icons);

    iconTop.innerText = selectedIcon;
    cardNumber.innerText = randomEl(numbers);
    iconBot.innerText = selectedIcon;
    changeColor(selectedIcon);
  }

  function changeColor(selectedIcon) {
    if (selectedIcon === "♦" || selectedIcon === "♥") {
      iconTop.classList.add("red");
      cardNumber.classList.add("red");
      iconBot.classList.add("red");
    } else {
      iconTop.classList.remove("red");
      cardNumber.classList.remove("red");
      iconBot.classList.remove("red");
    }
  }

  const intervalCount = () => {
    if (countdown > 0) {
      interval.innerHTML = `Generating a new card in: ${countdown}`;
      countdown--;
    } else {
      interval.innerHTML = `Generating a new card in: ${countdown}`;
      createCard();
      countdown = 10;
    }
  };

  const changeCardSize = () => {
    let cardWidth = parseInt(cardWidthInput.value);
    let cardHeight = parseInt(cardHeightInput.value);

    if (cardWidth < 150 || cardWidth > 1000) {
      errorNotice.innerText = "The width must be between 150 and 1000 px.";
      errorNotice.style.display = "block";
      return;
    }

    if (cardHeight < 300 || cardHeight > 750) {
      errorNotice.innerText = "The height must be between 300 and 750 px.";
      errorNotice.style.display = "block";
      return;
    }

    if (cardHeight >= 500 && cardWidth >= 500) {
      iconTop.style.fontSize = 150 + "px";
      cardNumber.style.fontSize = 250 + "px";
      iconBot.style.fontSize = 150 + "px";
    } else {
      iconTop.style.fontSize = 75 + "px";
      cardNumber.style.fontSize = 125 + "px";
      iconBot.style.fontSize = 75 + "px";
    }

    cardSize.style.height = cardHeight + "px";
    cardSize.style.width = cardWidth + "px";
    errorNotice.style.display = "none";
  };

  const changeCardSizeWithEnter = event => {
    if (event.key === "Enter") {
      changeCardSize();
    }
  };

  //llamadas a las funciones
  createCard();
  createCardButton.addEventListener("click", createCard);

  cardHeightInput.addEventListener("blur", changeCardSize);
  cardWidthInput.addEventListener("blur", changeCardSize);
  cardHeightInput.addEventListener("keydown", changeCardSizeWithEnter);
  cardWidthInput.addEventListener("keydown", changeCardSizeWithEnter);

  setInterval(intervalCount, 1000);
};
