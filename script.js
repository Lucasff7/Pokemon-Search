const pokemonId = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-img');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const pokemonSearch = async () => {
  const pokemonIdOrName = searchInput.value.trim().toLowerCase();
  if (!pokemonIdOrName) return;

  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIdOrName}`);
    if (!response.ok) throw new Error("Pokémon not found");

    const data = await response.json();
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = data.weight;
    height.textContent = data.height;

    const img = document.createElement('img');
    img.id = 'sprite';
    img.src = data.sprites.front_default;
    img.alt = `${data.name} front default sprite`;
    pokemonImage.innerHTML = '';
    pokemonImage.appendChild(img);

    types.innerHTML = '';
    data.types.forEach(t => {
      const span = document.createElement('span');
      span.textContent = t.type.name.toUpperCase();
      types.appendChild(span);
    });

    data.stats.forEach(stat => {
      const statId = stat.stat.name.replace('special-', 'special-')
      const statElement = document.getElementById(statId.replace('-', '-'));
      if (statElement) statElement.textContent = stat.base_stat;
    });

  } catch (err) {
    resetAll();
    alert("Pokémon not found");
  }
};

const resetAll = () => {
  const sprite = document.getElementById('sprite');
  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonId.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  pokemonSearch();
});
