const { getInfoNews } = require("../services/news.service.js");
const http = require("http");

module.exports = {
  getInformationNews: async (req, res) => {
    try {
      let informationNews = await getInfoNews(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(informationNews));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
};
