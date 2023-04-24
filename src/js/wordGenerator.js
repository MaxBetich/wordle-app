export default class WordGenerator {

  static async wordGenerator() {
    const urlString = "https://random-word-api.herokuapp.com/word?length=5&lang=en";
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `There was an error with your request. Error information: ${response.status} ${jsonifiedResponse["error-type"]}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }

  static async wordChecker(guessWord) {
    const urlString = `https://api.datamuse.com/words?sp=${guessWord}`;
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `There was an error with your request. Error information: ${response.status} ${jsonifiedResponse["error-type"]}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}