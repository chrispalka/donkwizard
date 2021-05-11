/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  faEnvelopeSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'react-bootstrap';
import '../../../modules/monitorJob';
import '../../../modules/gunMonitor';
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const Home = lazy(() => import('./Home'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));
const ResetPassword = lazy(() => import('./ResetPassword'));
const Monitor = lazy(() => import('./Monitor'));

import {
  NavBar,
  Footer
} from '../layout/index';


const axios = require('axios');

const Global = createGlobalStyle`
  body {
    margin: 0;
    padding-bottom: 50px;
    background-color: #242423;
    overflow-y: scroll;
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
  const location = useLocation();
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
        <NavBar isLoggedIn={isLoggedIn} location={location} />
        <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/login" exact component={() => <Login />}>
            {isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register" exact component={() => <Register />} />
          <Route path="/monitor" exact component={() => <Monitor />}>
            {!isLoggedIn ? <Redirect to="/" /> : <Monitor />}
          </Route>
        <Route path="/" exact component={() => <Home isLoggedIn={isLoggedIn} />} />
        <Route path="/forgotpassword" exact component={() => <ForgotPassword />} />
        <Route path="/resetpassword/:token" exact component={() => <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}>
          {passwordUpdated ? <Redirect to="/login" /> : <ResetPassword hasUpdatedPassword={handleHasUpdatedPassword} />}
        </Route>
        </Switch>
        </Suspense>
      <Footer links={FooterLinks} />
    </MainContainer>
    </>
  );
};

export default App;
