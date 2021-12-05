const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET VolumeNames
router.route("/:volumeID").get((req, res) => {
  const { server, auth } = res.locals;
	// if req.headers.slotID is undefined (not present) - then all volumes returned
	// if req.headers.slotID is given then returns only the volume in this slot.
	axios(`${server}/general/volumes/${req.params.volumeID}`, auth)
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





