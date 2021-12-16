require("dotenv").config();

//---------------- Auth, Server 1 ---------------//
const s1_token = `${process.env.s1_USERNAME}:${process.env.s1_PASSWORD}`;
const s1_encodedToken = Buffer.from(s1_token).toString("base64");

const s1_auth = {
	headers: {
		Authorization: "Basic " + s1_encodedToken,
	},
};
exports.s1_auth = s1_auth;
exports.s1_encodedToken = s1_encodedToken;

//---------------- Auth, Server 2 ---------------//
const s2_token = `${process.env.s2_USERNAME}:${process.env.s2_PASSWORD}`;
const s2_encodedToken = Buffer.from(s2_token).toString("base64");

const s2_auth = {
	headers: {
		Authorization: "Basic " + s2_encodedToken,
	},
};
exports.s2_auth = s2_auth;
exports.s2_encodedToken = s2_encodedToken;

//---------------- Auth, Server 2 ---------------//
const s3_token = `${process.env.s3_USERNAME}:${process.env.s3_PASSWORD}`;
const s3_encodedToken = Buffer.from(s3_token).toString("base64");

const s3_auth = {
	headers: {
		Authorization: "Basic " + s3_encodedToken,
	},
};
exports.s3_auth = s3_auth;
exports.s3_encodedToken = s3_encodedToken;
