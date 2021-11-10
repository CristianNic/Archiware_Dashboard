const express = require("express");
const license = express.Router();
const fs = require("fs");

function loadLicenseResourceData() {
	return fs.readFileSync("./data/license/get-license-resource-names.json", "utf8");
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
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

// GET LicenseResourceInfo --> {{baseUrl}}/:resourceID
license.get("/:resourceID", (req, res) => {
	console.log(":resourceID", req.params);
  const rndInt = randomIntFromInterval(-1, 3)
  console.log(rndInt)
  res.json({ licenses: rndInt });

	// if (req.params.resourceID === "ArchivePlan") {
	// 	res.json({ licenses: -1 });
	// } else if (req.params.resourceID === "BackupPlan") {
	// 	res.json({ licenses: 0 });
	// } else {
	// 	res.json({ Required: "no matching :deviceID" });
	// }
});

  // const rndInt = this.randomIntFromInterval(-1, 3)
  // console.log(rndInt)




module.exports = license;
