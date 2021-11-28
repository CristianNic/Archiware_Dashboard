const express = require("express");
const app = express();
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const selectServer = require("../server/middleware/selectServer")
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
		credentials: true,
	})
);

//---------------- P5 Servers Basic Auth ---------------------//
// const username_BSMini = process.env.USERNAME_BackupServerMini;
// const password_BSMini = process.env.PASSWORD_BackupServerMini;

// const token = `${username_BSMini}:${password_BSMini}`;
// const encodedToken = Buffer.from(token).toString("base64");

// const auth = {
// 	headers: {
// 		Authorization: "Basic " + encodedToken,
// 	},
// };
//---------------- P5 Servers Basic Auth ---------------------//

// app.use(
// 	function hello(req, res, next) {
// 		console.log("================> ROUTE CALLED ============>");
//   }
// 	// const ExpressMiddleware = ( req, res, next ) => {
// );

app.use(selectServer)

const IP = process.env.IP_BackupServerMini;
const API_URL = process.env.API_BackupServerMini;

app.get("/ip", (req, res) => {
  console.log("ip", req.headers.host)
  res.json({
    ArchiwareServerIP: IP,
  });
});

app.get("/servers", (req, res) => {
  res.json([
		{ server: IP },
		{ server: API_URL },
		{ server: "John" },
	]);
});

