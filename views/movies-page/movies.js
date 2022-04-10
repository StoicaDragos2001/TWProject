var container = document.getElementById("filters");
var filters = container.getElementsByClassName("genre");
for (var i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    this.classList.toggle("active-genre");
  });
}

{
  /* <div class="movie-card">
            <div class="movie-card-content">
              <div class="movie-card-front">
                <div class="card-text">
                  <div class="card-text-content">
                    <div id="name">Moonight</div>
                    <div id="rating">7.2</div>
                  </div>
                </div>
              </div>
              <div class="movie-card-back">
                <div class="back-text">
                  <div id="back-title">Overview:</div>
                  <div id="overview">
                    The Last Jedi follows Rey as she seeks the aid of Luke
                    Skywalker, in hopes of turning the tide for the Resistance
                    in the fight against Kylo Ren and the First Order, while
                    General Leia Organa, Finn, and Poe Dameron attempt to escape
                    a First Order attack on the dwindling Resistance fleet.
                  </div>
                </div>
              </div>
            </div>
          </div> */
}
