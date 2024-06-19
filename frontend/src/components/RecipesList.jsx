import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../axiosConfig"; // Assuming axiosConfig.js is correctly configured

const Recipes = () => {
  //state management of the recipes and the current page
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  //useEffect to fetch the set of initial recipes list from the server
  useEffect(() => {
    fetchRecipes(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchRecipes = async (page, query) => {
    try {
      const response = await axios.get(
        `/recipes/all?page=${page}&ingredient=${query}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setRecipes(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(1, searchQuery);
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Recipes</h1>
        </Col>
        <Col md="auto" className="ml-auto">
          <Form inline="true" onSubmit={handleSearch}>
            <Form.Control
              type="text"
              placeholder="Search by ingredient"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mr-sm-2"
            />
          </Form>
        </Col>
      </Row>
      <Row>
        {recipes &&
          recipes.map((recipe) => (
            <Col key={recipe.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={recipe.image || "default_image.jpg"}
                  alt={recipe.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                </Card.Body>
                <Button as={Link} to={`/recipe/${recipe.id}`} variant="primary">
                  View Recipe
                </Button>
              </Card>
            </Col>
          ))}
      </Row>
      <Pagination className="justify-content-center">
        {Array.from({ length: lastPage }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Recipes;
