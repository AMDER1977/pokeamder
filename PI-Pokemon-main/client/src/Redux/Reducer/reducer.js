let initialState = {
  allPokemons: [],
  pokemons: [],
  pokeFilter: [],
  pokeDetail: {},
  pokeTypes: [],
  error: false,
};

//func reductora toma edo act y una accion y devuelve nuevo edo
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload,
      };

    case "GET_POKEMON_DETAIL":
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case "CLEAR_DETAIL":
      return {
        ...state,
        pokeDetail: {},
      };
    case "GET_TYPES":
      return {
        ...state,
        pokeTypes: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "FILTER_BY_TYPE":
      if (action.payload === "all") {
        return { ...state, pokemons: state.allPokemons };
      }

      const typeSelected = state.allPokemons?.filter((el) => {
        if (!el.createdInDb) {
          return el.types.includes(action.payload);
        } else {
          return el.pokeTypes?.some((t) => t.name === action.payload);
        }
      });

      return {
        ...state,
        pokemons: typeSelected,
      };

    case "ORDER_BY_NAME":
      const isDescending = action.payload === "des"; // se usa para ordenar de forma descendente
      const pokeCopy = [...state.pokemons]; // se clona antes el arreglo original

      pokeCopy.sort((a, b) => {
        //se usa el metodo sort para modificarlo
        return isDescending
          ? b.name.localeCompare(a.name) // metodo para comparar las cadenas de nombres y saber si va antes o despues
          : a.name.localeCompare(b.name);
      });

      if (state.pokeFilter.length > 0) {
        return { ...state, pokeFilter: pokeCopy };
      }

      return {
        ...state,
        pokemons: pokeCopy,
      };

    case "ORDER_BY_ATTACK":
      if (action.payload === "asc") {
        let poke = state.pokemons?.slice();
        let ords = poke.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1;
          }
          if (b.attack > a.attack) {
            return -1;
          }
          return 0;
        });

        if (state.pokeFilter.length > 0) {
          return { ...state, pokeFilter: ords };
        }
        return {
          ...state,
          pokemons: ords,
        };
      }

      if (action.payload === "des") {
        let poke = state.pokemons?.slice();
        let ords = poke.sort(function (a, b) {
          if (b.attack > a.attack) {
            return 1;
          }
          if (a.attack > b.attack) {
            return -1;
          }
          return 0;
        });

        if (state.pokeFilter.length > 0) {
          return { ...state, pokeFilter: ords };
        }
        return {
          ...state,
          pokemons: ords,
        };
      }
      break;

    case "FILTER_BY_CREATE":
      if (action.payload === "all") {
        return {
          ...state,
          pokemons: state.allPokemons,
        };
      }

      if (action.payload === "created") {
        const createdPokes = state.allPokemons?.filter(
          (poke) => typeof poke.id === "string"
        );
        // console.log(createdPokes);
        return {
          ...state,
          pokemons: createdPokes,
        };
      }
      if (action.payload === "api") {
        const apiPokes = state.allPokemons?.filter(
          (poke) => typeof poke.id === "number"
        );
        return {
          ...state,
          pokemons: apiPokes,
        };
      }
      break;

    case "CLEAR_HOME":
      return {
        ...state,
        pokemons: state.allPokemons,
        pokeFilters: [],
      };

    case "EMPTY":
      return {
        ...state,
        allPokemons: [],
        pokeFilter: [],
        pokeDetail: {},
        error: false,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
