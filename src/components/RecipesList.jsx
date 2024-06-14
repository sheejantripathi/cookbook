import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";

const dummyData = [
  { id: 1, title: "Recipe 1", image_url: "https://via.placeholder.com/150" },
  { id: 2, title: "Recipe 2", image_url: "https://via.placeholder.com/150" },
  { id: 3, title: "Recipe 3", image_url: "https://via.placeholder.com/150" },
  { id: 4, title: "Recipe 4", image_url: "https://via.placeholder.com/150" },
  { id: 5, title: "Recipe 5", image_url: "https://via.placeholder.com/150" },
  { id: 6, title: "Recipe 6", image_url: "https://via.placeholder.com/150" },
  { id: 7, title: "Recipe 7", image_url: "https://via.placeholder.com/150" },
  { id: 8, title: "Recipe 8", image_url: "https://via.placeholder.com/150" },
  { id: 9, title: "Recipe 9", image_url: "https://via.placeholder.com/150" },
  { id: 10, title: "Recipe 10", image_url: "https://via.placeholder.com/150" },
  { id: 11, title: "Recipe 11", image_url: "https://via.placeholder.com/150" },
  { id: 12, title: "Recipe 12", image_url: "https://via.placeholder.com/150" },
  { id: 13, title: "Recipe 13", image_url: "https://via.placeholder.com/150" },
  { id: 14, title: "Recipe 14", image_url: "https://via.placeholder.com/150" },
  { id: 15, title: "Recipe 15", image_url: "https://via.placeholder.com/150" },
  { id: 16, title: "Recipe 16", image_url: "https://via.placeholder.com/150" },
];

const Recipes = () => {
  //state management of the recipes and the current page
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  //useEffect to fetch the set of initial recipes list from the server
  useEffect(() => {
    // fetchRecipes(currentPage);
    setRecipes(dummyData);
  }, []);

  // const fetchRecipes = async (page) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost/online-recipe-book-server/fetch_recipes.php?page=${page}`
  //     );
  //     setRecipes(response.data.recipes);
  //     setTotalPages(response.data.totalPages);
  //   } catch (error) {
  //     console.error("Error fetching recipes:", error);
  //   }
  // };

  //pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage; //index of the last recipe in the current page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //index of first recipe in the current page
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe); //slice the recipes array to get the current page recipes
  const totalPages = Math.ceil(recipes.length / recipesPerPage); //total number of pages based on the number of recipes(12 per page)

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center">Recipes</h1>
      <Row>
        {currentRecipes.map((recipe) => (
          <Col key={recipe.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={recipe.image_url || "default_image.jpg"}
                alt={recipe.title}
              />
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
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
