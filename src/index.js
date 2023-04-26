import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { WordGenerator } from './js/wordGenerator';

// Business Logic

async function wordChecker(word) {
  const response = await WordGenerator.wordChecker(word);
  if (response[0] === undefined) {
    return false;
  } else {
    return true;
  }
}

function guessChecker(word, answer) {
  const guessWord = word.toLowerCase();
  if (guessWord === answer) {
    printSuccess();
  } else {
    const wordArray = guessWord.split("");
    let outputArray = [];
    wordArray.forEach(element => {
      if (answer.includes(element)) {
        outputArray.push(element);
      } else {
        outputArray.push("-");
      }
    });
    const answerArray = answer.split("");
    let resultArray = [];
    for(let i = 0; i < 5; i ++) {
      if (outputArray[i] === answerArray[i]) {
        resultArray.push(outputArray[i]);
      } else {
        resultArray.push("-");
      }
    }
    let colorArray = ["gray", "gray", "gray", "gray", "gray"];
    for(let i = 0; i < 5; i ++) {
      if (outputArray[i] != "-") {
        colorArray[i] = "yellow";
      }
    }
    for(let i = 0; i < 5; i ++) {
      if (resultArray[i] != "-") {
        colorArray[i] = "green";
      }
    }
    return colorArray;
  }
}


//UI logic-ish
function turnCounter() {
  let totalGuess = 6;
  let currentTurn = parseInt(document.querySelector(".hidden-answer").getAttribute("id"));
  let guessRemaining = totalGuess - currentTurn;
  if (guessRemaining === 0) {
    printFailure();
  }
  document.querySelector(".hidden-answer").setAttribute("id", currentTurn + 1);
}

function printSuccess() { 
  getResults();
  document.querySelector(".title").innerText = "You Win!"; 
  let modal = document.getElementById("modal");
  let overlay = document.getElementById("overlay");
  modal.classList.add("active");
  overlay.setAttribute("class", "active");
}

function printFailure() { 
  getResults();
  document.querySelector(".title").innerText = `Game Over`;
  let modal = document.getElementById("modal");
  let overlay = document.getElementById("overlay");
  modal.classList.add("active");
  overlay.setAttribute("class", "active");
}

function printError() {
  let modal = document.getElementById("modal");
  let overlay = document.getElementById("overlay");
  document.querySelector(".title").innerText = `Error`;
  document.querySelector(".modal-body").innerText = `Please enter a valid word as your guess`;
  modal.classList.add("active");
  overlay.setAttribute("class", "active");
}


async function getResults() {
  const answer = document.querySelector(".hidden-answer").innerText;
  const response = await WordGenerator.wordChecker(answer);
  if (response[0].word) {
    document.querySelector(".modal-body").innerText = `
      Answer: ${response[0].word}
      ${response[0].meanings[0].definitions[0].definition}
      `;}
}

async function wordGenerator() {
  const response = await WordGenerator.wordGenerator();
  const checkedWord = await wordChecker(response);
  if (checkedWord) {
    document.querySelector(".hidden-answer").innerText = response;
  } else {
    wordGenerator();
  }
}



//Seperation Line

function fillCell(letter) {
  const cells = document.querySelectorAll(".wordle-cell");
  let emptyCell = null;
  cells.forEach((cell) => {
    if (!emptyCell && cell.value === "") {
      emptyCell = cell;
    }
  });
  if (emptyCell) {
    emptyCell.value = letter;
    emptyCell.classList.add("filled");
  }
}

const keys = document.querySelectorAll(".key");
keys.forEach((key)=> {
  key.addEventListener("click", () => {
    const letter = key.innerText;
    fillCell(letter);
  });
});

const enterKey = document.querySelector(".enter");
enterKey.addEventListener("click", async () => {
  const activeRow = document.querySelector(`#row${document.querySelector(".hidden-answer").getAttribute("id")}`);
  const rowInputs = activeRow.querySelectorAll("input");
  let wordArray = [];
  rowInputs.forEach(element => {
    if (!element.hasAttribute("previous")) {
      wordArray.push(element.value);
      element.setAttribute("previous", "");
    }
  });
  let validWord = true;
  const newWord = wordArray.join("");
  const isValid = await wordChecker(newWord);
  if (!isValid) {
    validWord = false;
    rowInputs.forEach(element => {
      element.removeAttribute("previous");
    });
  }
  rowInputs.forEach((cell) => {
    cell.disabled = true;
  });
  if (!validWord) {
    printError();
    for (const cell of rowInputs) {
      cell.value = "";
      cell.disabled = false;
    }
    rowInputs[0].focus();
  } else {
    const answer = document.querySelector(".hidden-answer").innerText;
    const colorArray = guessChecker(newWord, answer);
    console.log(colorArray);
    //displayColors(colorArray);
    turnCounter();
  }
});

const deleteKey = document.querySelector(".delete");
deleteKey.addEventListener("click", () => {
  const cells = document.querySelectorAll(".wordle-cell");
  let fullCell = null;
  cells.forEach((cell) => {
    if (cell.classList.contains("filled")) {
      fullCell = cell;
    }
  });
  if (fullCell) {
    fullCell.value = "";
    fullCell.classList.remove("filled");
    const previousCell = fullCell.previousElementSibling;
    if (previousCell) {
      previousCell.focus();
    }
  }
});


// UI Logic

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener('click', () =>{
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal =>{
    closeModal(modal);
  });
});

closeModalButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

function openModal(modal){
  if(modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal){
  if(modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

const keySpark = document.querySelectorAll(".key");

keySpark.forEach((key) => {
  key.addEventListener("click", () => {
    key.classList.add("sparkle");
    setTimeout(() => {
      key.classList.remove("sparkle");
    }, 500);
  });
});

async function resetGame() {
  const cells = document.querySelectorAll(".wordle-cell");
  cells.forEach((cell) => {
    cell.value = "";
    cell.disabled = false;
  });
  document.querySelector(".hidden-answer").setAttribute("id", "1");
  await wordGenerator();
}

document.getElementById("reset").addEventListener("click", async () => {
  await resetGame();
  });



