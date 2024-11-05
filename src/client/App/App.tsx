import React, { useState, useEffect } from 'react';
import AddRecipeForm from '../AddRecipeForm/AddRecipeForm';
import RecipesList from '../RecipesList/RecipesList';
import Header from '../Header/Header';
import './App.css';

// Interface representing a single ingredient
interface Ingredient {
  amount: string;
  measurement: string;
  item: string;
}

// Interface representing a single recipe
interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [randomRecipeId, setRandomRecipeId] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    /**
     * fetchRecipes - Fetches recipes from the server.
     * @returns {Promise<void>}
     */
    const fetchRecipes = async (): Promise<void> => {
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

  /**
   * addRecipe - Adds a new recipe to the list.
   * @param {Recipe} newRecipe - The new recipe to add.
   */
  const addRecipe = (newRecipe: Recipe): void => {
    setRecipes([...recipes, newRecipe]);
  };

  /**
   * editRecipe - Edits a recipe by ID.
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
      }
    } catch (error) {
      console.error('Error editing recipe:', error);
    }
  };

  /**
   * deleteRecipe - Deletes a recipe by ID.
   * @param {number} id - The ID of the recipe to delete.
   * @returns {Promise<void>}
   */
  const deleteRecipe = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3000/recipes/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe.id !== id));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  /**
   * filterRecipes - Filters recipes based on the search term.
   * @param {string} term - The search term to filter recipes.
   * @returns {Recipe[]} - The filtered recipes.
   */
  const filterRecipes = (term: string): Recipe[] => {
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(term.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.item.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const filteredRecipes = filterRecipes(searchTerm);

  /**
   * selectRandomRecipe - Selects a random recipe from the filtered recipes and sets it as the random recipe.
   */
  const selectRandomRecipe = (): void => {
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    setRandomRecipeId(filteredRecipes[randomIndex].id);
  };

  /**
   * clearRandomRecipe - Clears the selected random recipe.
   */
  const clearRandomRecipe = (): void => {
    setRandomRecipeId(null);
  };

  return (
    <div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container">
        <div className="button-row">
          <button onClick={selectRandomRecipe} className="btn btn-random">Random Recipe</button>
          <button onClick={() => setIsFormVisible(!isFormVisible)} className="btn btn-add">
            {isFormVisible ? 'Hide Form' : 'Add Recipe'}
          </button>
          {randomRecipeId !== null && (
            <button onClick={clearRandomRecipe} className="btn btn-clear">Clear Random Recipe</button>
          )}
        </div>
        {isFormVisible && <AddRecipeForm addRecipe={addRecipe} />}
        <RecipesList recipes={filteredRecipes} onEdit={editRecipe} onDelete={deleteRecipe} randomRecipeId={randomRecipeId} />
      </div>
    </div>
  );
};

export default App;