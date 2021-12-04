require("dotenv").config();

const {
  authBSMini, authMS, authMA,
  encodedTokenBSMini, encodedTokenMS, encodedTokenMA
} = require("../auth")

const selectServer = (req, res, next) => {
  if (req.headers.server === "BackupServerMini") {
		res.locals.server = process.env.API_BackupServerMini;
		res.locals.auth = authBSMini;
    res.locals.encodedToken = encodedTokenBSMini;
    
	} else if (req.headers.server === "MunkiServer") {
    res.locals.server = process.env.API_Munki;
    res.locals.auth = authMS
    res.locals.encodedToken = encodedTokenMS;

  } else if (req.headers.server === "MockAPI") {
    res.locals.server = process.env.API_MockAPI;
    res.locals.auth = authMA
    res.locals.encodedToken = encodedTokenMA;
  }
  next()
}

module.exports = selectServer










