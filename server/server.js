const express = require("express");
const app = express();
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
app.use(selectServer)

const srvinfo = require("./routes/general/srvinfo");
const license = require("./routes/license/license");
const clients = require("./routes/general/clients");
const devices = require("./routes/general/devices");
const jukeboxes = require("./routes/general/jukeboxes");
const volumes = require("./routes/general/volumes");
const jobs = require("./routes/general/jobs");

app.use("/general/srvinfo", srvinfo);
app.use("/license/resources", license)
app.use("/general/clients", clients);
app.use("/general/devices", devices);
app.use("/general/jukeboxes", jukeboxes);
app.use("/general/volumes", volumes);
app.use("/general/jobs", jobs);


app.listen(PORT, console.log(`Server listening at: http://localhost:${PORT}`));