//---------------- Client Names----------------------//
// GET ClientNames
app.get("/general/clients", (req, res) => {
	// console.log("Client req ---> ", req.headers.server)
	console.log("Client res.locals.server ---> ", res.locals.server);
  const api = res.locals.server; // we've changed api
	const auth = res.locals.auth; // now lets change auth too !

	axios(`${api}/general/clients`, auth)
	// axios(`${res.locals.server}/general/clients`, res.locals.auth)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

// GET ClientInfo
app.get("/general/clients/:clientID", (req, res) => {
  
  console.log("Client res.locals.server---> ", res.locals.server);
  const api = res.locals.server;
  const auth = res.locals.auth;
	
  axios(`${api}/general/clients/${req.params.clientID}`, auth)
		.then(function (response) {
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				// res.json(error.response.statusText);
				console.log("Data =>", error.response.data);
				console.log(error.response.headers);
				res.json({
					resource: "Not Found",
					// could also say "0", present but unknown
					// "Try again in 1 hour" // "updating"
					status: error.response.statusText,
					responseData: error.response.data,
				});

				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
				// console.log(error);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
		});
});

// const srvinfo = require("./routes/general/srvinfo");
// const license = require("./routes/license/license");
// const clients = require("./routes/general/clients");
// const devices = require("./routes/general/devices");
// const jukeboxes = require("./routes/general/jukeboxes");
// const volumes = require("./routes/general/volumes");
// const jobs = require("./routes/general/jobs");

// app.use("/general/srvinfo", srvinfo);
// app.use("/license/resources", license)
// app.use("/general/clients", clients);
// app.use("/general/devices", devices);
// app.use("/general/jukeboxes", jukeboxes);
// app.use("/general/volumes", volumes);
// app.use("/general/jobs", jobs);


//---------------- Server Info ----------------------//
// GET Srvinfo
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

// //---------------- Client Names----------------------//
// // GET ClientNames
// app.get("/general/clients", (req, res) => {
// 	axios(`${API_URL}/general/clients`, auth)
// 		.then(function (response) {
// 			res.json(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// });
// // GET ClientInfo
// app.get("/general/clients/:clientID", (req, res) => {
// 	axios(`${API_URL}/general/clients/${req.params.clientID}`, auth)
// 		.then(function (response) {
// 			res.json(response.data);
// 		})
// 		.catch(function (error) {
// 			if (error.response) {
// 				console.log("Log ==>", error.response.statusText);
// 				// res.json(error.response.statusText);
// 				console.log("Data =>", error.response.data);
// 				console.log(error.response.headers);
// 				res.json({
// 					resource: "Not Found",
// 					// could also say "0", present but unknown
// 					// "Try again in 1 hour" // "updating"
// 					status: error.response.statusText,
// 					responseData: error.response.data,
// 				});

// 				console.log(error.response.status);
// 				console.log(error.response.headers);
// 				console.log(error.response.statusText);
// 				// console.log(error);
// 			} else if (error.request) {
// 				// The request was made but no response was received
// 				console.log(error.request);
// 			} else {
// 				// Something happened in setting up the request that triggered an Error
// 				console.log("Error", error.message);
// 			}
// 		});
// });

//---------------- License Resources----------------------//
// GET LicenseResourceNames
app.get("/license/resources", (req, res) => {
	axios(`${API_URL}/license/resources`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

// GET LicenseResourceInfo
app.get("/license/resources/:resourceID", (req, res) => {
	axios(`${API_URL}/license/resources/${req.params.resourceID}`, auth)
		// axios(`${API_URL}/license/resources/ThinClient`, auth)
		// axios(`${API_URL}/license/resources/ArchivePlan`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				// res.json(error.response.statusText);
				console.log("Data =>", error.response.data);
				console.log(error.response.headers);
				res.json({
					resource: "Not Found",
					// could also say "0", present but unknown
					// "Try again in 1 hour" // "updating"
					status: error.response.statusText,
					responseData: error.response.data,
				});

				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
				// console.log(error);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}
		});
});

//---------------- Devices ----------------------//
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

//---------------- Jukeboxes ----------------------//
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
// GET JukeboxInfo --> [{ slotcount: 24 }]
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

//---------------- Volumes ----------------------//
// GET JukeboxVolumes
app.get("/general/jukeboxes/:jukeboxID/volumes", (req, res) => {
  console.log("===> params ===>", req.params.jukeboxID)
  // console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}/volumes`, auth)
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			res.json(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
});

// GET JukeboxVolumes (by slotID)
// "Note that slot IDs are numbered starting from 1, the id may differ from 
// the numbering scheme of the library’s web interface.
// In case a volume is present but unknown, a 0 is returned for that volume. 
// To update the list of the volumes in the jukebox, call POST rest/v1/jukeboxes/{jukeboxID}" 
// https://blog.archiware.com/redoc/p5_rest_api/awp5api.html#operation/JukeboxVolumes
app.get("/general/jukeboxes/:jukeboxID/volumes/:slotID", (req, res) => {
	console.log("===> url ===>", req.url);
	// console.log("===> params ===>", req.params.jukeboxID);
  // console.log("===> params ===>", req.params.slotID);
  
	// console.log("===> header ===>", req.headers.slotID);
	// console.log("===> header ===>", req.headers);
	// console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
	// if req.headers.slotID is undefined (not present) - then all volumes returned
	// if req.headers.slotID is given then returns only the volume in this slot.
	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}/volumes`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			// slotID: req.headers.slotID,
			slotID: req.params.slotID,
			// slotID: parseInt(req.params.slotID, 10),
		},
	})
		.then(function (response) {
			// console.log("Hello Wrapper function");
			// console.log(JSON.stringify(response.data));
			console.log(`RESPONSE ===> ${req.params.slotID}`, response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			// https://stackoverflow.com/questions/49967779/axios-handling-errors
			if (error.response) {
				// Request made and server responded
				// console.log("Oops it failed!");
				// res.json("Oops it failed!");
				console.log("Log ==>", error.response.statusText);
				// res.json(error.response.statusText);

        console.log("Data =>", error.response.data);
        console.log(error.response.headers);

				res.json({
					data: { volumes: [{ ID: "Not Found" }] },
					// could also say "0", present but unknown
					// "Try again in 1 hour" // "updating"
					status: error.response.statusText,
					responseData: error.response.data,
				});

				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
				// console.log(error);
			} else if (error.request) {
				// The request was made but no response was received
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error", error.message);
			}

			// console.log(error);
		});
});

// GET VolumeNames
app.get("/general/volumes/:volumeID", (req, res) => {
	console.log("===> url ===>", req.url);
	// console.log("===> params ===>", req.params.jukeboxID);
  // console.log("===> params ===>", req.params.slotID);
	// console.log("===> header ===>", req.headers.slotID);
	// console.log("===> header ===>", req.headers);
	// console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
	// if req.headers.slotID is undefined (not present) - then all volumes returned
	// if req.headers.slotID is given then returns only the volume in this slot.
	axios(`${API_URL}/general/volumes/${req.params.volumeID}`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			// volumeID: req.params.volumeID,
		},
	})
		.then(function (response) {
			console.log(`RESPONSE ===> ${req.params.volumeID}`, response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				console.log("Data =>", error.response.data);
				console.log(error.response.headers);
				res.json({
					data: { volumes: [{ ID: "Not Found" }] },
					// could also say "0", present but unknown
					// "Try again in 1 hour" // "updating"
					status: error.response.statusText,
					responseData: error.response.data,
				});
				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}

			// console.log(error);
		});
});


//---------------- Jobs ----------------------//
// GET JobNames
// app.get("/general/jobs", (req, res) => {
// 	axios(`${API_URL}/general/jobs`, auth)
// 		.then(function (response) {
// 			// console.log(JSON.stringify(response.data));
// 			res.json(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// });

// GET JobNames
app.get("/general/jobs/:lastdays", (req, res) => {
	// app.get("/general/jobs", (req, res) => {
	// axios(`${API_URL}/general/jobs/18871/report`, {
  // axios(`${API_URL}/general/jobs/18876/protocol`, {
  // axios(`${API_URL}/general/jukeboxes/awjb0/volumes`, {
  // axios(`${API_URL}/general/volumes/10420`, {
  axios(`${API_URL}/general/jobs/`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			lastdays: parseInt(req.params.lastdays, 10), // default 1 day
			filter: "all",
		},
	})
		.then(function (response) {
			// console.log(`RESPONSE ===> ${req.params.lastdays}`, response.data);
			console.log(
				`RESPONSE Days ===> ${parseInt(req.params.lastdays, 10)}`,
				response.data
			);
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				console.log("Data =>", error.response.data);
				res.json({
					// volumes: [{ ID: "Not Found" }],
					status: error.response.statusText,
					data: error.response.data,
				});
				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
});

// GET JobProtocol
app.get("/general/jobs/:jobID/protocol", (req, res) => {
  axios(`${API_URL}/general/jobs/${req.params.jobID}/`, {
		headers: {
			Authorization: "Basic " + encodedToken,
			format: "json", // xml, path
			// filename: "string",
		},
	})
		.then(function (response) {
			console.log(`RESPONSE Days ===> ${req.params.jobID}`, response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				console.log("Data =>", error.response.data);
				res.json({
					// volumes: [{ ID: "Not Found" }],
					status: error.response.statusText,
					data: error.response.data,
				});
				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
});

// GET JobReport
app.get("/general/jobs/:jobID/report", (req, res) => {
  axios(`${API_URL}/general/jobs/${req.params.jobID}/report`, {
		headers: {
			Authorization: "Basic " + encodedToken,
		},
	})
		.then(function (response) {
			console.log(`RESPONSE Days ===> ${req.params.jobID}`, response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log("Log ==>", error.response.statusText);
				console.log("Data =>", error.response.data);
				res.json({
					// volumes: [{ ID: "Not Found" }],
					status: error.response.statusText,
					data: error.response.data,
				});
				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
});

// GET JobInfo
app.get("/general/jobs/:jobID", (req, res) => {
	axios(`${API_URL}/general/jobs/${req.params.jobID}`, {
	// axios(`${API_URL}/general/jobs/18857`, {
	// axios("100.97.227.115:8000/rest/v1/general/jobs/18857", {
		headers: {
			Authorization: "Basic " + encodedToken,
		},
	})
		.then(function (response) {
			console.log(`RESPONSE ===> ${req.params.jobID}`, response.data);
			res.json(response.data);
		})
		.catch(function (error) {
			if (error.response) {
				console.log(`PARAMS ===> ${req.params.jobID}`);
				console.log("Log ==>", error.response.statusText);
				console.log("Data =>", error.response.data);
				res.json({
					// volumes: [{ ID: "Not Found" }],
					status: error.response.statusText,
					data: error.response.data,
				});
				console.log(error.response.status);
				console.log(error.response.headers);
				console.log(error.response.statusText);
			} else if (error.request) {
				console.log(error.request);
			} else {
				console.log("Error", error.message);
			}
		});
});

// GET JobInfo
// app.get("/general/jukeboxes/:jukeboxID", (req, res) => {
//   // console.log("axios ->", `${API_URL}/general/jukeboxes/${req.params.jukeboxID}`);
// 	axios(`${API_URL}/general/jukeboxes/${req.params.jukeboxID}`, auth)
// 		.then(function (response) {
// 			// console.log("Hello Wrapper function");
// 			// console.log(JSON.stringify(response.data));
// 			res.json(response.data);
// 		})
// 		.catch(function (error) {
// 			console.log(error);
// 		});
// });









// Add space for clearer output reading
const chorus = "         ";  
console.log(`${chorus.repeat(10)}`);


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




// -------- Remove ----------- // 
// ----------- Client Server Access -------------------------
// const username = process.env.USERNAME_Client;
// const password = process.env.PASSWORD_Client;

// const users = {};
// users[username] = password;

// app.use(
// 	basicAuth({
// 		users: users, // { username: password }
// 		challenge: true,
// 		unauthorizedResponse: getUnauthorizedResponse,
// 	})
// );
// function getUnauthorizedResponse(req) {
// 	return req.auth
// 		? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
// 		: "No credentials provided";
// }




