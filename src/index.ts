import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { getRandomRecipe } from './server/recipeUtils';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let recipes: any[] = [];

const recipesFilePath = path.join(__dirname, '../recipes.json');

// Read recipes.json when the server launches
fs.readFile(recipesFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading recipes.json:', err);
    return;
  }
  recipes = JSON.parse(data);
  console.log('Recipes loaded:', recipes);
});

app.get('/', (req, res) => {
  res.send('Hello, TypeScript!');
});

// Create a new recipe
app.post('/recipes', (req, res) => {
  const newRecipe = {
    id: uuidv4(), // Generate a new unique ID
    ...req.body
  };
  recipes.push(newRecipe);

  // Write the updated recipes array to the JSON file
  fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (err) => {
    if (err) {
      console.error('Error writing to recipes file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send(`Recipe with ID ${newRecipe.id} created`);
    }
  });
});

// Read all recipes
app.get('/recipes', (req, res) => {
  // Logic to get all recipes
  res.send(recipes);
});

// Read a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send('Recipe not found');
  }
});

// Update a recipe by ID
app.put('/recipes/:id', (req, res) => {
  // Logic to update a recipe by ID
  res.send(`Recipe with ID ${req.params.id} updated`);
});

// Delete a recipe by ID
app.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  recipes = recipes.filter(recipe => recipe.id != id); // id is a string, so we use != instead of !==

  // Write the updated recipes array to the JSON file
  fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (err) => {
    if (err) {
      console.error('Error writing to recipes file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send(`Recipe with ID ${id} deleted`);
    }
  });
});

// Endpoint to get a random recipe
app.get('/random-recipe', (req, res) => {
  const randomRecipe = getRandomRecipe(recipes);
  res.send(randomRecipe);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
