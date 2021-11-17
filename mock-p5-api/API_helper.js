// https://codehandbook.org/how-to-make-rest-api-calls-in-express-web-app/
// 
// Wrapper for request module that you are using to make API calls
// In future if you need to use any other module, you simple need 
// to modify the API_helper.js wrapper and not every where inside the application.

const request = require("request");

module.exports = {
	/*
	 ** This method returns a promise
	 ** which gets resolved or rejected based
	 ** on the result from the API
	 */
	make_API_call: function (url) {
		return new Promise((resolve, reject) => {
			request(url, { json: true }, (err, res, body) => {
				if (err) reject(err);
				resolve(body);
			});
		});
	},
};


// app.get("/getAPIResponseMunki", (req, res) => {
// 	api_helper
// 		.make_API_call("http://100.104.128.109:8000/rest/v1/general/srvinfo")
// 		.then((response) => {
// 			res.json(response);
// 		})
// 		.catch((error) => {
// 			res.send(error);
// 		});
// });