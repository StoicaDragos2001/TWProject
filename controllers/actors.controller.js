const { getInfoActors } = require("../services/actors.service.js");
const http = require("http");

module.exports = {
  getInformationActors: async (req, res) => {
    try {
      let informationActors = await getInfoActors(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(informationActors));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
};
