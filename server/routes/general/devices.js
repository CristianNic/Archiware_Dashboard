const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET DeviceNames
router.route("/").get((req, res) => {
  const { server, auth } = res.locals;
	axios(`${server}/general/devices`, auth)
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

// GET DeviceInfo
router.route("/:deviceID").get((req, res) => {
	const { server, auth } = res.locals;
	axios(`${server}/general/devices/${req.params.deviceID}`, auth)
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
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
});

module.exports = router;
