import React, { useEffect, useState } from "react";
import { getCategories } from "../services/api";

interface Category {
  strCategory: string;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Фільтрація за категоріями</h1>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Виберіть категорію</option>
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
