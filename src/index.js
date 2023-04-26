import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WordGenerator from './js/wordGenerator.js';
import '/src/scary.mp3';

// Business Logic


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

const wordleGrid = document.querySelector(".wordle-grid");

wordleGrid.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const currentCell = event.target;
    const rowCells = currentCell.parentNode.querySelectorAll(".wordle-cell");
    rowCells.forEach((cell) => {
      cell.disabled = true;
    });

    const currentRow = currentCell.parentNode;
    const nextRow = currentRow.parentNode.nextElementSibling;
    if (nextRow) {
      const firstInput = nextRow.querySelector(".wordle-cell");
      firstInput.focus();
    } else {
      let allInputsDisabled = true;
      let validWord = true;
      for(const cell of rowCells) {
        if (!cell.value) {
          allInputsDisabled = false;
        }
      }
      if (allInputsDisabled) {
        for(const cell of rowCells) {
          cell.disabled = true;
        }
        for (const cell of rowCells) {
          const isValid = await WordGenerator.wordGenerator (cell.value);
          if (!isValid) {
            validWord = false;
            break;
          }
        }
        if (!validWord) {
          alert("Invalid word! Try again!");
          for (const cell of rowCells) {
            cell.value = "";
            cell.disabled = false;
          }
          rowCells[0].focus();
        }
      } else {
        for(const cell of rowCells) {
          cell.disabled = false;
        }
      }
    }
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


// window.addEventListener("load", function() {
//   this.document.querySelector("").addEventListener("submit", handleFormSubmission);
// });

// const addColorToCell = (cellLetter, color) => {
//   const cell = document.querySelector(".wordle-cell");
//   cell.classList.add(color);
// }

// const flipCell = () => {
//   const currentCell = event.target;
//   const rowCells = currentCell.parentNode.querySelectorAll(".wordle-cell");
//   const guess = [];

//   rowCells.forEach(cell => {
//     guess.push(letter: cell.getAttrbute('data'), color: 'grey-overlay'{
//     })
  
//   guess.forEach((guess, index) => {
//     if (guess.letter == currentCell[index]) {
//       guess.color = 'green-overlay';
//       checkWordle = checkWordle.replace(guess.letter, '');
//     }
//   })

//   rowCells.forEach((cell, index) => {
//     setTimeout(() => {
//       cell.classList.add('flip');
//       cell.classList.add(guess[index].color); 
//       addColorToCell(guess[index].letter, guess[index].color);
//     }, 500 * index); 
//   })
//   })
// }

