/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';
import {
  Home, Login, Register, ResetPassword,
} from '../layout/index';

const axios = require('axios');

const SERVER = process.env.SERVER || 'localhost';
const PORT = process.env.PORT || 3000;

const MainContainer = styled(Container)`

`;

const App = () => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios(`http://${SERVER}:${PORT}/isLoggedIn`)
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleHasRegistered = (registered) => {
    setHasRegistered(registered);
  };

  return (
    <MainContainer>
      <Router>
        <h1>DONKWIZARD</h1>
        <h1>
          Is
          {isLoggedIn === false ? ' NOT logged in' : ' logged in'}
          {' '}
        </h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        {isLoggedIn ? (
          <a href="/logout">Logout</a>
        )
          : ''}

        <Switch>
          <Route path="/login" exact component={() => <Login />}>
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register" exact component={() => <Register hasRegistered={handleHasRegistered} />}>
            {hasRegistered ? <Redirect to="/login" /> : <Register hasRegistered={handleHasRegistered} />}
          </Route>
          <Route path="/" exact component={() => <Home isLoggedIn={isLoggedIn} />} />
          <Route path="/resetpassword/:token">
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
    </MainContainer>
  );
};

export default App;
