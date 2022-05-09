const fetch = require("node-fetch");
module.exports = {
  getInfoNews: async (responseFromController) => {
    const apiKey = "127665131df64fdcbd276bbcb8525dff";
    var indexPage = "",
      onlySecondName = "",
      ok = 0;
    for (var i = 0; i < responseFromController.length; i++) {
      if (ok == 1) indexPage += responseFromController[i];
      else onlySecondName += responseFromController[i];
      if (responseFromController[i] === "/") ok = 1;
    }
    let url = `https://newsapi.org/v2/everything?q=${onlySecondName}&language=en&pageSize=18&page=${indexPage}&apiKey=${apiKey}`;
    console.log(url);
    const final_array = [];
    let index_for = 0;
    for (let i = 0; i <= 17; i++) {
      const res = await fetch(url);
      const array_with_info_about_news = await res.json();
      final_array[index_for] = array_with_info_about_news.articles[i].title;
      index_for++;
      final_array[index_for] =
        array_with_info_about_news.articles[i].publishedAt;
      index_for++;
      final_array[index_for] =
        array_with_info_about_news.articles[i].description;
      index_for++;
      final_array[index_for] =
        array_with_info_about_news.articles[i].urlToImage;
      index_for++;
      final_array[index_for] = array_with_info_about_news.articles[i].url;
      index_for++;
    }
    return final_array;
  },
};
