import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../services/api";
import { Recipe } from "../types/Recipe";

const SingleRecipe = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: recipe, isLoading, isError } = useQuery<Recipe | null>({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load the recipe</p>;
  if (!recipe) return <p>Recipe not found</p>;

  const ingredients = Array.from({ length: 20 })
    .map((_, i) => {
      const ingredient = recipe[`strIngredient${i + 1}` as keyof Recipe] as string | null;
      const measure = recipe[`strMeasure${i + 1}` as keyof Recipe] as string | null;
      return ingredient ? `${ingredient} - ${measure || ''}`.trim() : null;
    })
    .filter(Boolean);

  return (
    <div className="single-recipe-container">
      <h1>{recipe.strMeal}</h1>
      <div className="recipe-image-container">
        <img 
          src={recipe.strMealThumb} 
          alt={recipe.strMeal} 
          className="recipe-image"
        />
      </div>
      <div className="recipe-details">
        <p><strong>Category:</strong> {recipe.strCategory}</p>
        <p><strong>Area:</strong> {recipe.strArea}</p>
        
        <h2>Ingredients:</h2>
        <ul className="ingredients-list">
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        
        <h2>Instructions:</h2>
        <p className="instructions">{recipe.strInstructions}</p>
        
        {recipe.strYoutube && (
          <div className="youtube-link">
            <h3>Video:</h3>
            <a 
              href={recipe.strYoutube || undefined} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRecipe;