let onlySecondName = "";
function myFunction(k) {
  let nameActor = data[3 * k];
  let ok = 0;
  for (let i = 1; i < nameActor.length; i++) {
    if (ok == 1) onlySecondName += nameActor[i];
    if (nameActor[i] === " ") ok = 1;
  }
  localStorage.setItem("variable", onlySecondName);
  localStorage.setItem("actorName",nameActor);
  location.href = `../news-page/news.html`;
}
function statusActor(response) {
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
  let btns = btnContainer.getElementsByClassName("btn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      index = this.id;
      getInformationActors();
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
          getInformationActors();
        }
      } else if (this.id == 8) {
        if (index != 7) {
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          index++;
          let indexArrow = document.getElementById(`${index}`);
          indexArrow.className += " active";
          getInformationActors();
        }
      }
    });
  }
}

let data;
async function getDataActors() {
  let urlActorsPage = `http://localhost:5000/actors/${index}`;
  await fetch(urlActorsPage)
    .then(statusActor)
    .then((res) => res.json())
    .then((response) => {
      data = response;
    });
}
async function getInformationActors() {
  await getDataActors();
  let oldCards = document.getElementsByClassName("actor-card");
  for (let j = 0; j < oldCards.length; j++) {
    oldCards[j].remove();
    j--;
  }
  for (let i = 0; i < data.length; i = i + 3) {
    createActorCard(data[i], data[i + 1], data[i + 2]);
  }
  let newCards = document.getElementsByClassName("actor-card");
  for (let k = 0; k < newCards.length; k++) {
    newCards[k].addEventListener("click", function () {
      myFunction(k);
    });
  }
}

let cardsParent = document.getElementById("cards");
{
  /* <div class="actor-card">
  <div class="actor-card-content">
    <div class="actor-card-front">
      <div class="actor-image"></div>
      <div class="card-text">
        <div id="actor-name">Brad Pitt</div>
        <div id="actor-popularity">Popularity: 10.673</div>
      </div>
    </div>
  </div>
</div>; */
}
function createActorCard(name, popularity, posterUrl) {
  let actorCard = document.createElement("div");
  actorCard.classList.add("actor-card");
  cardsParent.appendChild(actorCard);

  let actorCardContent = document.createElement("div");
  actorCardContent.classList.add("actor-card-content");
  actorCard.appendChild(actorCardContent);

  let actorCardFront = document.createElement("div");
  actorCardFront.classList.add("actor-card-front");
  actorCardContent.appendChild(actorCardFront);

  let actorImage = document.createElement("div");
  actorImage.classList.add("actor-image");
  actorCardFront.appendChild(actorImage);
  let finalUrl = "https://image.tmdb.org/t/p/original/" + posterUrl;
  actorImage.style.backgroundImage = "url('" + finalUrl + "')";

  let cardText = document.createElement("div");
  cardText.classList.add("card-text");
  actorCardFront.appendChild(cardText);

  let actorName = document.createElement("div");
  actorName.id = "actor-name";
  actorName.textContent = name;

  let actorPopularity = document.createElement("div");
  actorPopularity.id = "actor-popularity";
  actorPopularity.textContent = popularity;

  cardText.appendChild(actorName);
  cardText.appendChild(actorPopularity);
}
