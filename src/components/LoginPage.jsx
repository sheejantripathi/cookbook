// Loginpage.jsx
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const LoginPage = ({ login }) => {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
        <Col className="text-center">
          <h1>Welcome to the Cookbook of Champions</h1>
          <Image
            src="/cookbook.jpg"
            className="mx-auto d-block rounded-circle mt-4 mb-4"
            style={{ maxWidth: "100%", height: "auto", width: "400px" }} // Adjust the width as needed
          />
          <Button variant="primary" size="lg" onClick={login}>
            Sign in with Google 🚀
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginPage;
