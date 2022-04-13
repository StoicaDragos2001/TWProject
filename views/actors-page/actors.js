var cards_parent = document.getElementById("cards");
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
function createActorCard(name, popularity, poster_url) {
  var actor_card = document.createElement("div");
  actor_card.classList.add("actor-card");
  cards_parent.appendChild(actor_card);

  var actor_card_content = document.createElement("div");
  actor_card_content.classList.add("actor-card-content");
  actor_card.appendChild(actor_card_content);

  var actor_card_front = document.createElement("div");
  actor_card_front.classList.add("actor-card-front");
  actor_card_content.appendChild(actor_card_front);

  var actor_image = document.createElement("div");
  actor_image.classList.add("actor-image");
  actor_card_front.appendChild(actor_image);
  actor_image.style.backgroundImage = "url('" + poster_url + "')";

  var card_text = document.createElement("div");
  card_text.classList.add("card-text");
  actor_card_front.appendChild(card_text);

  var actor_name = document.createElement("div");
  actor_name.id = "actor-name";
  actor_name.textContent = name;

  var actor_popularity = document.createElement("div");
  actor_popularity.id = "actor-popularity";
  actor_popularity.textContent = popularity;

  card_text.appendChild(actor_name);
  card_text.appendChild(actor_popularity);
}

function loadCards() {
  var url = "https://image.tmdb.org/t/p/w500/kU3B75TyRiCgE270EyZnHjfivoq.jpg";
  for (let i = 0; i < 23; i++) {
    createActorCard("Brad Pitt", "POPULARITY: 10.673", url);
  }
}
