const fetch = require("node-fetch");
module.exports = {
  getInfoMovies: async (index) => {
    const apiKey = "a8d5231e38f15156cf8f57ed9af1669c";
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${index}`;
    console.log(url);
    const final_array = [];
    let index_for = 0;
    for (let i = 0; i <= 17; i++) {
      const res = await fetch(url);
      const array_with_info_about_movies = await res.json();
      final_array[index_for] =
        array_with_info_about_movies.results[i].original_title;
      index_for++;
      final_array[index_for] =
        array_with_info_about_movies.results[i].vote_average;
      index_for++;
      final_array[index_for] = array_with_info_about_movies.results[i].overview;
      index_for++;
      final_array[index_for] =
        array_with_info_about_movies.results[i].poster_path;
      index_for++;
    }
    return final_array;
  },
  getInfoMoviesGenre: async (genre, index) => {
    const apiKey = "a8d5231e38f15156cf8f57ed9af1669c";
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${index}`;
    console.log(url);
    const final_array = [];
    let index_for = 0;
    for (let i = 0; i <= 17; i++) {
      const res = await fetch(url);
      const array_with_info_about_movies = await res.json();
      final_array[index_for] =
        array_with_info_about_movies.results[i].original_title;
      index_for++;
      final_array[index_for] =
        array_with_info_about_movies.results[i].vote_average;
      index_for++;
      final_array[index_for] = array_with_info_about_movies.results[i].overview;
      index_for++;
      final_array[index_for] =
        array_with_info_about_movies.results[i].poster_path;
      index_for++;
    }
    return final_array;
  },
};
