//import WordGenerator from "./wordGenerator";

export async function wordChecker(word) {
  const response = await WordGenerator.wordChecker(word);
  console.log(response[0]);
  if (response[0].word) {
    return true;
  } else {
    return false;
  }
}

export async function guessChecker(word, answer) {
  const isGuessReal = await wordChecker(word);
  if (isGuessReal === true) {
    if (word === answer) {
      printSuccess(word);
    } else {
      const wordArray = word.split("");
      let outputArray = [];
      wordArray.forEach(element => {
        if (answer.includes(element)) {
          outputArray.push(element);
        } else {
          outputArray.push("-");
        }
      });
      const answerArray = answer.split();
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
      return colorArray;
    }
  } else {
    printError();
  }
}


//UI logic-ish
function turnCounter(word) {
  let totalGuess = 6;
  let currentTurn = document.querySelector("class").getAttribute("id");
  let guessRemaining = totalGuess - currentTurn;
  if (guessRemaining = 0) {
    printFailure(word);
  }
  document.getElementById("guessCount").innerText = guessRemaining;
  document.querySelector("class").setAttribute("id", currentTurn + 1);
}

function formSubmit(event) {
  event.preventDefault();
  document.querySelector(".error-class").innerText = null;
  const answer = document.querySelector(".hidden-answer").innerText;
  const inputArray = document.querySelectorAll(".filled");
  let wordArray = [];
  inputArray.forEach(element => {
    if (!element.hasAttribute("previous")) {
      wordArray.push(element);
      element.setAttribute("previous", "");
    }
  });
  const word = wordArray.join("");
  const colorArray = guessChecker(word, answer);
  displayColors(colorArray);
  if (colorArray != ["green", "green", "green", "green", "green"]) {
    turnCounter(word);
  }
}

function printSuccess(word) {
  document.querySelector(".hidden-answer").removeAttribute("hidden"); 
  getResults(word);
  let successP = document.createElement("p");
  successP.innerText = `You Win`
  document.querySelector(".hidden-answer").prepend(successP); 
}

function printFailure(word) {
  document.querySelector(".hidden-answer").removeAttribute("hidden"); 
  getResults(word);
  let failureP = document.createElement("p");
  failureP.innerText = `You Lose`
  document.querySelector(".hidden-answer").prepend(failureP); 
}

function printError() {
  let errorP = document.createElement("p");
  errorP.setAttribute("class", "error-class");
  errorP.innerText = "invalid word, please enter a real word";
  document.querySelector(".wordle-container").prepend(errorP);
}


async function getResults(word) {
  const response = await WordGenerator.wordChecker(word);
  if (response.word[word]) {
    document.querySelector(".hidden-answer").innerHTML = `
      Answer: ${response.word}
      ${response.defs[0]}
      `}
}


  
  

// {
//   "word": "fish",
//   "score": 4945,
//   "defs": [
//       "n\t(countable) A cold-blooded vertebrate animal that lives in water, moving with the help of fins and breathing with gills. ",
//       "n\t(archaic or loosely) Any animal (or any vertebrate) that lives exclusively in water. ",