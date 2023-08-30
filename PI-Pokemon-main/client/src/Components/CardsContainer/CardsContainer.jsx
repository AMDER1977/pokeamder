import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Card";
import { getPokemon } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import Filter from "../Filter/filter";
import "./CardsContainer.css";

function CardsContainer() {
  // Se obtienen los datos del estado "pokemons" desde Redux
  const pokemons = useSelector((state) => state.pokemons); //trae los datos del pokemon desde el edo globlal redux
  const dispatch = useDispatch();
  useEffect(() => {
    // disparar la accion para obtener pokemons al montar el componente
    dispatch(getPokemon());
  }, [dispatch]);
  const [currentPage, setCurrentPage] = useState(0); //edo para control pag actual
  const cardsPerPage = 12;

  const pageCount = Math.ceil(pokemons?.length / cardsPerPage); //calc num de pags de acuerd a los pokemones
  //obtenemos los pokemons a mostrar
  const paginatedCards = pokemons?.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
  const handleNextClick = () => {
    //boton sig cambio de pag
    if (currentPage < pageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    //boton prev
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        {/* <div className='navBarContainer' ></div> */}
        <div className="navBar">
          <Link to={"/create"}>
            {/*enlace para crear*/}{" "}
            <button className="createPokemon">CREATE NEW POKEMON</button>
          </Link>
          <Filter setCurrentPage={setCurrentPage} className="filter" />
          {/*el componente filtro*/}
          <SearchBar setCurrentPage={setCurrentPage} />
        </div>

        {paginatedCards.length ? (
          <div className="container">
            {/*mapeo y muestra de tarj*/}
            {paginatedCards.map((pokemon) => {
              return (
                <div className="pokemonsCards" key={pokemon.id}>
                  <Link to={`/detail/${pokemon.id}`} className="link">
                    {/*enlace a detalles*/}
                    {/*tarjeta pokemon*/}
                    <Cards
                      className="card"
                      name={pokemon.name}
                      key={pokemon.id}
                      id={pokemon.id}
                      image={pokemon.image}
                      types={pokemon.types}
                    />
                  </Link>
                </div>
              );
            })}{" "}
          </div>
        ) : (
          <div className="loadingContainer">
            {/*indicador de carga*/} <Loading className="loading" />{" "}
          </div>
        )}
      </div>
      {/*botones de navegacion*/}
      <div className="handlePageContainer">
        <button
          disabled={currentPage === 0}
          onClick={handlePrevClick}
          className="handlePageButton"
        >
          {"<"}
        </button>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            className="handlePageButton"
            key={index}
            disabled={currentPage === index}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === pageCount - 1}
          onClick={handleNextClick}
          className="handlePageButton"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default CardsContainer;
/*jsx
{paginatedCards.map((pokemon) => {
  return (
    <div className="pokemonsCards" key={pokemon.id}>
      <Link to={`/detail/${pokemon.id}`} className="link">
        <Cards
          className="card"
          name={pokemon.name}
          id={pokemon.id}
          image={pokemon.image}
          types={pokemon.types}
        />
      </Link>
    </div>
  );
})}*/
