function statusMovie(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    console.log(response);
    return Promise.reject(new Error("An unexpected error occured"));
  }
}

let index = 1;
let genre = 0;
function initialization() {
  let btnContainer = document.getElementById("myButtons");
  let btns = btnContainer.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      index = this.id;
      if (genre == 0) getInformationMovies();
      else getInformationMoviesGenre();
      this.className += " active";
    });
  }
  let btnsSpecial = btnContainer.getElementsByClassName("special");
  for (let i = 0; i < 2; i++) {
    btnsSpecial[i].addEventListener("click", function () {
      if (this.id == 0) {
        if (index != 1) {
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index--;
          let indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          if (genre == 0) getInformationMovies();
          else getInformationMoviesGenre();
        }
      } else if (this.id == 8) {
        if (index != 7) {
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index++;
          let indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          if (genre == 0) getInformationMovies();
          else getInformationMoviesGenre();
        }
      }
    });
  }
}

let data;
async function getDataMovies() {
  let urlMoviesPage = `http://localhost:5000/movies/${index}`;
  await fetch(urlMoviesPage)
    .then(statusMovie)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}

async function getDataMoviesGenre() {
  let urlMoviesPageGenre = `http://localhost:5000/movies/${genre}/${index}`;
  await fetch(urlMoviesPageGenre)
    .then(statusMovie)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}

var container = document.getElementById("filters");
var filters = container.getElementsByClassName("genre");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active-genre");
    current[0].className = current[0].className.replace(" active-genre", "");
    genre = this.id;
    this.className += " active-genre";
    index = 1;
    let currentPage = document.getElementsByClassName("active");
    currentPage[0].className = current[0].className.replace(" active", "");
    let indexArrow = document.getElementById(`${index}`);
    indexArrow.className += " active";
    if (genre == 0) getInformationMovies(index);
    else getInformationMoviesGenre(index, genre);
  });
}

async function getInformationMovies() {
  await getDataMovies();
  let oldCards = document.getElementsByClassName("movie-card");
  for (let j = 0; j < oldCards.length; j++) {
    oldCards[j].remove();
    j--;
  }
  for (let i = 0; i < data.length; i = i + 4) {
    createMovieCard(data[i], data[i + 1], data[i + 2], data[i + 3]);
  }
}

async function getInformationMoviesGenre() {
  await getDataMoviesGenre();
  let oldCards = document.getElementsByClassName("movie-card");
  for (let j = 0; j < oldCards.length; j++) {
    oldCards[j].remove();
    j--;
  }
  for (let i = 0; i < data.length; i = i + 4) {
    createMovieCard(data[i], data[i + 1], data[i + 2], data[i + 3]);
  }
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
  movie_card_front.style.backgroundImage =
    "url('" + "https://image.tmdb.org/t/p/original/" + poster_url + "')";

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
