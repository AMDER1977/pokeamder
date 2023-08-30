const { Pokemon, Type } = require("../db");

const dbInfoById = async (id) => {
  try {
    return await Pokemon.findByPk(id, {
      include: {
        model: Type,
      },
    });
  } catch (e) {
    console.error(e, "Error in call to db by id");
  }
};

module.exports = { dbInfoById };
