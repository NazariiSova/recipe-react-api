import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchRecipeDetails } from "../services/api";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

const SelectedRecipesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const selectedRecipes = queryClient.getQueryData<Recipe[]>(["selectedRecipes"]) || [];
  const [detailedRecipes, setDetailedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadRecipeDetails = async () => {
      const detailedData = await Promise.all(
        selectedRecipes.map((recipe) => fetchRecipeDetails(recipe.idMeal))
      );
      setDetailedRecipes(detailedData.filter((recipe) => recipe !== null) as Recipe[]);
    };

    loadRecipeDetails();
  }, [selectedRecipes]);

  const combinedIngredients = detailedRecipes.reduce<Record<string, number>>((acc, recipe) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
      const measure = recipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && ingredient.trim() !== "") {
        const amount = measure ? parseFloat(measure.split(" ")[0]) || 1 : 1;
        acc[ingredient] = (acc[ingredient] || 0) + amount;
      }
    }
    return acc;
  }, {});

  return (
    <div>
      <h1>Selected Recipes</h1>
      {detailedRecipes.length === 0 && <p>Loading recipe details...</p>}
      <ul>
        {detailedRecipes.map((recipe) => (
          <li key={recipe.idMeal}>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>{recipe.strInstructions}</p>
          </li>
        ))}
      </ul>
      <h2>Combined Ingredients:</h2>
      {Object.keys(combinedIngredients).length === 0 && <p>No ingredients to display.</p>}
      <ul>
        {Object.entries(combinedIngredients).map(([ingredient, total]) => (
          <li key={ingredient}>
            {ingredient} - {total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedRecipesPage;
