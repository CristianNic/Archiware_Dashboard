const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET ClientNames
router.route("/").get((req, res) => {
  console.log("Client res.locals.server ---> ", res.locals.server);
  const { server, auth } = res.locals;
  axios(`${server}/general/clients`, auth)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

// GET ClientInfo
router.route("/:clientID").get((req, res) => {
  console.log("Client res.locals.server---> ", res.locals.server);
  const { server, auth } = res.locals
	axios(`${server}/general/clients/${req.params.clientID}`, auth)
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

module.exports = router;


