import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types/Recipe";
import axios from "axios";

const fetchSelectedRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get("/api/selectedRecipes");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch selected recipes");
  }
};

const SelectedRecipesPage: React.FC = () => {
  const { data: selectedRecipes, isLoading, isError } = useQuery<Recipe[], Error>({
    queryKey: ["selectedRecipes"],
    queryFn: fetchSelectedRecipes,
    initialData: [],
  });

  const combinedIngredients = React.useMemo(() => {
    const ingredientsMap: Record<string, string> = {};

    selectedRecipes.forEach((recipe) => {
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}` as keyof Recipe;
        const measureKey = `strMeasure${i}` as keyof Recipe;

        const ingredient = recipe[ingredientKey] as string;
        const measure = recipe[measureKey] as string;

        if (ingredient && ingredient.trim() !== '') {
          if (ingredientsMap[ingredient]) {
            ingredientsMap[ingredient] += `, ${measure || ''}`;
          } else {
            ingredientsMap[ingredient] = measure || '';
          }
        }
      }
    });

    return ingredientsMap;
  }, [selectedRecipes]);

  if (isLoading) return <p>Loading selected recipes...</p>;
  if (isError) return <p>Error loading selected recipes</p>;
  if (selectedRecipes.length === 0) return <p>No recipes selected</p>;

  return (
    <div className="selected-recipes-container">
      <h1>Selected Recipes</h1>
      
      <section className="selected-recipe-list">
        <h2>Recipes</h2>
        <div className="recipes-grid">
          {selectedRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="selected-recipe-item">
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="recipe-thumbnail"
              />
              <h3>{recipe.strMeal}</h3>
              <p>Category: {recipe.strCategory}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="combined-ingredients">
        <h2>Combined Ingredients</h2>
        <ul>
          {Object.entries(combinedIngredients).map(([ingredient, measure]) => (
            <li key={ingredient}>
              {ingredient} - {measure}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SelectedRecipesPage;