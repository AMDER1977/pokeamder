import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCreate,
  orderByAttack,
  orderByName,
  filterByType,
  clearHome,
} from "../../Redux/Actions";
import "./Filter.css";

function Filter({ setCurrentPage }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const types = useSelector((state) => state.types);

  const clearFilters = () => {
    //*borra todos los filtros y reinicia la pagina
    dispatch(clearHome());
    setCurrentPage(0);
  };

  //*maneja cambios en las opciones de filtrado
  const handleType = (event) => {
    const selectedType = event.target.value;
    dispatch(filterByType(selectedType));
    setCurrentPage(0);
  };

  const handleName = (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(0);
  };

  const handleAttack = (event) => {
    dispatch(orderByAttack(event.target.value));
    setCurrentPage(0);
  };
  const handleCreated = (event) => {
    dispatch(filterByCreate(event.target.value));
    setCurrentPage(0);
  };

  return (
    <div>
      <button onClick={clearFilters} className="filterButton">
        Clear Filters
      </button>

      {/*Filtro por ataque*/}
      <select onChange={handleAttack} className="filterButton">
        <option disabled defaultValue="">
          Order Pokemons Attack
        </option>
        <option value="asc">Ascendent-Attack</option>
        <option value="des">Descendent-Attack</option>
      </select>

      {/*Filtro por nombre*/}
      <select onChange={handleName} className="filterButton">
        <option disabled defaultValue="">
          Order by Name
        </option>
        <option value="asc">A-Z</option>
        <option value="des">Z-A</option>
      </select>

      <select onChange={handleCreated} className="filterButton">
        <option value="all">All Pokemons</option>
        <option value="api">Existing Pokemons</option>
        <option value="created">Created Pokemons</option>
      </select>

      {/*Filtro por tipo*/}
      <select onChange={handleType} className="filterButton">
        <option value="all">Select one Poke-Type </option>
        <option value="normal">Normal</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="bug">Bug</option>
        <option value="fire">Fire</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="water">Water</option>
        <option value="fairy">Fairy</option>
      </select>
    </div>
  );
}

export default Filter;
