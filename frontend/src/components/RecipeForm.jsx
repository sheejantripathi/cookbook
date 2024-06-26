import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import axios from "../axiosConfig"; // Assuming axiosConfig.js is correctly configured
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const RecipeForm = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [steps, setSteps] = useState([""]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [utensilOptions, setUtensilOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`/recipe/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((response) => {
          const recipe = response.data;
          setName(recipe.name);
          setDescription(recipe.description);
          setImagePreview(recipe.image);
          setSteps(recipe.steps);
          setSelectedIngredients(
            recipe.ingredients.map((ingredient) => ({
              value: ingredient.id,
              label: ingredient.name,
            }))
          );
          setSelectedUtensils(
            recipe.utensils.map((utensil) => ({
              value: utensil.id,
              label: utensil.name,
            }))
          );
        });
    }

    axios
      .get("/ingredients", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((response) => {
        const options = response.data.map((ingredient) => ({
          value: ingredient.id,
          label: ingredient.name,
        }));
        setIngredientOptions(options);
      })
      .catch((error) => console.error("Error fetching ingredients:", error));

    axios
      .get("/utensils", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((response) => {
        const options = response.data.map((utensil) => ({
          value: utensil.id,
          label: utensil.name,
        }));
        setUtensilOptions(options);
      })
      .catch((error) => console.error("Error fetching utensils:", error));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(newSteps);
  };

  const handleCreateIngredient = async (inputValue) => {
    try {
      const response = await axios.post("/ingredient", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        name: inputValue,
      });
      const newOption = { value: response.data.id, label: response.data.name };
      setIngredientOptions((prevOptions) => [...prevOptions, newOption]);
      setSelectedIngredients((prevSelected) => [...prevSelected, newOption]);
    } catch (error) {
      console.error("Error creating ingredient:", error);
    }
  };

  const handleCreateUtensil = async (inputValue) => {
    try {
      const response = await axios.post("/utensil", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
        name: inputValue,
      });
      const newOption = { value: response.data.id, label: response.data.name };
      setUtensilOptions((prevOptions) => [...prevOptions, newOption]);
      setSelectedUtensils((prevSelected) => [...prevSelected, newOption]);
    } catch (error) {
      console.error("Error creating utensil:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("imageString", imagePreview); // Ensure image is not null
    }
    steps.forEach((step) => {
      formData.append("steps[]", step); // Append as array
    });

    selectedIngredients.forEach((ingredient) => {
      formData.append("ingredients[]", ingredient.value); // Append as array
    });

    selectedUtensils.forEach((utensil) => {
      formData.append("utensils[]", utensil.value); // Append as array
    });

    try {
      if (id) {
        try {
          await axios.post(`/recipe/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("jwtAccessToken")}`,
            },
          });
          // Handle successful update
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            // Handle validation errors
            console.log(error.response.data.errors);
          } else {
            // Handle other errors
            console.error("Update failed:", error.message);
          }
        }
      } else {
        await axios.post("/recipe", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("jwtAccessToken")}`,
          },
        });
      }
      navigate("/my-recipes");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="container">
      <h1>{id ? "Edit Recipe" : "Add a New Recipe"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            id="description"
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="image">Image</Form.Label>
          <Row>
            <Col xs="auto">
              <Form.Control
                id="image"
                type="file"
                onChange={handleImageChange}
                className="form-control-sm"
              />
            </Col>
            {imagePreview && (
              <Col xs="auto">
                <Image
                  src={imagePreview}
                  thumbnail
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </Col>
            )}
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Steps
            <Button
              variant="outline-primary"
              size="sm"
              className="ml-2"
              onClick={addStep}
            >
              Add Step
            </Button>
          </Form.Label>
          {steps.map((step, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  id={`step${index}`}
                  type="text"
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChange={(e) => handleStepChange(index, e)}
                  required
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-danger"
                  onClick={() => removeStep(index)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="ingredients">Ingredients</Form.Label>
          <CreatableSelect
            id="ingredients"
            isMulti
            options={ingredientOptions}
            value={selectedIngredients}
            onChange={setSelectedIngredients}
            onCreateOption={handleCreateIngredient}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="utensils">Utensils</Form.Label>
          <CreatableSelect
            id="utensils"
            isMulti
            options={utensilOptions}
            value={selectedUtensils}
            onChange={setSelectedUtensils}
            onCreateOption={handleCreateUtensil}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default RecipeForm;
