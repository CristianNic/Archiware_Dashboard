const express = require("express");
const router = express.Router();
const axios = require("axios");

// Check if any response.data returns empty objects {}
// Unfortunately the Archiware P5 API does this sometimes. Should return 0.
// https://stackoverflow.com/questions/11480769/how-can-i-check-if-a-json-is-empty-in-nodejs
function isEmptyObject(obj) {
	return !Object.keys(obj).length;
}

// GET JukeboxNames
router.route("/").get((req, res) => {
  const { server, auth } = res.locals;
	axios(`${server}/general/jukeboxes`, auth)
    .then(function (response) {
			res.json(response.data);
		})
    .catch(function (error) {
      if (error.response) { 
      res.json(
        {
          jukeboxes: [{ ID: "Not Found" }],
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

// GET JukeboxInfo
router.route("/:jukeboxID").get((req, res) => {
	const { server, auth } = res.locals;
	axios(`${server}/general/jukeboxes/${req.params.jukeboxID}`, auth)
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

// GET JukeboxVolumes
router.route("/:jukeboxID/volumes").get((req, res) => {
  const { server, auth } = res.locals;
	axios(`${server}/general/jukeboxes/${req.params.jukeboxID}/volumes`, auth)
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

// GET JukeboxVolumes (by slotID)
router.route("/:jukeboxID/volumes/:slotID").get((req, res) => {
  const { server, encodedToken } = res.locals;
	axios(`${server}/general/jukeboxes/${req.params.jukeboxID}/volumes`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			slotID: req.params.slotID
		},
	})
		.then(function (response) {
			console.log("slot ===========> ", req.params.slotID);
			console.log("jukeboxID ======> ", req.params.jukeboxID);
			console.log("response.data ==> ", response.data); // { volumes: [ { ID: '10462', links: [Array] } ] }
			if (isEmptyObject(response.data) === null) {
				res.json({ volumes: [ { ID: "0" } ] });
				console.log("===> ", req.params.slotID, "Data object is null");
			} else {
				res.json(response.data);
			}
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

// *  "Note that slot IDs are numbered starting from 1, the id may differ from 
//    the numbering scheme of the library’s web interface.
//    In case a volume is present but unknown, a 0 is returned for that volume. 
//    To update the list of the volumes in the jukebox, call POST rest/v1/jukeboxes/{jukeboxID}" 
//    https://blog.archiware.com/redoc/p5_rest_api/awp5api.html#operation/JukeboxVolumes

module.exports = router;
