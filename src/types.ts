// FILE: types.ts

/**
 * Interface representing a single ingredient
 */
export interface Ingredient {
  amount: string;
  measurement: string;
  item: string;
}

/**
 * Interface representing a single recipe
 */
export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}