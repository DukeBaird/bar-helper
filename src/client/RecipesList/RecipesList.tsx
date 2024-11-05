import React from 'react';
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
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, onEdit, onDelete }) => {
  return (
    <div className="recipes-list">
      <h2>Recipes</h2>
      <section>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <h3>{recipe.name}</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {`${ingredient.amount} ${ingredient.measurement} ${ingredient.item}`}
                  </li>
                ))}
              </ul>
              <p>{recipe.instructions}</p>
              <button onClick={() => onEdit(recipe.id)} className="btn btn-edit">Edit</button>
              <button onClick={() => onDelete(recipe.id)} className="btn btn-delete">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipesList;