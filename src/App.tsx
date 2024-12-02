import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AllRecipesPage from './pages/AllRecipes';
import SelectedRecipesPage from './pages/SelectedRecipes';
import SingleRecipePage from './pages/SingleRecipe';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav>
          <Link to="/">All Recipes</Link>
          <Link to="/selected">Selected Recipes</Link>
        </nav>
        <Routes>
          <Route path="/" element={<AllRecipesPage />} />
          <Route path="/recipe/:id" element={<SingleRecipePage />} />
          <Route path="/selected" element={<SelectedRecipesPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;