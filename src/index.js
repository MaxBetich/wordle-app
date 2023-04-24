import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WordGenerator from './js/wordGenerator';

async function wordChecker(word) {
  const response = await WordGenerator.wordChecker(word);
  if (response[0]["word"]) {
    return true;
  } else {
    return false;
  }
}

