import React, { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  name: string;
  ingredients: { item: string; amount: number | null; measurement: string }[];
  instructions: string;
}

const RecipesList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3000/recipes`)
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.instructions}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.measurement} {ingredient.item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;