const fetch = require("node-fetch");
module.exports = {
  getInfoActors: async (index) => {
    const apiKey = "a8d5231e38f15156cf8f57ed9af1669c";
    let url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${index}`;
    console.log(url);
    const final_array = [];
    let index_for = 0;
    for (let i = 0; i <= 17; i++) {
      const res = await fetch(url);
      const array_with_info_about_actors = await res.json();
      final_array[index_for] = array_with_info_about_actors.results[i].name;
      index_for++;
      final_array[index_for] =
        "POPULARITY: " + array_with_info_about_actors.results[i].popularity;
      index_for++;
      final_array[index_for] =
        array_with_info_about_actors.results[i].profile_path;
      index_for++;
    }
    return final_array;
  },
};
