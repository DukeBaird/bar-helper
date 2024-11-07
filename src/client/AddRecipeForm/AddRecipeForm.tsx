import React, { useState } from 'react';
import './AddRecipeForm.css';

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
  glassware: string; // Add glassware field
}

interface AddRecipeFormProps {
  addRecipe: (newRecipe: Recipe) => void;
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ addRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ amount: '', measurement: '', item: '' }]);
  const [instructions, setInstructions] = useState('');
  const [glassware, setGlassware] = useState('');

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = { ...newIngredients[index], [field]: value };
      return newIngredients;
    });
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { amount: '', measurement: '', item: '' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newRecipe = {
      id: Date.now(), // Temporary ID, replace with actual ID from server if needed
      name,
      ingredients,
      instructions,
      glassware // Add glassware field
    };

    try {
      const response = await fetch(`http://${window.location.hostname}:3000/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        addRecipe(newRecipe);
        alert('Recipe added successfully!');
        setName('');
        setIngredients([{ amount: '', measurement: '', item: '' }]);
        setInstructions('');
        setGlassware('');
      } else {
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add recipe');
    }
  };

  return (
    <div className="add-recipe-form-container">
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Measurement"
                value={ingredient.measurement}
                onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Item"
                value={ingredient.item}
                onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                className="form-control"
              />
              <button type="button" onClick={() => handleRemoveIngredient(index)} className="btn btn-remove">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient} className="btn btn-add">
            Add Additional Ingredient
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="glassware">Glassware:</label>
          <input
            type="text"
            id="glassware"
            value={glassware}
            onChange={(e) => setGlassware(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipeForm;