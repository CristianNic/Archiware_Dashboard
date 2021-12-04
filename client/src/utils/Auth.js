export const API_URL = process.env.REACT_APP_BACKEND_URL; // http://localhost:8090

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

export const auth = {
	auth: {
		username: USERNAME,
		password: PASSWORD,
	},
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Headers": "origin",
	},
	crossDomain: true,
};

