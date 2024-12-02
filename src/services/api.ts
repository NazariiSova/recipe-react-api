import axios from "axios"; 

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchAllRecipes = async () => {
  const response = await axios.get(`${API_BASE_URL}/search.php?f=a`);
  return response.data.meals || [];
};

export const fetchRecipeById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals?.[0] || null;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories.php`);
  return response.data.categories || [];
};

export const fetchRecipesByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.data.meals || [];
};

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/list.php?c=list`);
  return response.data.meals || []; 
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