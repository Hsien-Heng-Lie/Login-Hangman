const word = "H@ngman123";
window.onload = (event) => {
  sessionStorage.count = 0;
  sessionStorage.guesses = "[]";
  sessionStorage.emptyWord = JSON.stringify(getEmptyWord());
};
window.addEventListener("keyup", (event) => {
  if (event.key.length == 1) {
    let guesses = JSON.parse(sessionStorage.guesses);
    if (!guesses.includes(event.key)) {
      guesses.push(event.key);
      sessionStorage.guesses = JSON.stringify(guesses);

      let result = checkKey(event.key);
      console.log(result);
      if (result.length > 0) {
        unhideWord(result, event.key);
      } else {
        unhideHangman();
      }
      console.log(sessionStorage);
    } else {
      alreadyGuessed();
    }
  }
});

function getEmptyWord() {
  // TODO: make API call here
  let emptyWord = [];
  let letters = document.getElementById("letters");
  for (let i = 0; i < word.length; i++) {
    emptyWord.push(null);
    let letter = document.createElement("span");
    letters.appendChild(letter);
  }
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

function alreadyGuessed() {
  console.log("already guessed");
}

function unhideWord(indexes, key) {
  let emptyWord = JSON.parse(sessionStorage.emptyWord);
  for (const i of indexes) {
    emptyWord[i] = key;
  }
  let letters = document.getElementById("letters");
  letters.innerHTML = "";
  for (const letter of emptyWord) {
    let elem = document.createElement("span");
    elem.innerHTML = letter;
    letters.appendChild(elem);
  }
  sessionStorage.emptyWord = JSON.stringify(emptyWord);
}

function unhideHangman() {
  let count = JSON.parse(sessionStorage.count);
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
      break;

    default:
      break;
  }
  sessionStorage.count = count;
}
