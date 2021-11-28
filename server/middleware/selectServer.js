require("dotenv").config();

const { authBSMini, authMS, authMA } = require("../auth")

const selectServer = (req, res, next) => {
  if (req.headers.server === "BackupServerMini") {
    res.locals.server = process.env.API_BackupServerMini;
    res.locals.auth = authBSMini
	} else if (req.headers.server === "MunkiServer") {
    res.locals.server = process.env.API_Munki;
    res.locals.auth = authMS
  } else if (req.headers.server === "MockAPI") {
    res.locals.server = process.env.API_MockAPI;
    res.locals.auth = authMA
	}
  next()
}

module.exports = selectServer










