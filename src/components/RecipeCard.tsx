import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Recipe } from "../types/Recipe";
import axios from "axios";

interface RecipeCardProps {
  id: string;
  name: string;
  category: string;
  area: string;
  image: string;
  isSelected?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  id, 
  name, 
  category, 
  area, 
  image,
  isSelected = false
}) => {
  const queryClient = useQueryClient();

  const selectRecipeMutation = useMutation({
    mutationFn: async (recipe: Recipe) => {
      try {
        await axios.post('/api/select-recipe', recipe);
        return recipe;
      } catch (error) {
        throw new Error('Failed to select recipe');
      }
    },
    onMutate: async (newRecipe) => {
      await queryClient.cancelQueries({ queryKey: ['selectedRecipes'] });
      
      const previousSelectedRecipes = queryClient.getQueryData(['selectedRecipes']) as Recipe[];
      
      queryClient.setQueryData(['selectedRecipes'], (oldRecipes: Recipe[] = []) => {
        const isAlreadySelected = oldRecipes.some(r => r.idMeal === newRecipe.idMeal);
        
        if (isAlreadySelected) {
          return oldRecipes.filter(r => r.idMeal !== newRecipe.idMeal);
        } else {
          return [...oldRecipes, { ...newRecipe, isSelected: true }];
        }
      });

      return { previousSelectedRecipes };
    },
    onError: (err, newRecipe, context) => {
      queryClient.setQueryData(['selectedRecipes'], (context as any)?.previousSelectedRecipes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['selectedRecipes'] });
    }
  });

  const handleSelectRecipe = () => {
    selectRecipeMutation.mutate({
      idMeal: id,
      strMeal: name,
      strCategory: category,
      strArea: area,
      strMealThumb: image,
      isSelected: true
    });
  };

  return (
    <div className={`recipe-card ${isSelected ? 'selected' : ''}`}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Area:</strong> {area}</p>
      <button 
        onClick={handleSelectRecipe}
        className={`select-button ${isSelected ? 'selected' : ''}`}
      >
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
};

export default RecipeCard;