import React, { useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { fetchAllRecipes } from "../services/api";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const recipes = await fetchAllRecipes();
      const filteredRecipes = recipes.filter((recipe: any) =>
        recipe.strMeal.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setSearchResults([]);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleResultClick = (id: string) => {
    setSearchQuery("");
    setSearchResults([]);

    navigate(`/recipe/${id}`);
  };

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for recipes..."
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {searchResults.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginTop: "8px",
            zIndex: 1000,
            listStyleType: "none",
            padding: 0,
          }}
        >
          {searchResults.map((result) => (
            <li
              key={result.idMeal}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleResultClick(result.idMeal)}
            >
              {result.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
