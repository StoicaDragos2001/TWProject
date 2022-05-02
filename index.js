const http = require("http");
const fs = require("fs");
const https = require("https");
const url = require("url");
const path = require("path");
const fetch = require("node-fetch");

require("./tester/mongoose_tester.js");
const { getInformation } = require("./controllers/nominations.controller.js");

const server = http.createServer(async (req, res) => {
  var newurl = req.url;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (newurl === "/nominations" && req.method === "GET") {
    getInformation(req, res);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
