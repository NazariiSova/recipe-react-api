import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllRecipes, filterByCategory } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";

import { Recipe } from "../types/Recipe";

const AllRecipesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const { data: recipes, isLoading, isError } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes,
  });

  useEffect(() => {
    const fetchFilteredRecipes = async () => {
      if (selectedCategory) {
        const filtered = await filterByCategory(selectedCategory);
        setFilteredRecipes(filtered);
      } else {
        setFilteredRecipes(recipes || []);
      }
    };
    fetchFilteredRecipes();
  }, [selectedCategory, recipes]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch recipes. Please try again later.</p>;

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const displayedRecipes = filteredRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="recipes-grid">
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            id={recipe.idMeal}
            name={recipe.strMeal}
            category={recipe.strCategory || "Unknown"}
            area={recipe.strArea || "Unknown"}
            image={recipe.strMealThumb}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AllRecipesPage;
