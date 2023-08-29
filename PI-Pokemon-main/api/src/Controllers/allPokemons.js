const { pokeapi } = require("./pokemonsByapi");
const { dataBasePokemons } = require("./pokemonsByDB");

const allPokemon = async () => {
  try {
    const pokemonApi = await pokeapi();
    // console.log(pokemonApi);
    const pokemonDb = await dataBasePokemons();
    const dbApipoke = pokemonDb ? [...pokemonApi, ...pokemonDb] : pokemonApi;
    //const dbApipoke = pokemonDb ? [...pokemonApi, ...pokemonDb] : pokeapi;

    return dbApipoke;
  } catch (error) {
    console.log({ error: "Error in allPokemon", details: error });
  }
};

module.exports = { allPokemon };
