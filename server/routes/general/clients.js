const express = require("express");
const router = express.Router();

const s1_clients = ["Lemon", "Maple", "Beaver", "Spacer"];
const s2_clients = ["Tony", "JS", "Ordan"];
const s3_clients = ["Rasp", "Duran"];
const description = ["iMac Pro", "Linux", "Linux", "Synology"];
const types = [true];

function clientNamesData(ids) {
	const clients = [];
	for (let i = 0; i < ids.length; i++) {
		const client = {
			ID: ids[i],
		};
		clients.push(client);
  }
	const clientNames = {
		clients: clients,
  };
	return clientNames;
}

// GET ClientNames
router.route("/").get((req, res) => {
	const { server } = res.locals;
	const S1 = process.env.s1_API;
	const S2 = process.env.s2_API;
	const S3 = process.env.s3_API;
	if (server === S1) {
		const clientNames = clientNamesData(s1_clients);
		res.json(clientNames);
		console.log(clientNames);
	} else if (server === S2) {
		const clientNames = clientNamesData(s2_clients);
		res.json(clientNames);
	} else if (server === S3) {
		const clientNames = clientNamesData(s3_clients);
		res.json(clientNames);
	} else {
		res.json("Not Found");
	}
});

// GET ClientInfo
router.route("/:clientID").get((req, res) => {
	const ip =
		"192." +
		"168." +
		Math.floor(Math.random() * 255) +
		"." +
		Math.floor(Math.random() * 255);
	const randomDescription = Math.floor(Math.random() * description.length);
	const randomTypes = Math.floor(Math.random() * types.length);
	const clientInfo = {
		description: description[randomDescription],
		hostname: ip,
		port: "8000",
		isthin: types[randomTypes],
		username: "admin",
  };
	res.json(clientInfo);
	console.log(clientInfo);
});

module.exports = router;


