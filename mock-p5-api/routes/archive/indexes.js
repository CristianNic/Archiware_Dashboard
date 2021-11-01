const express = require("express");
const indexes = express.Router();
const fs = require("fs");

function ArchiveIndexNamesData() {
	return fs.readFileSync(
    "./data/archive/indexes/get-Archive-index-names-response.json",
		"utf8"
	);
}
function ArchiveIndexInventorySearchData() {
	return fs.readFileSync(
		"./data/archive/indexes/get-ArchiveIndexNames.json",
		"utf8"
	);
}

indexes.get("/", (req, res) => {
	const archiveIndexNames = JSON.parse(ArchiveIndexNamesData());
	res.json(archiveIndexNames);
});


//-->  /archive/indexes/:indexID/inventory

// TODO: Add Params! 
// indexes.get("/:indexID/ArchiveIndexInventory", (req, res) => {
// 	const archiveIndexInvSearch = JSON.parse(ArchiveIndexInvSearch());
// 	res.json(archiveIndexInvSearch);
// });

module.exports = indexes;
