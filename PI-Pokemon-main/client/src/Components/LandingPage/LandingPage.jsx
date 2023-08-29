import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="tittle">
        <img
          src="https://fontmeme.com/permalink/230829/33ff9536e638aae79d39dc756f83e4e7.png"
          alt="Atrapalos ya!"
        />
      </div>
      <div>
        <button className="buttonImage">
          <Link to="/home">START</Link>
        </button>
      </div>
      <img
        src="https://fontmeme.com/permalink/230829/a26dfb4f39ecf7e06a2ed4cb12240bee.png"
        alt="Pokedex"
        className="createdBy"
      />
    </div>
  );
};

export default LandingPage;
