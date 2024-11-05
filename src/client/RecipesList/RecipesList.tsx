import React from 'react';
import './RecipesList.css';

// Interface representing an ingredient in a recipe
interface Ingredient {
  amount: string;
  measurement: string;
  item: string;
}

// The Recipe interface represents a recipe with an id, name, list of ingredients, and instructions.
interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

// Interface representing the props for the RecipesList component
interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
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
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RecipesList;