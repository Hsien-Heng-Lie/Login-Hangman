const word = "H@ngman123";
window.onload = (event) => {
  localStorage.count = 0;
  localStorage.guesses = "[]";
  localStorage.emptyWord = JSON.stringify(getEmptyWord());
  localStorage.result = "";
};
window.addEventListener("keyup", (event) => {
  if (event.key.length == 1) {
    document.getElementById("already-guessed").hidden = true;
    let guesses = JSON.parse(localStorage.guesses);
    if (!guesses.includes(event.key)) {
      guesses.push(event.key);
      localStorage.guesses = JSON.stringify(guesses);
      unhideGuesses();
      let result = checkKey(event.key);
      if (result.length > 0) {
        unhideWord(result, event.key);
      } else {
        unhideHangman();
      }
      console.log(localStorage);
    } else {
      document.getElementById("already-guessed").hidden = false;
    }
  }
});

function endGame(result) {
  if (result) {
    localStorage.result = "win";
  } else {
    localStorage.result = "lose";
  }
  window.location.replace("/end");
}

function getEmptyWord() {
  // TODO: make API call here
  let emptyWord = [];
  let letters = document.getElementById("letters");
  for (let i = 0; i < word.length; i++) {
    emptyWord.push(null);
    let letter = document.createElement("p");
    letters.appendChild(letter);
  }
  let maxWidth = (word.length + 1) * 1.25;
  letters.style.maxWidth = maxWidth + "rem";
  return emptyWord;
}

function checkKey(key) {
  // TODO: make API call here
  console.log(key);
  let i = word.indexOf(key);
  let indexes = [];
  console.log(i);
  if (i >= 0) {
    indexes.push(i);
    while ((i = word.indexOf(key, i + 1)) >= 0) indexes.push(i);
  }
  return indexes;
}

function unhideGuesses() {
  let guesses = JSON.parse(localStorage.guesses);
  let section = document.getElementById("guesses");
  section.innerHTML = "";
  for (const guess of guesses) {
    let elem = document.createElement("p");
    elem.innerHTML = guess;
    section.appendChild(elem);
  }
}

function unhideWord(indexes, key) {
  let emptyWord = JSON.parse(localStorage.emptyWord);
  for (const i of indexes) {
    emptyWord[i] = key;
  }
  let letters = document.getElementById("letters");
  letters.innerHTML = "";
  for (const letter of emptyWord) {
    let elem = document.createElement("p");
    elem.innerHTML = letter;
    letters.appendChild(elem);
  }
  console.log(emptyWord);
  if (!emptyWord.includes(null)) {
    endGame(true);
  }
  localStorage.emptyWord = JSON.stringify(emptyWord);
}

function unhideHangman() {
  let count = JSON.parse(localStorage.count);
  count++;
  switch (count) {
    case 1:
      document.getElementById("ground").hidden = false;
      break;
    case 2:
      document.getElementById("post").hidden = false;
      break;
    case 3:
      document.getElementById("beam").hidden = false;
      break;
    case 4:
      document.getElementById("rope").hidden = false;
      break;
    case 5:
      document.getElementById("head").hidden = false;
      break;
    case 6:
      document.getElementById("body").hidden = false;
      break;
    case 7:
      document.getElementById("left-arm").hidden = false;
      break;
    case 8:
      document.getElementById("right-arm").hidden = false;
      break;
    case 9:
      document.getElementById("left-leg").hidden = false;
      break;
    case 10:
      document.getElementById("right-leg").hidden = false;
      endGame(false);
      break;

    default:
      break;
  }
  localStorage.count = count;
}
