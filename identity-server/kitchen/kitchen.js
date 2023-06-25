const crypto = require('crypto');
require("dotenv").config();
const key = process.env.Identity_Server_Key;

function newSeason(food){
  const salt = crypto.randomBytes(15).toString('base64')

  const seasoned = salt + crypto.createHmac('sha256', key).update(salt+food).digest('hex').toString('base64');
  return {salt : salt,
    seasonedFood :seasoned
  }
}

function seasonFood(salt, food){
  return salt + crypto.createHmac('sha256', key).update(salt+food).digest('hex').toString('base64');
}

function compareSeason(season, salt, food){
  return season == seasonFood(salt, food);
}

module.exports = {
  newSeason: function(food){
    return newSeason(food);
  },
  seasonFood: function(salt, food){
    return seasonFood(salt, food);
  },
  compareSeason: function(season, salt, food){
    return compareSeason(season, salt, food);
  },
};