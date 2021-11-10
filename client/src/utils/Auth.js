export const API_URL = process.env.REACT_APP_API_URL;
const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

export const auth = {
	// authConfig  // configAuth // auth
	auth: {
		username: USERNAME,
		password: PASSWORD,
	},
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Credentials": "true",
		// 'Access-Control-Allow-Headers': 'origin',
	},
	// withCredentials : false,
	crossDomain: true,
};
