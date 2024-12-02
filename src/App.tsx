import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipes";
import SelectedRecipesPage from "./pages/SelectedRecipes";
import SingleRecipePage from "./pages/SingleRecipe";
import Header from "./components/Header";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />  
        <Routes>
          <Route path="/" element={<AllRecipesPage />} />
          <Route path="/recipe/:id" element={<SingleRecipePage />} />
          <Route path="/selected" element={<SelectedRecipesPage />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;