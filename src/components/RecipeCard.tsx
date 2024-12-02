import React from "react";

interface RecipeCardProps {
  id: string;
  name: string;
  category: string;
  area: string;
  image: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, name, category, area, image }) => {
  return (
    <div className="recipe-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Area:</strong> {area}</p>
    </div>
  );
};

export default RecipeCard;
