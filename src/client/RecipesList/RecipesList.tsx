import React, { useState } from 'react';
import './RecipesList.css';

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

// Interface representing the props for the RecipesList component
interface RecipesListProps {
  recipes: Recipe[];
  onEdit: (id: number, updatedRecipe: Recipe) => void;
  onDelete: (id: number) => void;
  randomRecipeId: number | null;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, onEdit, onDelete, randomRecipeId }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedRecipe, setEditedRecipe] = useState<Recipe | null>(null);

  const handleEditClick = (recipe: Recipe) => {
    setEditingId(recipe.id);
    setEditedRecipe(recipe);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (editedRecipe) {
      setEditedRecipe({
        ...editedRecipe,
        [field]: e.target.value,
      });
    }
  };

  const handleSaveClick = () => {
    if (editedRecipe) {
      onEdit(editingId!, editedRecipe);
      setEditingId(null);
      setEditedRecipe(null);
    }
  };

  return (
    <div className="recipes-list">
      <h2>Recipes</h2>
      <section>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className={`recipe-item ${randomRecipeId === recipe.id ? 'highlight' : ''}`}>
              {editingId === recipe.id ? (
                <>
                  <input
                    type="text"
                    value={editedRecipe?.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                  <ul>
                    {editedRecipe?.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={ingredient.amount}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].amount = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                        <input
                          type="text"
                          value={ingredient.measurement}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].measurement = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                        <input
                          type="text"
                          value={ingredient.item}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].item = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                  <textarea
                    value={editedRecipe?.instructions}
                    onChange={(e) => handleInputChange(e, 'instructions')}
                  />
                  <button onClick={handleSaveClick} className="btn btn-save">Save</button>
                </>
              ) : (
                <>
                  <h3>{recipe.name}</h3>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {`${ingredient.amount ? ingredient.amount : ''} ${ingredient.measurement} ${ingredient.item}`}                      </li>
                    ))}
                  </ul>
                  <p>{recipe.instructions}</p>
                  <button onClick={() => handleEditClick(recipe)} className="btn btn-edit">Edit</button>
                  <button onClick={() => onDelete(recipe.id)} className="btn btn-delete">Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipesList;