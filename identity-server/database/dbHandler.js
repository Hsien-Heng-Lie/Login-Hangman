const sql = require("mssql");
const dbConnect = require('./dbService');


async function readUserDetail(userName) {
  const conn = await dbConnect;

  const request = new sql.Request(conn);

  const result = await request
    .input('UserName',sql.VarChar, userName)
    .execute('sp_getUserDetail');

  if(result.recordset[0]){
    const user = {
      salt: result.recordset[0].salt,
      saltedHash: result.recordset[0].saltedHash
    }
    
    return user;
  }

  return result.recordset[0];
};

async function insertUserDetail(userName,salt,saltedHash) {
  const conn = await dbConnect;

  const request = new sql.Request(conn);

  const result = await request
    .input('UserName',sql.VarChar, userName)
    .input('salt',sql.VarChar, salt)
    .input('saltedHash',sql.VarChar, saltedHash)
    .execute('sp_insertUserDetail');

  return result;
};

async function updateUserDetail(userName,salt,saltedHash) {
  const conn = await dbConnect;

  const request = new sql.Request(conn);

  const result = await request
    .input('UserName',sql.VarChar, userName)
    .input('salt',sql.VarChar, salt)
    .input('saltedHash',sql.VarChar, saltedHash)
    .execute('sp_updateUserDetail');

  return result;
};


module.exports = {
  readUserDetail: function(userName){
    return readUserDetail(userName);
  },
  insertUserDetail: function(userName,salt,saltedHash){
    return insertUserDetail(userName,salt,saltedHash);
  },
  updateUserDetail: function(userName,salt,saltedHash){
    return updateUserDetail(userName,salt,saltedHash);
  }
}; 