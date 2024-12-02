import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../types/Recipe";

// Функція для отримання обраних рецептів
const fetchSelectedRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch("/api/selectedRecipes");
  if (!response.ok) {
    throw new Error("Failed to fetch selected recipes");
  }
  return response.json();
};

const SelectedRecipesPage: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Recipe[], Error>({
    queryKey: ["selectedRecipes"],
    queryFn: fetchSelectedRecipes,
    initialData: [],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load selected recipes</p>;

  const combinedIngredients = (data ?? []).reduce<Record<string, string>>((acc, recipe) => {
    Array.from({ length: 20 }).forEach((_, i) => {
      const ingredient = recipe[`strIngredient${i + 1}` as keyof Recipe] as string | null;
      const measure = recipe[`strMeasure${i + 1}` as keyof Recipe] as string | null;
      if (ingredient) acc[ingredient] = measure || "";
    });
    return acc;
  }, {});

  return (
    <div>
      <h1>Selected Recipes</h1>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.idMeal}>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </li>
        ))}
      </ul>
      <h2>Combined Ingredients:</h2>
      <ul>
        {Object.entries(combinedIngredients).map(([ingredient, measure]) => (
          <li key={ingredient}>
            {ingredient} - {measure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedRecipesPage;
