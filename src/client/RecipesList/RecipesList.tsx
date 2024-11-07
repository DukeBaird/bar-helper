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
  glassware: string; // Add glassware field
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
  const [scalingFactor, setScalingFactor] = useState(1);

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

  const handleScalingFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScalingFactor(Number(e.target.value));
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
      <div className="scaling-factor-container">
        <label htmlFor="scalingFactor">Scaling Factor:</label>
        <input
          type="number"
          id="scalingFactor"
          value={scalingFactor}
          onChange={handleScalingFactorChange}
          className="form-control"
        />
      </div>
      <section>
        <div>
          {recipes.map((recipe) => (
            <li key={recipe.id} className={`recipe-card ${randomRecipeId === recipe.id ? 'highlight' : ''}`}>
              {editingId === recipe.id ? (
                <div className="recipe-edit-container">
                  <input
                    type="text"
                    className="recipe-name-input"
                    value={editedRecipe?.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                  />
                  <input
                    type="text"
                    className="recipe-glassware-input"
                    value={editedRecipe?.glassware}
                    onChange={(e) => handleInputChange(e, 'glassware')}
                  />
                  <div className="ingredients-list">
                    {editedRecipe?.ingredients.map((ingredient, index) => (
                      <li key={index} className="ingredient-row">
                        <input
                          type="text"
                          className="amount-input"
                          value={ingredient.amount}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].amount = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                        <input
                          type="text" 
                          className="measurement-input"
                          value={ingredient.measurement}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].measurement = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                        <input
                          type="text"
                          className="item-input"
                          value={ingredient.item}
                          onChange={(e) => {
                            const newIngredients = [...editedRecipe.ingredients];
                            newIngredients[index].item = e.target.value;
                            setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
                          }}
                        />
                      </li>
                    ))}
                  </div>
                  <textarea
                    value={editedRecipe?.instructions}
                    onChange={(e) => handleInputChange(e, 'instructions')}
                  />
                  <button onClick={handleSaveClick} className="btn btn-save">Save</button>
                </div>
              ) : (
                <>
                  <h3>{recipe.name}</h3>
                  <p>Glassware: {recipe.glassware}</p>
                  <div>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {`${ingredient.amount ? parseInt(ingredient.amount) * scalingFactor : ''} ${ingredient.measurement} ${ingredient.item}`}                      </li>
                    ))}
                  </div>
                  <p>{recipe.instructions}</p>
                  <button onClick={() => handleEditClick(recipe)} className="btn btn-edit">Edit</button>
                  <button onClick={() => onDelete(recipe.id)} className="btn btn-delete">Delete</button>
                </>
              )}
            </li>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipesList;