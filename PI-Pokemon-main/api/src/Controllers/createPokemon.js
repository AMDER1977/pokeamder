const { Pokemon, Type } = require("../db");

const newPokemon = async (params) => {
  //requiere por params el objeto
  const createdPokemon = await Pokemon.create({
    // se crea un nuevo registro  en la DB
    name: params.name,
    hp: params.hp,
    attack: params.attack,
    defense: params.defense,
    speed: params.speed,
    height: params.height,
    weight: params.weight,
    img: params.img
      ? params.img // si tiene imagen se utiliza
      : "https://images3.alphacoders.com/677/677583.png", // si no imagen subida por defecto
  });

  createdPokemon.addType(params.types); // se le agrega uno o varios tipos al pokemon creado
};

module.exports = { newPokemon };
