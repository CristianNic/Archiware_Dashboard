const express = require("express")
const general = express.Router()
const fs = require("fs")

function loadSrvInfoData() {
  return fs.readFileSync("./data/general/get-srvinfo.json", "utf8");
}

general.get("/", (req, res) => {
  res.json({
    Welcome: "Welcome to /general"
  });
})

general.get("/srvinfo", (req, res) => {
  const srvinfo = JSON.parse(loadSrvInfoData());
  res.json(srvinfo)
})


module.exports = general;