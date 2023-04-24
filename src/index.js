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
  const fullCell = document.activeElement;
  if (fullCell.tagName === 'INPUT' && fullCell.value !== "" ) {
    fullCell.value = "";
    fullCell.classList.remove("filled");
  }
});

















// UI Logic




// let enterKey = document.querySelector(".enter");
// let allKey = document.querySelectorAll(".key");
// let wordleCell = document.querySelector(".wordle-cell");

// for(let key of allKey){
//   key.addEventListener("click",function(){
//       if(key.classList.contains("delete") || key.classList.contains("enter")){
//           return;
//       }
//       wordleCell.innerText += key.innerText;
//   })
// }


// window.addEventListener("load", function() {
//   this.document.querySelector("").addEventListener("submit", handleFormSubmission);
// });

