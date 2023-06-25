window.onload = (event) => {
  localStorage.emptyWord = JSON.stringify(getEmptyWord());
};
window.addEventListener("keyup", async (event) => {
  if (event.key.length == 1) {
    document.getElementById("already-guessed").hidden = true;
    let guesses = JSON.parse(localStorage.guesses);
    if (!guesses.includes(event.key)) {
      guesses.push(event.key);
      localStorage.guesses = JSON.stringify(guesses);
      unhideGuesses();
      let result = await checkKey(event.key);
      if (result.length > 0) {
        unhideWord(result, event.key);
      } else {
        unhideHangman();
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
  window.location.replace("/end");
}

function getEmptyWord() {
  let emptyWord = [];
  let letters = document.getElementById("letters");
  for (let i = 0; i < localStorage.wordLength; i++) {
    emptyWord.push(null);
    let letter = document.createElement("p");
    letters.appendChild(letter);
  }
  let maxWidth = parseInt(localStorage.wordLength) * 1.375;
  letters.style.maxWidth = maxWidth + "rem";
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
