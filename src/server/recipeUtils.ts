import { Recipe } from '../types';


/**
 * getRandomRecipe - Selects a random recipe from the recipes array.
 * @param {Recipe[]} recipes - The array of recipes.
 * @returns {Recipe} A randomly selected recipe.
 */
export function getRandomRecipe(recipes: Recipe[]): Recipe {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}