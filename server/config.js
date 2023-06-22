fs = require('fs');
require("dotenv").config();

const name = './client/js/config.json';

function writeConfig(){
  const m = JSON.parse(fs.readFileSync(name));
  
  if(process.env.enviroment != 'dev'){
    console.log(m.Identity_Server_Base_Url);
    m.Identity_Server_Base_Url = process.env.Identity_Server_Base_Url;
  }
   fs.writeFileSync(name, JSON.stringify(m));
}

module.exports = {
  writeConfig: function(){
    return writeConfig();
  },
};
