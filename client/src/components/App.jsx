/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopeSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';
import {
  ForgotPassword,
  Home, Login, Register, ResetPassword, NavBar, Footer,
} from '../layout/index';

const axios = require('axios');

const Global = createGlobalStyle`
  body {
    background-color: #242423;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  `;

const MainContainer = styled(Container)`
`;

const FooterLinks = [
  {
    path: 'mailto:cpalka87@gmail.com',
    icon: faEnvelopeSquare
  },
  {
    path: 'https://github.com/chrispalka',
    icon: faGithub
  },
  {
    path: 'https://linkedin.com/in/chrispalka',
    icon: faLinkedin
  },
]

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
        <Footer links={FooterLinks} />
      </MainContainer>
    </>
  );
};

export default App;
