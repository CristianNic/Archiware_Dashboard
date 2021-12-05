const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET SrvInfo
router.route("/").get((req, res) => {;
  const { server, auth } = res.locals;
	axios(`${server}/general/srvinfo`, auth)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				res.json({
					resource: "Not Found",
					headers: error.response.headers,
					status: error.response.status,
					statusText: error.response.statusText,
					responseData: error.response.data,
				});
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
		});
});

// GET Monitored Server IP
router.route("/ip").get((req, res) => {
	const { server } = res.locals;
  const regex = /(localhost|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/
  const ip = server.match(regex)[0];
	res.json({ serverIP: ip });
});

module.exports = router;


