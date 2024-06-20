import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
} from "react-bootstrap";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  // Fetch the recipe details
  const fetchRecipe = async (id) => {
    try {
      const response = await axios.get(`/recipe/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      setRecipe(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch the recipe details when the component mounts
  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Image src={recipe.image} fluid />
        </Col>
        <Col md={6}>
          <h1>{recipe.name}</h1>
          <Card className="my-3">
            <Card.Body>
              <Card.Text>{recipe.description}</Card.Text>
            </Card.Body>
          </Card>
          <h3>Ingredients</h3>
          <ListGroup>
            {recipe.ingredients.map((ingredient) => (
              <ListGroupItem key={ingredient.id}>
                {ingredient.name}
              </ListGroupItem>
            ))}
          </ListGroup>
          <h3>Utensils</h3>
          <ListGroup>
            {recipe.utensils.map((utensil) => (
              <ListGroupItem key={utensil.id}>{utensil.name}</ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        <Col>
          <h3>Steps</h3>
          <ListGroup>
            {recipe.steps.map((step, index) => (
              <ListGroupItem key={index}>
                {index + 1 + ". " + step}
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetail;
