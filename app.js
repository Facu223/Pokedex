const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const pokemonContainer = document.querySelector(".pokemon-container");

let offset = 1;
let limit = 5;

previous.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 6;
    removeChildNodes(pokemonContainer)
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 6;
  removeChildNodes(pokemonContainer)
  fetchPokemons(offset, limit);
});

const fetchPokemon = (id) => {
   fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((res) => {
        createPokemon(res);
      spinner.style.display = "none";
    });
};

const fetchPokemons = (offset, limit) => {
  for (let i = offset; i <= offset + limit; i++) {
    spinner.style.display = "block";
    fetchPokemon(i);
  }
};

const createPokemon = (pokemon) => {
  
  const card = document.createElement("DIV");
  card.classList.add("pokemon-card");
  const spriteContainer = document.createElement("DIV");
  spriteContainer.classList.add("img-container");
  const sprite = document.createElement("IMG");
  sprite.src = pokemon.sprites.front_default;

  spriteContainer.appendChild(sprite);

  const number = document.createElement("P");
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const name = document.createElement("P");
  name.classList.add("name");
  name.textContent = pokemon.name;

  card.appendChild(spriteContainer);
  card.appendChild(number);
  card.appendChild(name);
  pokemonContainer.appendChild(card);
};

const removeChildNodes = (parent) => {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}


fetchPokemons(offset, limit);
