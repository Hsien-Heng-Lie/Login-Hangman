fs = require('fs');
require("dotenv").config();

const path = './client/js/config.json';

function writeConfig(){
  if (fs.existsSync(path)) {
    const m = JSON.parse(fs.readFileSync(path));
  
    if(process.env.enviroment != 'dev'){
      console.log(m.Identity_Server_Base_Url);
      m.Identity_Server_Base_Url = process.env.Identity_Server_Base_Url;
    }
    fs.writeFileSync(path, JSON.stringify(m));
  } else {
    const param = JSON.stringify({
      Identity_Server_Base_Url:process.env.Identity_Server_Base_Url
    });
    console.log(param);
    fs.writeFile(path, param, function (err) {
      if (err) throw err;
    });
  }
  
}

module.exports = {
  writeConfig: function(){
    return writeConfig();
  },
};
