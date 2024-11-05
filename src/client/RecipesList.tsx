import React from 'react';

interface Ingredient {
  amount: string;
  measurement: string;
  item: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes }) => {
  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.measurement} {ingredient.item}
                </li>
              ))}
            </ul>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;