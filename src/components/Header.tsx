import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  return (
    <header
      style={{
        padding: "16px",
        background: "#f8f9fa",
        borderBottom: "1px solid #ddd",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/" style={{ marginRight: "16px" }}>
            All Recipes
          </Link>
          <Link to="/selected">Selected Recipes</Link>
          <Link to="/recipe/demo-id">Single Recipe</Link> 

        </div>
        <SearchBar />
      </nav>
    </header>
  );
};

export default Header;
