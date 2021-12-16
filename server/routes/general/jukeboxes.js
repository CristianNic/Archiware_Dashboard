const express = require("express");
const router = express.Router();

const {
	s1_jukeboxes,
	s2_jukeboxes,
	s3_jukeboxes,
	s1_volumeIDs,
	s2_volumeIDs,
	s3_volumeIDs,
} = require("../../demo-data/makeJukeboxes");
      
// GET JukeboxNames - returns name of jukebox "jhw0", "dsf0", or "jfw0"
router.route("/").get((req, res) => {
	const { server } = res.locals;
	const S1 = process.env.s1_API;
	const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  if (server === S1) {
    const jukeboxes = { jukeboxes: [{ ID: s1_jukeboxes[0] }] };
    res.json(jukeboxes);
  } else if (server === S2) {
    const jukeboxes = { jukeboxes: [{ ID: s2_jukeboxes[0] }] };
		console.log("jukeboxes:", jukeboxes);
		res.json(jukeboxes);
  } else if (server === S3) {
    const jukeboxes = { jukeboxes: [{ ID: s3_jukeboxes[0] }] };
		console.log("jukeboxes:", jukeboxes);
		res.json(jukeboxes);
  } else {
    res.json("Not Found");
  }
});

// GET JukeboxInfo - returns slot count - always 24 slots
router.route("/:jukeboxID").get((req, res) => {
  res.json({ slotcount: 24 });
});

// GET JukeboxVolumes 
// - returns a list of all volumes
// - can't be random to line up with volume info 
router.route("/:jukeboxID/volumes").get((req, res) => {
  const { server } = res.locals;
  res.json({ volumes: [{ ID: "10457" }] });
});
          
// GET JukeboxVolumes (by slotID) - return volumeID 
router.route("/:jukeboxID/volumes/:slotID").get((req, res) => {
  const { server } = res.locals;
  const S1 = process.env.s1_API;
  const S2 = process.env.s2_API;
  const S3 = process.env.s3_API;
  const slotID = req.params.slotID - 1
  if (server === S1) {
		res.json({ volumes: [{ ID: s1_volumeIDs[slotID] }] });
	} else if (server === S2) {
    res.json({ volumes: [{ ID: s2_volumeIDs[slotID] }] });
	} else if (server === S3) {
    res.json({ volumes: [{ ID: s3_volumeIDs[slotID] }] });
	} else {
		res.json("Not Found");
	}
});

// *  "Note that slot IDs are numbered starting from 1, the id may differ from 
//    the numbering scheme of the library’s web interface.
//    In case a volume is present but unknown, a 0 is returned for that volume. 
//    To update the list of the volumes in the jukebox, call POST rest/v1/jukeboxes/{jukeboxID}" 
//    https://blog.archiware.com/redoc/p5_rest_api/awp5api.html#operation/JukeboxVolumes

module.exports = router;
