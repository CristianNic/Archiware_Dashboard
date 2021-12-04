require("dotenv").config();

//---------------- Backup Server Mini Basic Auth ---------------//
const username_BSMini = process.env.USERNAME_BackupServerMini;
const password_BSMini = process.env.PASSWORD_BackupServerMini;

const token = `${username_BSMini}:${password_BSMini}`;
const encodedTokenBSMini = Buffer.from(token).toString("base64");

const authBSMini = {
	headers: {
		Authorization: "Basic " + encodedTokenBSMini,
	},
};
exports.authBSMini = authBSMini
exports.encodedTokenBSMini = encodedTokenBSMini


//---------------- Munki Server Basic Auth ---------------------//
const username_MunkiServer = process.env.USERNAME_MunkiServer;
const password_MunkiServer = process.env.PASSWORD_MunkiServer;

const tokenMS = `${username_MunkiServer}:${password_MunkiServer}`
const encodedTokenMS = Buffer.from(tokenMS).toString("base64");

const authMS = {
  headers: {
    Authorization: "Basic " + encodedTokenMS
  }
}
exports.authMS = authMS
exports.encodedTokenMS = encodedTokenMS

//---------------- Mock API Basic Auth ------------------------//
const username_MockAPI = process.env.USERNAME_MockAPI;
const password_MockAPI = process.env.PASSWORD_MockAPI;

const tokenMA = `${username_MockAPI}:${password_MockAPI}`
const encodedTokenMA = Buffer.from(tokenMA).toString("base64");

const authMA = {
  headers: {
    Authorization: "Basic " + encodedTokenMA
  }
}
exports.authMA = authMA
exports.encodedTokenMA = encodedTokenMA




