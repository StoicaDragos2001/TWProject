var onlySecondName = localStorage.getItem("variable");
var actorName = localStorage.getItem("actorName");
function changeText() {
  var containerTitle = document.getElementsByTagName("h2");
  containerTitle[0].innerHTML = `News about ${actorName}:`;
}
function statusNews(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    console.log(response);
    return Promise.reject(new Error("An unexpected error occured"));
  }
}
var index = 1;
function initialization() {
  var btnContainer = document.getElementById("myButtons");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      index = this.id;
      getInformationNews();
      this.className += " active";
    });
  }
  var btnsSpecial = btnContainer.getElementsByClassName("special");
  for (var i = 0; i < 2; i++) {
    btnsSpecial[i].addEventListener("click", function () {
      if (this.id == 0) {
        if (index != 1) {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index--;
          var indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          getInformationNews();
        }
      } else if (this.id == 8) {
        if (index != 7) {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index++;
          var indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          getInformationNews();
        }
      }
    });
  }
}

let data;
async function getDataNews() {
  let url_news_page = `http://localhost:5000/news/${onlySecondName}/${index}`;
  await fetch(url_news_page)
    .then(statusNews)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}
async function getInformationNews() {
  await getDataNews();
  var oldCards = document.getElementsByClassName("news-card");
  for (let j = 0; j < oldCards.length; j++) {
    oldCards[j].remove();
    j--;
  }
  for (var i = 0; i < data.length; i = i + 5) {
    var time = data[i + 1];
    var ok = 0,
      newTime = "";
    for (var letter = 0; letter < time.length; letter++) {
      if (time[letter] == "T") ok = 1;
      if (ok == 0) newTime += time[letter];
    }
    createNewsCard(data[i], newTime, data[i + 2], data[i + 3], data[i + 4]);
  }
}
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

function createNewsCard(name, date, overview_text, poster_url, source_url) {
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
  title.addEventListener("click", function () {
    window.open(source_url, "_blank").focus();
  });
  title.textContent = "See full source";
  overview.id = "overview";
  overview.textContent = overview_text;
  back_text.appendChild(overview);
  back_text.appendChild(title);
}
