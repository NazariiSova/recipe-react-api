import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchRecipeById } from "../services/api";

const SingleRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => fetchRecipeById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load recipe</p>;

  const ingredients = Array.from({ length: 20 }, (_, i) => ({
    ingredient: data[`strIngredient${i + 1}` as keyof typeof data],
    measure: data[`strMeasure${i + 1}` as keyof typeof data],
  })).filter(({ ingredient }) => ingredient); 

  return (
    <div>
      <h1>{data.strMeal}</h1>
      <img src={data.strMealThumb} alt={data.strMeal} />
      <p>
        <strong>Category:</strong> {data.strCategory}
      </p>
      <p>
        <strong>Country:</strong> {data.strArea}
      </p>
      <p>
        <strong>Instructions:</strong> {data.strInstructions}
      </p>
      {data.strYoutube && (
        <p>
          <strong>Video Tutorial:</strong>{" "}
          <a href={data.strYoutube} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </a>
        </p>
      )}
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li key={index}>
            {ingredient} - {measure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleRecipePage;
