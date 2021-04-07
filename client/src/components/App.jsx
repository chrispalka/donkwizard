/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';
import {
  ForgotPassword,
  Home, Login, Register, ResetPassword, NavBar,
} from '../layout/index';

const axios = require('axios');

const Global = createGlobalStyle`
  body {
    background-color: #1b1725;
  }
  `;

  const MainContainer = styled(Container)`
`;

const App = () => {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios('/isLoggedIn')
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleHasUpdatedPassword = () => {
    setPasswordUpdated(true);
  };

  return (
    <>
      <Global />
      <MainContainer>
        <Router>
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/login" exact component={() => <Login />}>
              {isLoggedIn ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route path="/register" exact component={() => <Register />} />
            <Route path="/" exact component={() => <Home isLoggedIn={isLoggedIn} />} />
            <Route path="/forgotpassword" exact component={() => <ForgotPassword />} />
            <Route path="/resetpassword/:token" exact component={() => <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}>
              {passwordUpdated ? <Redirect to="/login" /> : <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}
            </Route>
          </Switch>
        </Router>
      </MainContainer>
    </>
  );
};

export default App;
