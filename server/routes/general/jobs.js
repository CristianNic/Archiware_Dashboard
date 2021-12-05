const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET JobNames
router.route("/").get((req, res) => {
  const { server, encodedToken } = res.locals;
	axios(`${server}/general/jobs/`, {
		headers: {
			Authorization: "Basic " + encodedToken,
      lastdays: 2,
      // default is 1 day 
      // pass a string from params with parseInt(req.params.lastdays, 10)
			filter: "all",
		},
	})
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

// GET JobInfo
router.route("/:jobID").get((req, res) => {
  const { server, encodedToken } = res.locals;
	axios(`${server}/general/jobs/${req.params.jobID}`, {
		headers: {
			Authorization: "Basic " + encodedToken,
		},
	})
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

// GET JobProtocol
router.route("/:jobID/protocol").get((req, res) => {
  const { server, encodedToken } = res.locals;
  axios(`${server}/general/jobs/${req.params.jobID}/`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			format: "json", // can also be: xml, path
			// filename: "string",
		},
	})
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

// GET JobReport
router.route("/:jobID/report").get((req, res) => {
  const { server, encodedToken } = res.locals;
  axios(`${server}/general/jobs/${req.params.jobID}/report`, {
		headers: {
			Authorization: "Basic " + encodedToken,
		},
	})
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
