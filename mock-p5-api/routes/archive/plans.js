const express = require("express");
const plans = express.Router();
const fs = require("fs");

function loadArchivePlanNamesData() {
	return fs.readFileSync("./data/archive/plans/get-archivePlanNames.json", "utf8");
}

// license.get("/", (req, res) => {
// 	res.json({
// 		Welcome: "Welcome to /license",
// 	});
// });

// GET ArchivePlanNames --> {{baseUrl}}/archive/plans
plans.get("/", (req, res) => {
	const archivePlanNames = JSON.parse(loadArchivePlanNamesData());
	res.json(archivePlanNames);
});

module.exports = plans;
