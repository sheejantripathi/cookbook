/* eslint-disable react/prop-types */
// CustomNavbar.js
import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

const CustomNavbar = ({ profile, logOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Cookbook of Champions
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {profile ? (
              <>
                <Image
                  src={profile.picture}
                  roundedCircle
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <span className="me-3">{profile.name}</span>
                <NavDropdown
                  title={<span>Menu</span>}
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/my-recipes">
                    My Recipes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Item>
                <Button variant="outline-primary" as={Link} to="/login">
                  Login
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// CustomNavbar.propTypes = {
//   profile: PropTypes.shape({
//     picture: PropTypes.string,
//     name: PropTypes.string,
//     email: PropTypes.string,
//   }),
//   logOut: PropTypes.func.isRequired,
// };

export default CustomNavbar;
