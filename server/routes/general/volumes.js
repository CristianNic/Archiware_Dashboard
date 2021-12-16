const express = require("express");
const router = express.Router();
const {
	s1_jukebox,
	s2_jukebox,
	s3_jukebox,
} = require("../../demo-data/makeJukeboxes");

// GET VolumeNames
router.route("/:volumeID").get((req, res) => {
	const { server } = res.locals;
	const S1 = process.env.s1_API;
	const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  if (server === S1) {
    const found = s1_jukebox.find(element => element.volumeID === req.params.volumeID);
    res.json(found);
  } else if (server === S2) {
    const found = s2_jukebox.find(element => element.volumeID === req.params.volumeID);
    res.json(found);
  } else if (server === S3) {
    const found = s3_jukebox.find(element => element.volumeID === req.params.volumeID);
    res.json(found);
	} else {
		res.json("Not Found");
	}  
});

module.exports = router;





