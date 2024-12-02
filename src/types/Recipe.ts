export interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
    strInstructions?: string; 
    strYoutube?: string | null;
    isSelected?: boolean;
    [key: string]: string | null | boolean | undefined;
  }

  export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
  }
  
  export interface ListResponse<T> {
    meals: T[];
  }
  
