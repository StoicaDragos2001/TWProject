const {
  getInfoStatisticsNominations,
  getInfoStatisticsAboutAWinner,
} = require("../services/statistics.service");
const http = require("http");
module.exports = {
  getInformationStatistics: async (req, res) => {
    try {
      let information = await getInfoStatisticsNominations();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(information));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
  getInformationStatisticsAboutAWinner: async (req, res) => {
    try {
      let information = await getInfoStatisticsAboutAWinner(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(information));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
};
