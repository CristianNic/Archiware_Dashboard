const express = require("express");
const license = express.Router();
const fs = require("fs");

function loadLicenseResourceData() {
	return fs.readFileSync("./data/license/get-license-resource-names.json", "utf8");
}

// license.get("/", (req, res) => {
// 	res.json({
// 		Welcome: "Welcome to /license",
// 	});
// });

// GET LicenseResourceNames --> 
license.get("/", (req, res) => {
	const licenseResourceNames = JSON.parse(loadLicenseResourceData());
	res.json(licenseResourceNames);
});

module.exports = license;
