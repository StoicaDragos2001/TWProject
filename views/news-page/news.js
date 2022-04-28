{
  /* <div class="news-card">
            <div class="news-card-content">
              <div class="news-card-front">
                <div class="article-image"></div>
                <div class="card-text">
                  <div class="card-text-content">
                    <div id="name">
                      Why Elon Musk’s about-face on Twitter board seat sets up
                      ‘Game of Thrones’ battle
                    </div>
                    <div id="date">2022-04-09</div>
                  </div>
                </div>
              </div>
              <div class="news-card-back">
                <div class="back-text">
                  <div id="overview">
                    Elon Musk’s decision to reject a seat on Twitter’s board of
                    directors could set up a “Game of Thrones”-style battle over
                    the social media platform’s future in the coming days,
                    according to a prominent analyst...
                  </div>
                  <a id="back-source" href="https://newsapi.org/"
                    >See full source</a
                  >
                </div>
              </div>
            </div>
          </div> */
}

var cards_parent = document.getElementById("cards");

function createMovieCard(name, date, overview_text, poster_url) {
  var news_card = document.createElement("div");
  news_card.classList.add("news-card");
  cards_parent.appendChild(news_card);

  var news_card_content = document.createElement("div");
  news_card_content.classList.add("news-card-content");
  news_card.appendChild(news_card_content);

  var news_card_front = document.createElement("div");
  news_card_front.classList.add("news-card-front");
  news_card_content.appendChild(news_card_front);

  var article_image = document.createElement("div");
  article_image.classList.add("article-image");
  news_card_front.appendChild(article_image);
  article_image.style.backgroundImage = "url('" + poster_url + "')";

  var card_text = document.createElement("div");
  card_text.classList.add("card-text");
  news_card_front.appendChild(card_text);

  var card_text_content = document.createElement("div");
  card_text_content.classList.add("card-text-content");
  card_text.appendChild(card_text_content);

  var movie_name = document.createElement("div");
  movie_name.id = "name";
  movie_name.textContent = name;
  card_text_content.appendChild(movie_name);

  var movie_date = document.createElement("div");
  movie_date.id = "date";
  movie_date.textContent = date;
  card_text_content.appendChild(movie_date);

  var news_card_back = document.createElement("div");
  news_card_back.classList.add("news-card-back");
  news_card_content.appendChild(news_card_back);

  var back_text = document.createElement("div");
  back_text.classList.add("back-text");
  news_card_back.appendChild(back_text);

  var title = document.createElement("a");
  var overview = document.createElement("div");
  title.id = "back-source";
  title.classList.add("back-source");

  title.textContent = "See full source";
  overview.id = "overview";
  overview.textContent = overview_text;
  back_text.appendChild(overview);
  back_text.appendChild(title);
}

function loadCards() {
  var name =
    "Why Elon Musk’s about-face on Twitter board seat sets up ‘Game of Thrones’ battle";
  var url =
    "https://s.yimg.com/os/creatr-uploaded-images/2021-07/b1850ed0-dfa4-11eb-bf7d-23e763248476";
  var date = "2022-04-09";
  var overview_text =
    "Elon Musk’s decision to reject a seat on Twitter’s board of directors could set up a “Game of Thrones”-style battle over the social media platform’s future in the coming days, according to a prominent analyst...";
  console.log(overview_text);
  for (let i = 0; i < 17; i++) {
    createMovieCard(name, date, overview_text, url);
  }
  var elements = document.getElementsByClassName("back-source");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", () => {
      window.location.href = "https://newsapi.org/";
    });
  }
}
