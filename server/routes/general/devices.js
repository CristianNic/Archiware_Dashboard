const express = require("express");
const router = express.Router();
require("dotenv").config();

// TODO: randomize data removing .json files (like other routes)
// Demo Data
const s1_getDeviceNames = require("../../demo-data/S1/general/devices/S1_GET_DeviceNames.json");
const s1_getDeviceInfo_aws = require("../../demo-data/S1/general/devices/S1_GET_DeviceInfo_aws.json");
const s1_getDeviceInfo_steam = require("../../demo-data/S1/general/devices/S1_GET_DeviceInfo_steam.json");

const s2_getDeviceNames = require("../../demo-data/S2/general/devices/S2_GET_DeviceNames.json");
const s2_getDeviceInfo_drive_1 = require("../../demo-data/S2/general/devices/S2_GET_DeviceInfo_drive_1.json");
const s2_getDeviceInfo_drive_2 = require("../../demo-data/S2/general/devices/S2_GET_DeviceInfo_drive_2.json");
const s2_getDeviceInfo_drive_3 = require("../../demo-data/S2/general/devices/S2_GET_DeviceInfo_drive_3.json");

const s3_getDeviceNames = require("../../demo-data/S3/general/devices/S3_GET_DeviceNames.json");
const s3_getDeviceInfo_backup1 = require("../../demo-data/S3/general/devices/S3_GET_DeviceInfo_backup1.json");
const s3_getDeviceInfo_backup2 = require("../../demo-data/S3/general/devices/S3_GET_DeviceInfo_backup2.json");

// GET DeviceNames
router.route("/").get((req, res) => {
  const { server } = res.locals;
  if (server === process.env.s1_API) {
    console.log(process.env.s1_API);
    res.json(s1_getDeviceNames);
  } else if (server === process.env.s2_API) {
    console.log(process.env.s2_API);
    res.json(s2_getDeviceNames);
  } else if (server === process.env.s3_API) {
    console.log(process.env.s3_API);
    res.json(s3_getDeviceNames);
  } else {
    console.log("Server not found");
  }
});

// GET DeviceInfo
router.route("/:deviceID").get((req, res) => {
  const { server } = res.locals;
  if (server === process.env.s1_API && req.params.deviceID === "aws") {
    res.json(s1_getDeviceInfo_aws);
	} else if (server === process.env.s1_API && req.params.deviceID === "steam") {
    res.json(s1_getDeviceInfo_steam);
	} else if (server === process.env.s2_API && req.params.deviceID === "drive_1") {
    res.json(s2_getDeviceInfo_drive_1);
	} else if (server === process.env.s2_API && req.params.deviceID === "drive_2") {
    res.json(s2_getDeviceInfo_drive_2);
	} else if (server === process.env.s2_API && req.params.deviceID === "drive_3") {
    res.json(s2_getDeviceInfo_drive_3);
	} else if (server === process.env.s3_API && req.params.deviceID === "backup1") {
    res.json(s3_getDeviceInfo_backup1);
	} else if (server === process.env.s3_API && req.params.deviceID === "backup2") {
    res.json(s3_getDeviceInfo_backup2);
	} else {
		console.log("Device not found");
	}
});

module.exports = router;
