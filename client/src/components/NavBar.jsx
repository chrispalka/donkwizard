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
.navbar {
  padding-left: 0;
  padding-right: 0;
}
.nav-title {
  font-family: 'Dela Gothic One';
  color: #f5cb5c;
  cursor: pointer;
  :hover {
    color: #FFF;
  }
}
.ml-auto {
  .nav-link-custom {
    text-decoration: none;
    color: #f5cb5c;
    :hover {
      color: #FFF;
    }
  }
}

.navbar-nav a {
    margin-left: 0.5em;
    font-family: 'Roboto';
    padding: 0;
    color: #f5cb5c;
  }
  .dropdown-menu {
    background-color: #333533;
  }
  #nav-dropdown {
    color: #f5cb5c;
    :hover {
      color: #FFF;
    }
  }

`;

const NavBar = ({ isLoggedIn }) => {
  const [currentUser, setCurrentUser] = useState('');
  const formatName = (email) => {
    let name = email.split('@')[0]
    return name.slice(0, 1).toUpperCase().concat(name.slice(1))
  }
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
      <Navbar expand="lg">
        <Navbar.Brand href="/" className="nav-title">DonkWizard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ml-auto">
            <Link to="/" className="nav-link-custom">Home</Link>
            {!isLoggedIn ? (
              <Link to="/login" className="nav-link-custom">Login</Link>
            )
              : ''}
            {isLoggedIn ? (
              <NavDropdown title={formatName(currentUser)} id="nav-dropdown" className="dropdown-custom">
                <a href="/logout" className="nav-link-custom">Logout</a>
              </NavDropdown>
            )
              : ''}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </NavContainer>
  );
};

export default NavBar;
