const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkhtYlB5WUwyNEdpaWVIaCt4d0JiZnZQRnA3OXM1QzFpaCtTdHNSWEtVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWJDaC9TWjF1dTJWQm1IV2dWOHN3RWkvOThiS0xic1hHTkxlOEhUNHJCbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRUMzMXVGSVdkUzg0dkVQclFpVFVqTkcvWDUrQ2NYc1gyS2VKSE5ZRTMwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrck9wSjBNZW8zNEhwYTk1MWF0dkVtTDlZVGpmUy9vb0xGUVpIVWsvWkRjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRLQWNrR1FWMDBSQTBHRnpVVnBPN1FDYUY2bTgyUDdaYU9uSmQxSVhFVlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImppMEI4akQyaklhMkVXcmo1SnFOeXBieTJOWjZSSmlubmRYbFB4SFAyV1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0xtYW5NejRlbG9mT3NidWc0RVhKM0s1RXR4b2s3cFF1U3Y2cE5DZnFFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDVZL2FLWlE3Yjk2OVVHZ2ZGVS9HcGc5SzBBays4MjlIclZFQk9VWWV3ND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1tTVVxNjdpVmNWeUpRT0hWUVpabnh6NTNiWnl0eHVvcjFDbG0xN0daNEg4ZGEvMTlYNExiMDh6STRSckVOeDRXTWk3UWxCZCs2NTBaS2ROTEI2M0RnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE0LCJhZHZTZWNyZXRLZXkiOiJjNURCMHlzdk1kUUtyUGQvQldTVGRZTTVWZkw3cG96MWFpWlpHSEN6bHFBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDkxMzU2MzY0NDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMTk1RDg5QjhCQUM2QTRFMkU4ODAyMjFBNTJFMDVBQ0UifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDMzMzU2MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiV1RZVzdUMVEiLCJtZSI6eyJpZCI6IjIzNDkxMzU2MzY0NDg6NDdAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI5NDA2ODk2MDkxOTU2MDo0N0BsaWQiLCJuYW1lIjoi6qeB8J2Uu/CdlLzwnZWE8J2VhuKElfCdlYDihILvuI4g4pig4oSV8J2VgOKCtfCdlZzwnZWQ77iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNSzIrWkFIRUwvd3o4SUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmbWlLMklqLzZDTUl3Y20vMGdjU212eE5BRjFQZUx1NTgrMElFOGVUb0FRPSIsImFjY291bnRTaWduYXR1cmUiOiJWU1lBOEliZjY5RFNZRis0aWNNNFdMQ1RzbGc2MXl6ZkFwOGQ2c0s1Zy8vdUJCTzMrbXk0dXYzNWlvTnFHeHVEaDRsVWFmb1FsdGxiUVVJK1NwdnhDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiT3ZIa3VDS1hram5WME1PSHJWMTcvb2owK1VtVW5kd3VzZDFHazh6aGVrZkNwVkFWZFJwRmlicFk4cnRNY05xNkJPOWlYaGpXeGNhY3dlbUF6VnduQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTM1NjM2NDQ4OjQ3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlg1b2l0aUkvK2dqQ01ISnY5SUhFcHI4VFFCZFQzaTd1ZlB0Q0JQSGs2QUUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDMzMzUxOCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFEdjAifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Demonic Nicky",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "09135636448",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
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

