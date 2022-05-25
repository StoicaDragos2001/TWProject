const {
  getInfoMovies,
  getInfoMoviesGenre,
} = require("../services/movies.service.js");
const http = require("http");

module.exports = {
  getInformationMovies: async (req, res) => {
    try {
      let informationMovies = await getInfoMovies(req);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(informationMovies));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
  getInformationMoviesGenre: async (req, res) => {
    try {
      let dataArray = req.split("/");
      let genre = dataArray[0];
      let id = dataArray[1];
      let informationMovies = await getInfoMoviesGenre(genre, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(informationMovies));
    } catch (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end("An error occurred...");
    }
  },
};
