var container = document.getElementById("filters");
var filters = container.getElementsByClassName("genre");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    this.classList.toggle("active-genre");
  });
}

//   <div class="movie-card">
//   <div class="movie-card-content">
//     <div class="movie-card-front">
//       <div class="card-text">
//         <div class="card-text-content">
//           <div id="name">Moonlight</div>
//           <div id="rating">7.2</div>
//         </div>
//       </div>
//     </div>
//     <div class="movie-card-back">
//       <div class="back-text">
//         <div id="back-title">Overview:</div>
//         <div id="overview">
//           The Last Jedi follows Rey as she seeks the aid of Luke
//           Skywalker, in hopes of turning the tide for the Resistance
//           in the fight against Kylo Ren and the First Order, while
//           General Leia Organa, Finn, and Poe Dameron attempt to escape
//           a First Order attack on the dwindling Resistance fleet.
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

var cards_parent = document.getElementById("cards");

function createMovieCard(name, rating, overview_text, poster_url) {
  var movie_card = document.createElement("div");
  movie_card.classList.add("movie-card");
  cards_parent.appendChild(movie_card);

  var movie_card_content = document.createElement("div");
  movie_card_content.classList.add("movie-card-content");
  movie_card.appendChild(movie_card_content);

  var movie_card_front = document.createElement("div");
  movie_card_front.classList.add("movie-card-front");
  movie_card_content.appendChild(movie_card_front);
  movie_card_front.style.backgroundImage = "url('" + poster_url + "')";

  var card_text = document.createElement("div");
  card_text.classList.add("card-text");
  movie_card_front.appendChild(card_text);

  var card_text_content = document.createElement("div");
  card_text_content.classList.add("card-text-content");
  card_text.appendChild(card_text_content);

  var movie_name = document.createElement("div");
  movie_name.id = "name";
  movie_name.textContent = name;
  card_text_content.appendChild(movie_name);

  var movie_rating = document.createElement("div");
  movie_rating.id = "rating";
  movie_rating.textContent = rating;
  card_text_content.appendChild(movie_rating);

  var movie_card_back = document.createElement("div");
  movie_card_back.classList.add("movie-card-back");
  movie_card_content.appendChild(movie_card_back);

  var back_text = document.createElement("div");
  back_text.classList.add("back-text");
  movie_card_back.appendChild(back_text);

  var title = document.createElement("div");
  var overview = document.createElement("div");
  title.id = "back-title";
  title.textContent = "Overview:";
  overview.id = "overview";
  overview.textContent = overview_text;
  back_text.appendChild(title);
  back_text.appendChild(overview);
}

function loadCards() {
  var url =
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3ba32041615387.57acc4bf0b15f.jpg";
  var overview_text =
    "The Last Jedi follows Rey as she seeks the aid of Luke Skywalker,in hopes of turning the tide for the Resistance in the fight against Kylo Ren and the First Order, whileGeneral Leia Organa, Finn, and Poe Dameron attempt to escape a First Order attack on the dwindling Resistance fleet.";
  console.log(overview_text);
  for (let i = 0; i < 16; i++) {
    createMovieCard("Moonlight", "7.2", overview_text, url);
  }
}
