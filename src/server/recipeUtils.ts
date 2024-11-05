/**
 * getRandomRecipe - Selects a random recipe from the recipes array.
 * @param {any[]} recipes - The array of recipes.
 * @returns {any} A randomly selected recipe.
 */
export function getRandomRecipe(recipes: any[]): any {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
}