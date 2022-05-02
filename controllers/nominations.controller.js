const { getInfo } = require("../services/nominations.service.js");
const http = require("http");

module.exports = {
  getInformation: async (req, res) => {
    try {
      let information = await getInfo();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(information));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
};
