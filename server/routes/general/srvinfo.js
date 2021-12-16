const express = require("express");
const router = express.Router();
require("dotenv").config();

const { v4: uuidv4 } = require("uuid");

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function srvinfoData(hostname) {
  const regex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}/;
  const uuid = uuidv4().match(regex)[0];
	const srvinfo = {
		home: "/usr/local/aw",
		hostid: uuid,
		hostname: hostname,
		lexxvers: "7.0.2",
		platform: "osx",
		port: 8000,
		uptime: randomIntFromInterval(25880, 85880),
	};
	return srvinfo;
}

// GET SrvInfo
router.route("/").get((req, res) => {
	const { server } = res.locals;
  const S1 = process.env.s1_API;
	const S2 = process.env.s2_API;
	const S3 = process.env.s3_API;
	if (server === S1) {
		const srvinfo = srvinfoData("LemonStores.local");
		res.json(srvinfo);
	} else if (server === S2) {
		const srvinfo = srvinfoData("CreekBackup.local");
		res.json(srvinfo);
	} else if (server === S3) {
		const srvinfo = srvinfoData("NAS-A-Space.local");
		res.json(srvinfo);
	} else {
		console.log("Server not found");
	}
});

// GET Monitored Server IP
router.route("/ip").get((req, res) => {
  const { server } = res.locals;
  console.log("Server IP", server)
  const regex = /(localhost|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/
  const ip = server.match(regex)[0];
  res.json({ serverIP: ip });
});

module.exports = router;

