require("dotenv").config();

const {
	s1_auth, s2_auth, s3_auth,
	s1_encodedToken, s2_encodedToken, s3_encodedToken,
} = require("../auth");

const selectServer = (req, res, next) => {
  if (req.headers.server === process.env.s1_NAME) {
    res.locals.server = process.env.s1_API;
		res.locals.auth = s1_auth;
    res.locals.encodedToken = s1_encodedToken;

	} else if (req.headers.server === process.env.s2_NAME) {
		res.locals.server = process.env.s2_API;
		res.locals.auth = s2_auth;
    res.locals.encodedToken = s2_encodedToken;
    
	} else if (req.headers.server === process.env.s3_NAME) {
		res.locals.server = process.env.s3_API;
		res.locals.auth = s3_auth;
    res.locals.encodedToken = s3_encodedToken;
	}
  next()
}

module.exports = selectServer









