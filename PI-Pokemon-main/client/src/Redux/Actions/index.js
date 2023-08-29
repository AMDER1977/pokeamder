import axios from "axios";

//obtener todos los pokemones del servidor, llama a la api y almacena en el edo globlal
export const getPokemon = () => {
  return async function (dispatch) {
    const pokemon = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMON",
      payload: pokemon.data,
    });
  };
};

//detalles de pokemons segun el id
export function getPokemonDetail(id) {
  return async function (dispatch) {
    try {
      const pokemonDetail = await axios.get(
        `http://localhost:3001/pokemons/${id}`
      );
      return dispatch({
        type: "GET_POKEMON_DETAIL",
        payload: pokemonDetail.data,
      });
    } catch (e) {
      console.log(e, "Error al traer el detalle del Pokemon del back");
    }
  };
}

//obtener por nombre
export const getByName = (name) => {
  return async function (dispatch) {
    try {
      const getDetails = await axios.get(
        `http://localhost:3001/pokemons/?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: getDetails.data,
      });
    } catch (error) {
      alert("Pokemon not found");
    }
  };
};

//crea nuevo POST, actualiza el edo global
export const createPokemon = (pokemon) => {
  return async function (dispatch) {
    let payload = await axios.post("http://localhost:3001/pokemons", pokemon);

    return dispatch({
      type: "POKE_POST",
      payload,
    });
  };
};

//obtiene los tipos disponibles
export const getTypes = () => {
  return async function (dispatch) {
    try {
      const pokeTypes = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: "GET_TYPES",
        payload: pokeTypes.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
};
export const filterByCreate = (payload) => {
  return {
    type: "FILTER_BY_CREATE",
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
};

export const orderByAttack = (payload) => {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
};
export const filterByType = (payload) => {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
};
//borra detalles del edo globlal
export const clearDetail = () => {
  return {
    type: "CLEAR_DETAIL",
  };
};
export const clearHome = () => {
  return {
    type: "CLEAR_HOME",
  };
};
//se usa para reestablecer el edo globlal cuando es necesario
export const empty = () => {
  return {
    type: "EMPTY",
  };
};
