import React, { useState, useEffect } from "react";
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
  const pokemons = useSelector((state) => state.pokemons);

  const clearFilters = () => {
    //*borra todos los filtros
    dispatch(clearHome());
    setCurrentPage(0);
  };

  //*manejador de cambios en las opciones de filtrado
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
          Order Pokemons
        </option>
        <option value="asc">Ascendente</option>
        <option value="des">Descendente</option>
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
        <option value="fighting">Fighting</option>
        <option value="flying">Flying</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="fire">Fire</option>
        <option value="grass">Grass</option>
        <option value="electric">Electric</option>
        <option value="water">Water</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknow">Unknow</option>
        <option value="shadow">Shadow</option>
      </select>
    </div>
  );
}

export default Filter;
