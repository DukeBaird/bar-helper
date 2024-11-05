import React, { useState } from 'react';

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

interface AddRecipeFormProps {
  addRecipe: (newRecipe: Recipe) => void;
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ addRecipe }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ amount: '', measurement: '', item: '' }]);
  const [instructions, setInstructions] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
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
        const createdRecipe = await response.json();
        addRecipe(createdRecipe);
        alert('Recipe added successfully!');
        setName('');
        setIngredients([{ amount: '', measurement: '', item: '' }]);
        setInstructions('');
      } else {
        alert('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add recipe');
    }
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Add Recipe'}
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Measurement"
                  value={ingredient.measurement}
                  onChange={(e) => handleIngredientChange(index, 'measurement', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Item"
                  value={ingredient.item}
                  onChange={(e) => handleIngredientChange(index, 'item', e.target.value)}
                  required
                />
                <button type="button" onClick={() => handleRemoveIngredient(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Recipe</button>
        </form>
      )}
    </div>
  );
};

export default AddRecipeForm;