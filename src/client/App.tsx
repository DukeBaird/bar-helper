import React, { useState, useEffect } from 'react';
import AddRecipeForm from './AddRecipeForm';
import RecipesList from './RecipesList';

interface Recipe {
  id: number;
  name: string;
  ingredients: { amount: string; measurement: string; item: string }[];
  instructions: string;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://${window.location.hostname}:3000/recipes`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <div>
      <h1>Recipe App</h1>
      <AddRecipeForm addRecipe={addRecipe} />
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default App;