/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Nav, Navbar, Container, NavDropdown,
} from 'react-bootstrap';
import styled from 'styled-components';

const axios = require('axios');

const NavContainer = styled(Container)`
.nav-title {
  font-family: 'Dela Gothic One';
}
.ml-auto {
  .nav-link {
    color: black;
  }
}
.navbar-nav a {
    color: black;
    margin-left: 1em;
  }
  margin-bottom: 4em;
`;

const NavBar = ({ isLoggedIn }) => {
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (isLoggedIn) {
      axios('/currentUser')
        .then((data) => {
          setCurrentUser(data.data);
        });
    }
  }, [isLoggedIn]);
  return (
    <NavContainer>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" className="nav-title">DonkWizard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="ml-auto">
          <Link to="/" className="nav-link">Home</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="nav-link">Login</Link>
          )
            : ''}
          {isLoggedIn ? (
            <NavDropdown title={currentUser.split('@')[0]} id="basic-nav-dropdown" className="dropdown-custom">
              <a href="/logout">Logout</a>
            </NavDropdown>
          )
            : ''}
        </Nav>
      </Navbar>
    </NavContainer>
  );
};

export default NavBar;
