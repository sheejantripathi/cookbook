import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const MyRecipes = ({ userId }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/recipes?userId=${userId}`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [userId]);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`/recipe/${recipeId}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (recipeId) => {
    Navigate(`/edit-recipe/${recipeId}`);
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
            <th>Image</th>
            <th>Ingredients</th>
            <th>Utensils</th>
            <th>Steps</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td>{recipe.name}</td>
                <td>
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt="Recipe"
                      style={{ width: "100px", height: "100px" }}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </td>
                <td>{recipe.ingredients.join(", ")}</td>
                <td>{recipe.utensils.join(", ")}</td>
                <td>{recipe.steps.join(", ").substr(0, 100) + "..."}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(recipe.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRecipe(recipe.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No recipes found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default MyRecipes;
