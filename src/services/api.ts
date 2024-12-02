// import axios from "axios";

// const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// export const fetchMealCategories = async () => {
//   const response = await axios.get(`${API_BASE_URL}/categories.php`);
//   return response.data.categories;
// };

// export const fetchMealsByCategory = async (category: string) => {
//   const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
//   return response.data.meals;
// };

// export const fetchMealById = async (id: string) => {
//   const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
//   return response.data.meals[0];
// };


import axios from "axios";

// Базовий URL API
const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Отримати всі рецепти, починаючи з літери "a"
export const fetchAllRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}/search.php?f=a`);
  return response.data.meals || [];
};

// Отримати рецепт за ID
export const fetchRecipeById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};

// Отримати всі категорії
export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories.php`);
  return response.data.categories || [];
};

// Отримати рецепти за категорією
export const fetchRecipesByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.data.meals || [];
};
