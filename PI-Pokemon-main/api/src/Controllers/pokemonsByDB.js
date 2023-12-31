const { Pokemon, Type } = require("../db.js");

const dataBasePokemons = async () => {
  try {
    const pokesOnDB = await Pokemon.findAll({
      //consulta a DB incluyendo tipos
      include: Type,
    });

    return pokesOnDB.map((pokemon) => {
      //mapear los resultados en un nuevo arreglo
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map((type) => type.name),
        createdInDb: pokemon.createdInDb,
      };
    });
  } catch (error) {
    console.error("no pokemons availables on data base");
  }
};
module.exports = { dataBasePokemons };
