import React, { useState, useEffect } from 'react';
import AddRecipeForm from '../AddRecipeForm/AddRecipeForm';
import RecipesList from '../RecipesList/RecipesList';
import Header from '../Header/Header';
import './App.css';

// interface Ingredient {
//   amount: string;
//   measurement: string;
//   item: string;
// }

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

  /**
   * editRecipe - Logic to edit a recipe by ID.
   * @param {number} id - The ID of the recipe to edit.
   * @param {Recipe} updatedRecipe - The updated recipe object.
   * @returns {Promise<void>}
   */
  const editRecipe = async (id: number, updatedRecipe: Recipe): Promise<void> => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3000/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe),
      });
      if (response.ok) {
        setRecipes(recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe)));
      } else {
        console.error('Error editing recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing recipe:', error);
    }
  };

  /**
   * deleteRecipe - Deletes a recipe by ID and removes it from the JSON file.
   * @param {number} id - The ID of the recipe to delete.
   */
  const deleteRecipe = async (id: number) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3000/recipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      } else {
        console.error('Error deleting recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <AddRecipeForm addRecipe={addRecipe} />
        <RecipesList recipes={recipes} onEdit={editRecipe} onDelete={deleteRecipe} />
        </div>
    </div>
  );
};

export default App;