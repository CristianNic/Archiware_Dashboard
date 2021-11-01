const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const homepage = require("./routes/homepage");
const license = require("./routes/license");
const general = require("./routes/general/general");
const clients = require("./routes/general/clients");
const plans = require("./routes/archive/plans");
const indexes = require("./routes/archive/indexes");
const devices = require("./routes/archive/devices");

app.get("/", (req, res) => {
	res.json({
		Welcome: "Welcome to the Archiware P5 Mock API",
	});
});

app.get("/", homepage);
app.use("/general", general);
app.use("/license/resources", license);
app.use("/archive/plans", plans);
app.use("/archive/indexes", indexes);
app.use("/general/devices", devices);
app.use("/general/clients", clients);

app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));









// --- Try out chokidar --- //
// const chokidar = require("chokidar");
// // One-liner for current directory
// chokidar.watch(".").on("all", (event, path) => {
// 	console.log(event, path);
// });
