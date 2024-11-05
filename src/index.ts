import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let recipes: any[] = [];

// Read recipes.json when the server launches
fs.readFile(path.join(__dirname, '../recipes.json'), 'utf8', (err, data) => {
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
  // Logic to create a recipe
  res.status(201).send('Recipe created');
});

// Read all recipes
app.get('/recipes', (req, res) => {
  // Logic to get all recipes
  res.send(recipes);
});

// Read a single recipe by ID
app.get('/recipes/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
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
  // Logic to delete a recipe by ID
  res.send(`Recipe with ID ${req.params.id} deleted`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
