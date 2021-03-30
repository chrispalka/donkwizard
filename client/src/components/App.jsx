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
  ForgotPassword,
  Home, Login, Register, ResetPassword,
} from '../layout/index';

const axios = require('axios');

const SERVER = process.env.SERVER || 'localhost';
const PORT = process.env.PORT || 3000;

const MainContainer = styled(Container)`
  text-align: left;
  width: 100%;
`;

const App = () => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
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

  const handleHasUpdatedPassword = () => {
    setPasswordUpdated(true);
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
        {!isLoggedIn ? (
          <Link to="/login">Login</Link>
        )
          : ''}
        {!isLoggedIn ? (
          <Link to="/register">Register</Link>
        )
          : ''}
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
          <Route path="/forgotpassword" exact component={() => <ForgotPassword />} />
          <Route path="/resetpassword/:token" exact component={() => <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}>
            {passwordUpdated ? <Redirect to="/login" /> : <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}
          </Route>

        </Switch>
      </Router>
    </MainContainer>
  );
};

export default App;
