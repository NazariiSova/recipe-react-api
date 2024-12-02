import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../services/api";
import { Recipe } from "../types/Recipe";

const SingleRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, isError } = useQuery<Recipe | null>({
    queryKey: ["recipe", id],
    queryFn: () => (id ? fetchRecipeById(id) : Promise.reject("No ID")),
    enabled: Boolean(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !recipe) return <p>Error loading recipe.</p>;

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>
        <strong>Category:</strong> {recipe.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {recipe.strArea}
      </p>
      <p>
        <strong>Instructions:</strong> {recipe.strInstructions}
      </p>
    </div>
  );
};

export default SingleRecipe;
