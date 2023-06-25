window.onload = (event) => {
  localStorage.emptyWord = JSON.stringify(getEmptyWord());
};

window.addEventListener("keyup", async (event) => {
  if (event.key.length == 1) {
    document.getElementById("already-guessed").hidden = true;
    let guesses = JSON.parse(localStorage.guesses);
    let count = JSON.parse(localStorage.count);
    let emptyWord = JSON.parse(localStorage.emptyWord);
    let correctLetters = emptyWord.filter(v => v != null).filter((item, i, ar) => ar.indexOf(item) === i);
    if (!guesses.includes(event.key) && correctLetters.length+count == guesses.length) {
      guesses.push(event.key);
      localStorage.guesses = JSON.stringify(guesses);
      unhideGuesses();
      let result = await checkKey(event.key);
      if (result.length > 0) {
        unhideWord(result, event.key);
      } else {
        unhideHangman(1);
      }
    } else {
      document.getElementById("already-guessed").hidden = false;
    }
  }
});


function endGame(gameResult) {
  if (gameResult) {
    localStorage.gameResult = 1;
  } else {
    localStorage.gameResult = 0;
  }
  window.location.href = "/end";
}

function getEmptyWord() {
  let emptyWord = [];
  let letters = document.getElementById("letters");

  if(localStorage.getItem("emptyWord") != "" && localStorage.getItem("emptyWord") != null){
    if(JSON.parse(localStorage.emptyWord).filter(v => v != null).length > 0){
      unhideLetters();
      unhideHangman(0);
      unhideGuesses();
      return JSON.parse(localStorage.emptyWord);
    }
  }

  for (let i = 0; i < localStorage.wordLength; i++) {
    emptyWord.push(null);
    let letter = document.createElement("p");
    letters.appendChild(letter);
  }
  let maxWidth = parseInt(localStorage.wordLength) * 1.375;
  letters.style.maxWidth = maxWidth + "rem";

  unhideHangman(0);
  unhideGuesses();

  return emptyWord;
}

async function checkKey(key) {
  const response = await fetch(
    "/game/check?" +
      new URLSearchParams({
        gameId: localStorage.gameId,
        character: key,
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "jwt-token": localStorage.getItem("jwt-token"),
      },
    }
  );
  if (response.ok) {
    return await response.json();
  }
}

function unhideGuesses() {
  let guesses = JSON.parse(localStorage.guesses);
  let section = document.getElementById("guesses");
  section.innerText = "";
  for (const guess of guesses) {
    let elem = document.createElement("p");
    elem.innerText = guess;
    section.appendChild(elem);
  }
}

function unhideLetters(){
  let emptyWord = JSON.parse(localStorage.emptyWord);
  let letters = document.getElementById("letters");
  letters.innerHTML = "";
  for (const letter of emptyWord) {
    let elem = document.createElement("p");
    elem.innerHTML = letter;
    letters.appendChild(elem);
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
  if (!emptyWord.includes(null)) {
    endGame(true);
  }
  localStorage.emptyWord = JSON.stringify(emptyWord);
}

function unhideHangman(increment) {
  let count = JSON.parse(localStorage.count);
  count += increment;

  let hangman = ["ground","post","beam","rope","head","body","left-arm","right-arm","left-leg","right-leg"];

  for (let i = 0; i < count; i++) {
    document.getElementById(hangman[i]).hidden = false;
  }

  if(count == 10){
    endGame(false);
  }
  localStorage.count = count;
}
