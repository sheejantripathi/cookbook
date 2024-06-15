// RecipeModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";

const RecipeModal = ({ show, handleClose, handleSave, recipe }) => {
  const [formData, setFormData] = useState({
    id: recipe ? recipe.id : null,
    name: recipe ? recipe.name : "",
    ingredients: recipe ? recipe.ingredients : "",
    utensils: recipe ? recipe.utensils : "",
    steps: recipe ? recipe.steps : "",
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        utensils: recipe.utensils,
        steps: recipe.steps,
      });
    } else {
      setFormData({
        id: null,
        name: "",
        ingredients: "",
        utensils: "",
        steps: "",
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSave = () => {
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{recipe ? "Edit Recipe" : "Add Recipe"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRecipeName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter recipe name"
            />
          </Form.Group>

          <Form.Group controlId="formIngredients" className="mt-3">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              type="text"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients"
            />
          </Form.Group>

          <Form.Group controlId="formUtensils" className="mt-3">
            <Form.Label>Utensils</Form.Label>
            <Form.Control
              type="text"
              name="utensils"
              value={formData.utensils}
              onChange={handleChange}
              placeholder="Enter utensils"
            />
          </Form.Group>

          <Form.Group controlId="formSteps" className="mt-3">
            <Form.Label>Steps</Form.Label>
            <Form.Control
              as="textarea"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              placeholder="Enter steps"
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

RecipeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  recipe: PropTypes.object,
};

export default RecipeModal;
