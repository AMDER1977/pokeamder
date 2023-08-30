const axios = require("axios");

const pokeapi = async () => {
  try {
    const pokemons = await axios.get(
      // llamada por axios a la api
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
    );
    const pokeUrlName = pokemons.data.results; // Extrae la lista de nombres  de la respuesta de los pokemons
    const pokeComplete = await axios.all(
      //axios.all hace múltiples solicitudes en paralelo a las URL y obtiene información detallada de cada uno
      pokeUrlName.map(async (pokeInd) => {
        let infoPush = await axios.get(pokeInd.url); // hace una solicitud http || Get a la url especifica para info detallada
        return {
          id: infoPush.data.id,
          name: infoPush.data.name,
          hp: infoPush.data.stats[0].base_stat,
          attack: infoPush.data.stats[1].base_stat,
          defense: infoPush.data.stats[2].base_stat,
          speed: infoPush.data.stats[5].base_stat,
          height: infoPush.data.height,
          weight: infoPush.data.weight,
          image: infoPush.data.sprites.other.dream_world.front_default,
          types: infoPush.data.types.map((type) => type.type.name),
        };
      })
    );
    return pokeComplete;
  } catch (error) {
    console.error("Error al traer los pokemones desde los controllers");
  }
};

// const prueba = async ()=>{
//     let pokemon = await pokeapi()
//     console.log(pokemon);
// }
// prueba()
module.exports = { pokeapi };
