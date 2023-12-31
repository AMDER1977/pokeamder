import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypes, empty } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate";
import "./Form.css";

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.pokeTypes);
  const pokemon = useSelector((state) => state.allPokemon);
  const history = useHistory();

  const [error, setError] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input, //actualiza estado input(cambios en el formulario)
      [e.target.name]: e.target.value,
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }, pokemon));
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      //maneja la seleccion y deseleccion de tipos
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      setError(
        validate({ ...input, types: [...input.types, e.target.value] }, pokemon)
      );
    } else {
      setInput({
        ...input,
        types: input.types.filter((c) => c !== e.target.value),
      });
      setError(
        validate(
          {
            ...input,
            types: input.types.filter((c) => c !== e.target.value),
          },
          pokemon
        )
      );
    }
  };

  const handleSubmit = (e) => {
    //maneja envio del formulario, despacha la accion
    e.preventDefault();
    dispatch(
      createPokemon({
        name: input.name,
        hp: Number(input.hp),
        attack: Number(input.attack),
        defense: Number(input.defense),
        speed: Number(input.speed),
        height: Number(input.height),
        weight: Number(input.weight),
        image: input.image,
        types: input.types.map((type) => {
          const foundType = types.find((t) => t.name === type);
          return foundType.id;
        }),
      })
    );
    alert("Pokemon registrado con exito");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });
    dispatch(empty());
    history.push("/home"); //aca se usa el useHistory para guardar el registro de la ruta
  };

  useEffect(() => {
    dispatch(getTypes()); //aqui obtiene los tipos de pokemon al cargar el componente
  }, [dispatch]);

  return (
    //renderizado del form
    <div className="containerForm">
      <Link to={"/home"}>
        <button className="homeButton">Back Home</button>
      </Link>
      <div className="createPokemonContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form">
            <div className="inputsAndTypes">
              <div className="inputs">
                <div>
                  <label className="formLabel">Name:</label>
                  <input
                    autoComplete="off"
                    type="text"
                    value={input.name}
                    name="name"
                    placeholder="Name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Hp:</label>
                  <input
                    type="number"
                    value={input.hp}
                    name="hp"
                    placeholder="1-255"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Attack:</label>
                  <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    placeholder="1-190"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Defense:</label>
                  <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    placeholder="1-250"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Speed:</label>
                  <input
                    type="number"
                    value={input.speed}
                    name="speed"
                    placeholder="1-200"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Height:</label>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    placeholder="1-200"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Weight:</label>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    placeholder="1-1000"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="formLabel">Image:</label>
                  <input
                    type="text"
                    value={input.image}
                    name="img"
                    placeholder="URL de la imagen"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="types">
                <h3 className="typesTittle">Types:</h3>
                <div className="typesCreate">
                  {types?.map((type) => (
                    <div className="typeCreate" key={type.id}>
                      <label>{type.name}</label>
                      <input
                        type={"checkbox"}
                        value={type.name}
                        name={type.name}
                        onChange={(e) => handleCheck(e)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="errors">
              {error.name && <p className="pStyled">{error.name}</p>}
              {error.hp && <p className="pStyled">{error.hp}</p>}
              {error.atk && <p className="pStyled">{error.attack}</p>}
              {error.def && <p className="pStyled">{error.defense}</p>}
              {error.speed && <p className="pStyled">{error.speed}</p>}
              {error.height && <p className="pStyled">{error.height}</p>}
              {error.weight && <p className="pStyled">{error.weight}</p>}
              {error.types && <p className="pStyled">{error.types}</p>}
            </div>
            <div>
              <button
                className="homeButton"
                type="submit"
                disabled={
                  error.name ||
                  error.hp ||
                  error.attack ||
                  error.defense ||
                  error.speed ||
                  error.height ||
                  error.weight ||
                  error.types
                } //si hay errores en algun campo se desactiva el boton de envio
              >
                Create new Pokemon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePokemon;
