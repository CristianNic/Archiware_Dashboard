const express = require("express");
const homepage = express.Router();
const fs = require("fs");

function loadHomePageData() {
	return fs.readFileSync("./data/get-home-page.json", "utf8");
}

homepage.get("/", (req, res) => {
	const homepage = JSON.parse(loadHomePageData());
	res.json(homepage);
});

module.exports = homepage;
