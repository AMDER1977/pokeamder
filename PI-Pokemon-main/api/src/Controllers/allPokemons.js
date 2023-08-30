const { pokeapi } = require("./pokemonsByapi");
const { dataBasePokemons } = require("./pokemonsByDB");

const allPokemon = async () => {
  try {
    const pokemonApi = await pokeapi(); //obtener los datos de la api
    // console.log(pokemonApi);
    const pokemonDb = await dataBasePokemons(); //obtiene datos de la DB
    const dbApipoke = pokemonDb ? [...pokemonApi, ...pokemonDb] : pokemonApi;

    return dbApipoke;
  } catch (error) {
    console.error({ error: "Error in allPokemon", details: error });
  }
};

module.exports = { allPokemon };
