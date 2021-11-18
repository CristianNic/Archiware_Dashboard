const express = require("express");
const app = express();
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const PORT = process.env.PORT || 8090;

app.use(helmet());
app.use(morgan("dev"));
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(
	cors({
		origin: true,
		credentials: true, // prompts for username and password
	})
);

// ----------- Client Server Access -------------------------
const username = process.env.USERNAME_Client;
const password = process.env.PASSWORD_Client;

const users = {};
users[username] = password;

// app.use(
// 	basicAuth({
// 		users: users, // { username: password }
// 		challenge: true,
// 		unauthorizedResponse: getUnauthorizedResponse,
// 	})
// );
function getUnauthorizedResponse(req) {
	return req.auth
		? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
		: "No credentials provided";
}

// ---------- Axios Proxy------------------------------------

const username_BSMini = process.env.USERNAME_BackupServerMini;
const password_BSMini = process.env.PASSWORD_BackupServerMini;

const token = `${username_BSMini}:${password_BSMini}`;
const encodedToken = Buffer.from(token).toString("base64");

const auth = {
	// method: "get",
	// url: "http://100.104.128.109:8000/rest/v1/general/srvinfo",
	headers: {
		// Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=", // munki.local
		Authorization: "Basic " + encodedToken,
	},
};
// console.log("auth", auth);

// const auth = {
// 	// auth: {
// 		username: "admin",
// 		password: "sougth-repair-SMASH",
// 	// },
// };

// --- works !!
// axios(config)
// 	.then(function (response) {
// 		console.log(JSON.stringify(response.data));
// 	})
// 	.catch(function (error) {
// 		console.log(error);
//   });

const API_URL = process.env.API_BackupServerMini;

app.get("/general/srvinfo", (req, res) => {
	axios(`${API_URL}/general/srvinfo`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

const IP = process.env.IP_BackupServerMini;

app.get("/ip", (req, res) => {
  res.json({
		ArchiwareServerIP: IP,
	});
});
// Devices 
app.get("/general/devices", (req, res) => {
	axios(`${API_URL}/general/devices`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

app.get("/general/devices/:deviceID", (req, res) => {
  // console.log("deviceID - req.params", req.params);
  // deviceID = req.params.deviceID
  // console.log('deviceID:', deviceID)
  // console.log("axios ->", `${API_URL}/general/devices/${req.params.deviceID}`);
	axios(`${API_URL}/general/devices/${req.params.deviceID}`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		}); 
});

// Jukeboxes 
// GET JukeboxNames
app.get("/general/jukeboxes", (req, res) => {
	axios(`${API_URL}/general/jukeboxes`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});
// GET JukeboxInfo
app.get("/general/jukeboxes/:jukeboxID", (req, res) => {
  // console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});
// GET JukeboxVolumes
// app.get("/general/jukeboxes/:jukeboxID/volumes", (req, res) => {
//   console.log("===> params ===>", req.params.jukeboxID)
//   console.log("===> header ===>", req.headers.slotid)
//   // console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
// 	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}/volumes`, auth)
// 		.then(function (response) {
// 			// console.log("Hello Wrapper function");
// 			// console.log(JSON.stringify(response.data));
// 			res.json(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// });

// GET JukeboxVolumesPerSlot
// Note that slot IDs are numbered starting from 1, the id may differ from 
// the numbering scheme of the library’s web interface.
// In case a volume is present but unknown, a 0 is returned for that volume. 
// To update the list of the volumes in the jukebox, call POST rest / v1 / jukeboxes / { jukeboxID } https://blog.archiware.com/redoc/p5_rest_api/awp5api.html#operation/JukeboxVolumes
app.get("/general/jukeboxes/:jukeboxID/volumes/:slotID", (req, res) => {
	console.log("===> params ===>", req.params.jukeboxID);
	console.log("===> params ===>", req.params.slotID);
	// console.log("===> header ===>", req.headers.slotid);
	// console.log("===> header ===>", req.headers);
	// console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
	// if req.headers.slotid is undefined (not present) - then all volumes returned
	// if req.headers.slotid is given then returns only the volume in this slot.
	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}/volumes`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			// slotID: req.headers.slotid,
			slotID: req.params.slotID,
		},
	})
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			console.log("RESPONSE ===> ", response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

// axios
// 	.get("http://100.104.128.109:8000/rest/v1/general/srvinfo")
// 	.then((response) => {
// 		console.log(response.data.url);
// 		console.log(response.data.explanation);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));

// Set auth as default 
// Global in Client/Website: https://github.com/axios/axios#global-axios-defaults
// https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios