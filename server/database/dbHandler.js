const sql = require("mssql");
const dbConnect = require("./dbService");

async function startGame(userName) {
  const conn = await dbConnect;

  const request = new sql.Request(conn);
  const result = await request
    .input("UserName", userName)
    .execute("sp_createGameLog");
  return result;
}

async function endGame(gameId, gameResult) {
  const conn = await dbConnect;

  const request = new sql.Request(conn);
  const result = await request
    .input("GameId", gameId)
    .input("result", gameResult)
    .execute("sp_updateGamelog");

  return result;
}

async function getGame(gameId) {
  const conn = await dbConnect;
  const request = new sql.Request(conn);
  const result = await request
    .input("GameId", gameId)
    .execute("sp_getGamelog_GameId");
  return result;
}

module.exports = {
  startGame: function (userName) {
    return startGame(userName);
  },
  endGame: function (gameId, result) {
    return endGame(gameId, result);
  },
  getGame: function (gameId) {
    return getGame(gameId);
  },
};
