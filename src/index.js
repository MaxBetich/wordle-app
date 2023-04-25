import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import '';

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


// window.addEventListener("load", function() {
//   this.document.querySelector("").addEventListener("submit", handleFormSubmission);
// });

