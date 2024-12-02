import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRecipes } from "../services/api";
import { Recipe } from "../types/Recipe";

const AllRecipesPage: React.FC = () => {
  const { data: recipes, isLoading, isError } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong...</p>;

  return (
    <div className="recipes-grid">
      {recipes?.map((recipe) => (
        <div key={recipe.idMeal}>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        </div>
      ))}
    </div>
  );
};

export default AllRecipesPage;
