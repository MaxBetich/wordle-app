//import WordGenerator from "./wordGenerator";

export async function wordChecker(word) {
  const response = await WordGenerator.wordChecker(word);
  console.log(response[0]);
  if (response[0]["word"]) {
    return true;
  } else {
    return false;
  }
}

function guessChecker(word, answer) {
  const isGuessReal = wordChecker(word);
  if (isGuessReal === true) {
    if (word === answer) {
      printSuccess();
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

// function turnCounter