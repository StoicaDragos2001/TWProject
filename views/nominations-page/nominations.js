let data;
let wonNomination = "all";
let yearNomination = 2020;
const url_nomination = `http://localhost:5000/nominations`;
function statusNomination(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    console.log(response);
    return Promise.reject(new Error("An unexpected error occured"));
  }
}
let index = 1;
function initialization() {
  let btnContainer = document.getElementById("myButtons");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      index = this.id;
      createCards(wonNomination, yearNomination);
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
          console.log(indexArrow);
          indexArrow.className += " active";
          createCards(wonNomination, yearNomination);
        }
      } else if (this.id == 8) {
        if (index != 7) {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index++;
          var indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          createCards(wonNomination, yearNomination);
        }
      }
    });
  }
}

var checkboxes = document.querySelectorAll(
  "input[type=checkbox][name=filters]"
);
let enabledFilters = [];
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    enabledFilters = Array.from(checkboxes)
      .filter((i) => i.checked)
      .map((i) => i.value);
    if (enabledFilters.length == 2 || enabledFilters.length == 0)
      wonNomination = "all";
    else wonNomination = enabledFilters[0];
    createCards(wonNomination, yearNomination);
  });
});
var selectedYear = document.getElementById("year-select");
selectedYear.addEventListener(
  "change",
  function () {
    console.log(this.value);
    yearNomination = this.value;
    createCards(wonNomination, yearNomination);
  },
  false
);
async function getData() {
  await fetch(url_nomination)
    .then(statusNomination)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}

async function filter(wonNomination1, yearNomination1) {
  var filteredData = [];

  for (var i = 0; i < data.length; i++) {
    var newYear = data[i].year.substring(0, 4);

    if (
      (data[i].won === wonNomination1 || wonNomination1 === "all") &&
      newYear == yearNomination1
    ) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
}

async function createCards(wonNomination, yearNomination) {
  var oldCardsActors = document.getElementsByClassName("actor-card");
  for (let j = 0; j < oldCardsActors.length; j++) {
    oldCardsActors[j].remove();
    j--;
  }
  var oldCardsMovie = document.getElementsByClassName("movie-card");
  for (let k = 0; k < oldCardsMovie.length; k++) {
    oldCardsMovie[k].remove();
    k--;
  }
  var filteredData = await filter(wonNomination, yearNomination);
  for (var i = 18 * (index - 1); i < 18 * index; i++) {
    if (filteredData[i].full_name !== "") {
      createActorCard(
        filteredData[i].full_name,
        filteredData[i].show,
        filteredData[i].category,
        filteredData[i].year,
        filteredData[i].won
      );
    } else {
      createMovieCard(
        filteredData[i].show,
        filteredData[i].category,
        filteredData[i].year,
        filteredData[i].won
      );
    }
  }
}
async function getInformation() {
  await getData();
  await createCards(wonNomination, yearNomination);
}

var cards_parent = document.getElementById("cards");
const trophy_icon = "fa fa-trophy fa-xs";
// <div class="actor-card">
//     <div class="actor-card-content">
//       <div class="actor-card-front">
//         <div class="card-text">
//           <div id="actor-name">Scarlett Johansson</div>
//           <div id="actor-movie-name">Marriage Story</div>
//         </div>
//         <div class="awarded">
//           <i class="fa fa-trophy fa-xs"></i>
//         </div>
//       </div>
//       <div class="actor-card-back">
//         <div id="actor-award">Female actor in a leading role</div>
//         <div id="actor-edition">2020 - 26th Annual</div>
//       </div>
//     </div>
// </div>
function createActorCard(name, movie, award, edition, recipient) {
  var actor_card = document.createElement("div");
  actor_card.classList.add("actor-card");
  cards_parent.appendChild(actor_card);

  var actor_card_content = document.createElement("div");
  actor_card_content.classList.add("actor-card-content");
  actor_card.appendChild(actor_card_content);

  var actor_card_front = document.createElement("div");
  actor_card_front.classList.add("actor-card-front");
  actor_card_content.appendChild(actor_card_front);

  var card_text = document.createElement("div");
  card_text.classList.add("card-text");
  actor_card_front.appendChild(card_text);

  var awarded = document.createElement("div");
  awarded.classList.add("awarded");
  actor_card_front.appendChild(awarded);

  var trophy = document.createElement("i");
  trophy.setAttribute("class", trophy_icon);
  awarded.appendChild(trophy);
  if (recipient === "False") {
    trophy.style.display = "none";
  }

  var actor_name = document.createElement("div");
  actor_name.id = "actor-name";
  actor_name.textContent = name;
  var actor_movie_name = document.createElement("div");
  actor_movie_name.id = "actor-movie-name";
  actor_movie_name.textContent = movie;
  card_text.appendChild(actor_name);
  card_text.appendChild(actor_movie_name);

  var actor_card_back = document.createElement("div");
  actor_card_back.classList.add("actor-card-back");
  actor_card_content.appendChild(actor_card_back);

  var actor_award = document.createElement("div");
  actor_award.id = "actor-award";
  actor_award.textContent = award;
  var actor_edition = document.createElement("div");
  actor_edition.id = "actor-edition";
  actor_edition.textContent = edition;
  actor_card_back.appendChild(actor_award);
  actor_card_back.appendChild(actor_edition);
}

// <!-- <div class="movie-card">
// <div class="movie-card-content">
//   <div class="movie-card-front">
//     <div class="card-text">
//       <div id="movie-name">Marriage Story</div>
//     </div>
//     <div class="awarded">
//       <i class="fa fa-trophy fa-xs"></i>
//     </div>
//   </div>
//   <div class="movie-card-back">
//     <div id="movie-award">Best movie</div>
//     <div id="movie-edition">2020 - 26th Annual</div>
//   </div> -->

function createMovieCard(movie, award, edition, recipient) {
  var movie_card = document.createElement("div");
  movie_card.classList.add("movie-card");
  cards_parent.appendChild(movie_card);

  var movie_card_content = document.createElement("div");
  movie_card_content.classList.add("movie-card-content");
  movie_card.appendChild(movie_card_content);

  var movie_card_front = document.createElement("div");
  movie_card_front.classList.add("movie-card-front");
  movie_card_content.appendChild(movie_card_front);

  var card_text = document.createElement("div");
  card_text.classList.add("card-text");
  movie_card_front.appendChild(card_text);

  var movie_name = document.createElement("div");
  movie_name.id = "movie-name";
  movie_name.textContent = movie;
  card_text.appendChild(movie_name);

  var awarded = document.createElement("div");
  awarded.classList.add("awarded");
  movie_card_front.appendChild(awarded);

  var trophy = document.createElement("i");
  trophy.setAttribute("class", trophy_icon);
  awarded.appendChild(trophy);
  if (recipient == "False") {
    trophy.style.display = "none";
  }

  var movie_card_back = document.createElement("div");
  movie_card_back.classList.add("movie-card-back");
  movie_card_content.appendChild(movie_card_back);

  var movie_award = document.createElement("div");
  movie_award.id = "movie-award";
  movie_award.textContent = award;
  var movie_edition = document.createElement("div");
  movie_edition.id = "movie-edition";
  movie_edition.textContent = edition;
  movie_card_back.appendChild(movie_award);
  movie_card_back.appendChild(movie_edition);
}
