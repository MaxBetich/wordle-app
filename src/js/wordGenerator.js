export class WordGenerator {

  static async wordGenerator() {
    const urlString = "https://random-word-api.herokuapp.com/word?length=5&lang=en";
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `There was an error with your request. Error information: ${response.status} ${jsonifiedResponse["error"]}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static async wordChecker(guessWord) {
    const urlString = `https://api.datamuse.com/words?sp=${guessWord}&md=d`;
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `There was an error with your request. Error information: ${response.status} ${jsonifiedResponse["message"]}`;
        throw new Error(errorMessage);
      }
      console.log(jsonifiedResponse);
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}

// export async function wordChecker(inputWord) {
//   const response = await WordGenerator.wordChecker(inputWord);
//   console.log(response);
//   const word = response[0];
//   if (word["word"]) {
//     return true;
//   } else {
//     return false;
//   }
// }