// import WordGenerator from "./wordGenerator.js";

export async function wordChecker(word) {
  const response = await WordGenerator.wordChecker(word);
  if (response[0] === undefined) {
    return false;
  } else {
    return true;
  }
}

export async function guessChecker(word, answer) {
  const isGuessReal = await wordChecker(word);
  const newWord = word.toLowerCase();
  if (isGuessReal === true) {
    if (newWord === answer) {
      printSuccess(newWord);
    } else {
      const wordArray = newWord.split("");
      let outputArray = [];
      wordArray.forEach(element => {
        if (answer.includes(element)) {
          outputArray.push(element);
        } else {
          outputArray.push("-");
        }
      });
      const answerArray = answer.split("");
      resultArray = [];
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
      turnCounter();
      return colorArray;
    }
  } else {
    printError();
  }
}


//UI logic-ish
function turnCounter(word) {
  let totalGuess = 6;
  let currentTurn = parseInt(document.querySelector(".hidden-answer").getAttribute("id"));
  let guessRemaining = totalGuess - currentTurn;
  if (guessRemaining === 0) {
    printFailure(word);
  }
  document.querySelector(".hidden-answer").setAttribute("id", currentTurn + 1);
}

async function formSubmit(event) {
  event.preventDefault();
  const answer = document.querySelector(".hidden-answer").innerText;
  const inputArray = document.querySelectorAll(".filled");
  let wordArray = [];
  inputArray.forEach(element => {
    if (!element.hasAttribute("previous")) {
      wordArray.push(element.value);
      element.setAttribute("previous", "");
    }
  });
  const word = wordArray.join("");
  const colorArray = await guessChecker(word, answer);
  displayColors(colorArray);
}
//colorArray will be something like ["gray", "gray", "green", "yellow", "gray"]

function displayColors(colorArray) {
  colorArray.forEach(element => {
    if (element === "yellow") {
      document.querySelector(".wordle-cell").setAttribute("id","yellow");
    } else if (element === "green") {
      document.querySelector(".wordle-cell").setAttribute("id", "green"); 
    }
  })
}    

window.addEventListener("load", function() {
  this.document.querySelector("").addEventListener("submit", formSubmit);
});
//   const addColorToCell = (cellLetter, color) => {
//     const cell = document.querySelector(".wordle-cell");
//     cell.classList.add(color);
//   }})
  
//   const flipCell = () => {
//     const currentCell = event.target;
//     const rowCells = currentCell.parentNode.querySelectorAll(".wordle-cell");
//     const guess = [];
//   }
// }

function printSuccess(word) {
  // document.querySelector(".hidden-answer").removeAttribute("hidden"); 
  getResults(word);
  document.querySelector(".title").innerText = "You Win!"; 
}

function printFailure(word) {
  // document.querySelector(".hidden-answer").removeAttribute("hidden"); 
  getResults(word);
  document.querySelector(".title").innerText = `Game Over`;
}

function printError() {
  document.querySelector(".title").innerText = `Error`;
  document.querySelector(".modal-body").innerText = `Please enter a valid word as your guess`;
}


async function getResults(word) {
  const response = await WordGenerator.wordChecker(word);
  if (response[0].word) {
    document.querySelector(".modal-body").innerText = `
      Answer: ${response[0].word}
      ${response[0].defs[0]}
      `}
}

async function wordGenerator() {
  const response = await WordGenerator.wordGenerator();
  const answer = response[0];
  document.querySelector(".hidden-answer").innerText = answer;
}
  
  

// {
//   "word": "fish",
//   "score": 4945,
//   "defs": [
//       "n\t(countable) A cold-blooded vertebrate animal that lives in water, moving with the help of fins and breathing with gills. ",
//       "n\t(archaic or loosely) Any animal (or any vertebrate) that lives exclusively in water. ",