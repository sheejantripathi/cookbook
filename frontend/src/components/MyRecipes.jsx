// MyRecipes.js
import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import RecipeModal from "./RecipeForm";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Spaghetti Bolognese",
      ingredients: "Spaghetti, minced beef, tomato sauce",
      utensils: "Pot, pan, spoon",
      steps: "1. Cook spaghetti. 2. Prepare sauce. 3. Mix and serve.",
    },
    // Add more dummy recipes if needed
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const handleAddRecipe = () => {
    setCurrentRecipe(null);
    setShowModal(true);
  };

  const handleEditRecipe = (recipe) => {
    setCurrentRecipe(recipe);
    setShowModal(true);
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
  };

  const handleSaveRecipe = (recipe) => {
    if (recipe.id) {
      setRecipes(recipes.map((r) => (r.id === recipe.id ? recipe : r)));
    } else {
      recipe.id = recipes.length + 1;
      setRecipes([...recipes, recipe]);
    }
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Recipes</h2>
      <Link to="/add-recipe">
        <Button variant="primary">Add Recipe</Button>
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Utensils</th>
            <th>Steps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td>{recipe.name}</td>
              <td>{recipe.ingredients}</td>
              <td>{recipe.utensils}</td>
              <td>{recipe.steps}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditRecipe(recipe)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RecipeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveRecipe}
        recipe={currentRecipe}
      />
    </div>
  );
};

export default MyRecipes;
