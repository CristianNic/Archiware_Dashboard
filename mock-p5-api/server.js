const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("morgan");
const cors = require("cors");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

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

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const users = {};
users[username] = password;

app.use(
	basicAuth({
		users: users, // { username: password }
		challenge: true,
		unauthorizedResponse: getUnauthorizedResponse,
	})
);
function getUnauthorizedResponse(req) {
	return req.auth
		? "Credentials " + req.auth.user + ":" + req.auth.password + " rejected"
		: "No credentials provided";
}

//------- for testing ------//
app.get("/base64auth", (req, res) => {
	// console.log("request", req);
	res.json({
		Welcome: "Welcome to the Base64 encrypted page. You made it =)",
		requestHeaders: req.headers,
		auth: req.auth,
		body: req.body,
		route: req.route,
		params: req.params,
		query: req.query,
		url: req.url,
	});
});

const homepage = require("./routes/homepage");
const license = require("./routes/license");
const general = require("./routes/general/general");
const clients = require("./routes/general/clients");
const plans = require("./routes/archive/plans");
const indexes = require("./routes/archive/indexes");
const devices = require("./routes/archive/devices");
// const { get } = require("./routes/homepage");

app.get("/", homepage);
app.use("/general", general);
app.use("/license/resources", license);
app.use("/archive/plans", plans);
app.use("/archive/indexes", indexes);
app.use("/general/devices", devices);
app.use("/general/clients", clients);

app.get("/", (req, res) => {
	res.json({
		Welcome: "Welcome to the Archiware P5 Mock API",
	});
});

// require API_helper.js
const api_helper = require("./API_helper");

// app.get("/getAPIResponse", (req, res) => {
// 	// API code will be here
// });

/*
 * Route to DEMO the API call to a REST API Endpoint
 * REST URL : https://jsonplaceholder.typicode.com/todos/1
 */
app.get("/getAPIResponse", (req, res) => {
	api_helper
		.make_API_call("https://jsonplaceholder.typicode.com/todos/1")
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.send(error);
		});
});
// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html    <-----

var options = {
	method: "GET",
	url: "http://100.104.128.109:8000/rest/v1/general/srvinfo",
	headers: {
		Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=",
	},
};

app.get("/getAPIResponseMunki", (req, res) => {
	api_helper
		.make_API_call(
			"http://100.104.128.109:8000/rest/v1/general/srvinfo",
		)
		.then((response) => {
			res.json(response);
		})
		.catch((error) => {
			res.send(error);
		});
});

// request(options, function (error, response) {
// 	if (error) throw new Error(error);
// 	console.log(response.body);
// });

// ----------- Axios
var axios = require("axios");

var config = {
	method: "get",
	url: "http://100.104.128.109:8000/rest/v1/general/srvinfo",
	headers: {
		Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=",
	},
};
// --- works !! 
// axios(config)
// 	.then(function (response) {
// 		console.log(JSON.stringify(response.data));
// 	})
// 	.catch(function (error) {
// 		console.log(error);
//   });

app.get("/getAPIResponseMunki_v1", (req, res) => {
  axios(config)
    .then(function (response) {
      console.log("Hello Wrapper function")
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
})

// const axios = require("axios");

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

console.log("username", username);
console.log("password", password);
console.log("users", users);