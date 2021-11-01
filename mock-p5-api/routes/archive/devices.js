const express = require("express");
const devices = express.Router();
const fs = require("fs");

function loadDeviceNamesData() {
	return fs.readFileSync(
		"./data/general/devices/get-device-names.json",
		"utf8"
	);
}
function loadDeviceInfoTrueData() {
	return fs.readFileSync(
		"./data/general/devices/get-device-info-true.json",
		"utf8"
	);
}
function loadDeviceInfoFalseData() {
	return fs.readFileSync(
		"./data/general/devices/get-device-info-false.json",
		"utf8"
	);
}

// GET DeviceNames --> {{baseUrl}}/general/devices
devices.get("/", (req, res) => {
	const deviceNames = JSON.parse(loadDeviceNamesData());
	res.json(deviceNames);
});

// GET DeviceInfo --> {{baseUrl}}/:deviceID
devices.get("/:deviceID", (req, res) => {
	console.log("awst0", req.params);
	const deviceInfoTrue = JSON.parse(loadDeviceInfoTrueData());
	const deviceInfoFalse = JSON.parse(loadDeviceInfoFalseData());
	if (req.params.deviceID === "awst0") {
		res.json(deviceInfoTrue);
	} else if (req.params.deviceID === "awst1") {
		res.json(deviceInfoFalse);
	} else {
		res.json({ Required: "no matching :deviceID" });
	}
});

module.exports = devices;
