# _A Nightmare on (Word)le Street_

#### By _**Laura Hope, Max Betich, Ross Davila, Joe Wilfong & Eusebie Siebenberg**_

#### _A very spooky Wordle Clone_

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _Webpack v4.46.0_
* _Node.js v16.13.1_
* _Babel v7.18.6_

## Description

_This application demonstrates using 2 different APIs, one from Random-Word-API and one from DictionaryAPI, to generate a wordle-simulation game. The APIs return parsed JSON data to the user for random 5-letter word generation and correct dictionary defintion of the word. Directions for the game are as follows:_
* _Begin by clicking "New Game" button_
* _A random 5-letter word has now been generated_
* _Use the onscreen keyboard to make your guesses, 6 guesses total_
* _Type word into the wordle cell rows_
* _Hit "enter" to submit guess_
* _Cells will flip yellow if correct letter is guessed but in the wrong spot, green if correct letter in the correct spot, or remain grey if not included in the hidden word_
* _A modal will pop up either once you have guessed the right word, or once you had run out of guesses_
* _Modal will include correct word and its definition according to DictionaryAPI_

## Setup/Installation Requirements

* _Clone “wordle-app“ from the repository to your desktop_
* _Navigate to "wordle-app" directory via your local terminal command line_
* _Open the directory in VS code by typing 'code .' in the command line_
* _Run 'npm install' in the command line to install all packages_
* _Run 'npm run build' to build the project via webpack_
* _Run 'npm run lint' to lint all JS files_
* _Run 'npm run test' to test files via Jest_
* _Run 'npm run start' to start a development server_

## Known Bugs

* _The second and subsequent time the "New Game" button is clicked to generate a new instance of the wordle game without refreshing the page, the application will display the Error modal popup upon entering a word, regardless if the word is valid or not. Re-entering the same word again, or another word, will cause the application to continue functioning normally._

## License

_See attached License.txt file for MIT licensure description_

Copyright (c) [2023] [Laura Hope, Max Betich, Ross Davila, Joe Wilfong & Eusebie Siebenberg]