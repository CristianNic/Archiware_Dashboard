const express = require("express");
const clients = express.Router();
const fs = require("fs");

function loadClientNamesData() {
	return fs.readFileSync(
		"./data/general/clients/get-client-names.json",
		"utf8"
	);
}
function loadClientInfoJellyfishData() {
	return fs.readFileSync(
		"./data/general/clients/get-clientinfo-jellyfish.json",
		"utf8"
	);
}

// GET ClientNames --> {{baseUrl}}/general/clients
clients.get("/", (req, res) => {
	const clientNames = JSON.parse(loadClientNamesData());
	res.json(clientNames);
});

// GET ClientInfo --> {{baseUrl}}/general/clients/:clientID
clients.get("/:clientID", (req, res) => {
	console.log(req.params);
	const ClientInfoJellyfish = JSON.parse(loadClientInfoJellyfishData());
	if (req.params.clientID === "jellyfish") {
		res.json(ClientInfoJellyfish);
	} else {
		res.json({ Required: "no matching :clientID" });
	}
});

module.exports = clients;

// http://localhost:8080/general/clients/jellyfish


