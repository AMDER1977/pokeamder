const { Router } = require("express");
const { allPokemon } = require("../Controllers/allPokemons");
const { newPokemon } = require("../Controllers/createPokemon");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const pokemonsList = await allPokemon();
    if (name) {
      // cuando se requiere por nombre
      const pokeSelect = await pokemonsList.filter(
        (poke) => poke.name === name.toLowerCase()
      );
      if (pokeSelect.length > 0) {
        res.status(200).json(pokeSelect);
      } else {
        res.status(404).send("Pokemon By Name Not found");
      }
    } else {
      res.json(pokemonsList);
    }
  } catch (error) {
    res.status(400).json({ error: "Error al traer los pokemons" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pokeList = await allPokemon();
    if (id) {
      const selectedPoke = await pokeList.filter((obj) => obj.id == id);
      if (selectedPoke.length > 0) {
        res.status(200).json(selectedPoke);
      } else {
        res
          .status(400)
          .send("The id entered does not correspond to an existing pokemon");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* EJEMPLO CREACION {
     "name": "pruebamon",
      "image": "URL_imagen",
      "hp": 25,
      "attack": 120,
      "defense":25 ,
      "speed": 120,
      "height": 80,
      "weight": 70,
      "types": 3
  }
*/

router.post("/", async (req, res) => {
  try {
    await newPokemon(req.body);
    res.json("You pokemon has be created successfully");
  } catch (e) {
    res.status(400).send(e.toString()), console.error(e, "Error on Controller");
  }
});
module.exports = router;
