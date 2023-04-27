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
      
      const generatedWord = jsonifiedResponse[0];
      
      return generatedWord;
      
    } catch(error) {
      return error;
    }
  }

  static async wordChecker(guessWord) {
    const urlString = `https://api.dictionaryapi.dev/api/v2/entries/en/${guessWord}`;
    try {
      const response = await fetch(urlString);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `There was an error with your request. Error information: ${response.status} ${jsonifiedResponse["message"]}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}