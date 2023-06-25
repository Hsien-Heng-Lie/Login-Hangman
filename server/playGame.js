const dbHandler = require("./database/dbHandler");

async function startGame(username) {
  if (username) {
    const newGame = await dbHandler.startGame(username);
    return newGame;
  }
}

async function checkKey(gameId, key) {
  const game = await dbHandler.getGame(gameId);
  console.log(game);
  if (game.recordset.length > 0) {
    const word = game.recordset[0].Word;

    let i = word.indexOf(key);
    let indexes = [];
    if (i >= 0) {
      indexes.push(i);
      while ((i = word.indexOf(key, i + 1)) >= 0) indexes.push(i);
    }
    return indexes;
  } else return "This game does not exist";
}

async function endGame(gameId, gameResult) {
  try {
    await dbHandler.endGame(gameId, gameResult);
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { startGame, endGame, checkKey };
