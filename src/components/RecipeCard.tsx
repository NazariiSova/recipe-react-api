import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ idMeal, strMeal, strCategory, strArea, strMealThumb }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (recipe: RecipeCardProps) => {
      const previousSelectedRecipes = queryClient.getQueryData<RecipeCardProps[]>(["selectedRecipes"]) || [];
      queryClient.setQueryData(["selectedRecipes"], [...previousSelectedRecipes, recipe]);
    },
  });

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    mutation.mutate({
      idMeal,
      strMeal,
      strCategory,
      strArea,
      strMealThumb,
    });
  };

  const handleViewRecipe = () => {
    navigate(`/recipe/${idMeal}`);
  };

  return (
    <div className="recipe-card" onClick={handleViewRecipe} style={{ cursor: "pointer" }}>
      <img src={strMealThumb} alt={strMeal} />
      <h2>{strMeal}</h2>
      <p>
        <strong>Category:</strong> {strCategory}
      </p>
      <p>
        <strong>Area:</strong> {strArea}
      </p>
      <button onClick={handleSelect} onMouseDown={(e) => e.stopPropagation()}>
        Select Recipe
      </button>
    </div>
  );
};

export default RecipeCard;
