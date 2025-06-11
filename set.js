const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdFSEVTVWZzcFB5M0dhS015WGdNbmFzUzZGanNSUkFuSENCcHB0YkNVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWRTZ2xNUVFKNTlVem5oemh4RHIxOHllVzYxL1dhM0hwVjJxdFh2MWFsVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSW1QaUlsNG5TK3UzL09tU0NxOXY1WEVZVlVtMWN5YWJ4YklVSEFrSjNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPSGZUOTlRR3NTQlg5cTZnaGJnbUJwOThNaVk2Q2NWMmhqVk5ZZVpUcENzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNGdnpIUys1eGhGQ2RKME9PZlFXcmhZbFBLazJHUHVNZ04xVnpSb0dtbms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhxU3l5Y0VTQWtaOWJqcVQ2bGJCc2hRdEt3dWtsWU44eUNibVRSdlMzQTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNERrNTk0MzU4NHVxcFY5VlVtemw3d09rVFVzTzdEa0Y1SVdzWFZFNCtGST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSmJDT1JveGsrTlIraTY4T05mU2Ftd3dFV3BOM2N1RmhhRXZORkJLWGlGND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImMrOWI0akRKN2VPUEhKZUZobDVjYittaGZ3QXF3OHdxZWVYY1Y1VEJQcGdHb1l4YVN2aTBBd3FLaUxTU0tMaW1tRVpNTGRTdENhYzhHOWVsSHBFOUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ2LCJhZHZTZWNyZXRLZXkiOiJaZkFLRmwwcFQ3a2wwQ1JqU1RBR2tTS0FMSUtwR2YzNG1icDF0TlVLZWFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMzU2MzY0NDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0ExREYyQkUzNzIxMDkwNDVFM0YwOUNCNzg0MEY0RjkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTY3NzY4OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTDFEUjQ5MUsiLCJtZSI6eyJpZCI6IjIzNDkxMzU2MzY0NDg6NDVAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI5NDA2ODk2MDkxOTU2MDo0NUBsaWQiLCJuYW1lIjoi6qeB8J2Uu/CdlLzwnZWE8J2VhuKElfCdlYDihILvuI4g4pig4oSV8J2VgOKCtfCdlZzwnZWQ77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNQzIrWkFIRU9Mc3A4SUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmbWlLMklqLzZDTUl3Y20vMGdjU212eE5BRjFQZUx1NTgrMElFOGVUb0FRPSIsImFjY291bnRTaWduYXR1cmUiOiJxbWlSVWo2Ni9WUEN4YU1ITWR3NHNJMllRTFZJL0g3YTFCcVB3S0w1aVRwRTJNMGF3WEc2K1lFWDcyVDhvVHZET1lFbWNqenpKQVd5alpTMy9CckJDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUE9kYjNOWUd0RW16TU9Od0lCYkNjc2RaN3Q3MzkyUytMVUVHM1B4UXpJdnRVK1RwRktTRW5NYTFFeXNFQlc1QzA5UkpSMzlHa09JZTBiRkswSG1pQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTM1NjM2NDQ4OjQ1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg1b2l0aUkvK2dqQ01ISnY5SUhFcHI4VFFCZFQzaTd1ZlB0Q0JQSGs2QUUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTY3NzY4MCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQcU0ifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Demonic Nicky",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

