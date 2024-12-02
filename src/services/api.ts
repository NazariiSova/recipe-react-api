import axios from "axios";
import { Recipe } from "../types/Recipe";

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAllRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}/search.php?f=a`);
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};

export const fetchCategories = async (): Promise<{ strCategory: string }[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories.php`);
  return response.data.categories || [];
};

export const fetchRecipesByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.data.meals || [];
};

export const addRecipeToSelection = async (recipeId: string) => {
  await axios.post(`/api/selectedRecipes`, { id: recipeId });
};

export const fetchSelectedRecipes = async (): Promise<Recipe[]> => {
  const response = await axios.get("/api/selectedRecipes");
  return response.data;
};

export const fetchRecipeDetails = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};


export const filterByCategory = async (category: string) => {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();

  const detailedData = await Promise.all(
    data.meals.map(async (meal: any) => {
      const mealResponse = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const mealDetails = await mealResponse.json();
      return mealDetails.meals[0];
    })
  );

  return detailedData;
};
