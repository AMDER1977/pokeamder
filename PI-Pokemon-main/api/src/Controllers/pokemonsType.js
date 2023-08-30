// const { Type } = require("../db.js");
// const axios = require("axios");

const { Type } = require("../db.js");
const axios = require("axios");

const allTypes = async () => {
  try {
    const getTypes = await axios.get("https://pokeapi.co/api/v2/type");
    const pokeType = getTypes.data.results.map((type) => {
      return {
        name: type.name,
      };
    });

    const createPromises = pokeType.map(async (el) => {
      try {
        await Type.findOrCreate({
          where: {
            name: el.name,
          },
        });
      } catch (error) {
        console.error(`Error creating type: ${el.name}`, error);
      }
    });

    await Promise.all(createPromises);

    return { message: "Types created or already exist in the database." };
  } catch (error) {
    console.error({ error: "No types available on Data Base" });
  }
};

module.exports = { allTypes };
// const allTypes = async () => {
//   try {
//     const getTypes = await axios.get("https://pokeapi.co/api/v2/type");
//     const pokeType = getTypes.data.results.map((type) => {
//       return {
//         name: type.name,
//       };
//     });

//     const dtbase = pokeType.forEach((el) => {
//       Type.findOrCreate({
//         where: {
//           name: el.name,
//         },
//       });
//     });
//     return dtbase;
//   } catch (error) {
//     console.log({ error: "No types available on Data Base" });
//   }
// };
