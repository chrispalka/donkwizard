/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
  .form-label {
    color: #cfdbd5;
  }
`;

const LinkContainer = styled(Container)`
  padding: 0;
  margin-top: 1em;
  .register {
    float: right;
  }
  a {
    color: #f5cb5c;
    :hover {
      color: #FFF;
    }
  }
`;

const StyledForm = styled(Form)`
  span:hover {
    cursor: pointer;
  }
`;

const AlertContainer = styled(Container)`
  width: 50%;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const Login = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const { value: passwordValue, bind: bindPasswordValue, reset: resetPasswordValue } = useInput('');
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('login', {
      email: emailValue.toLowerCase(),
      password: passwordValue,
    })
      .then((response) => {
        if (response.data !== 'Success') {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 2000);
        } else {
          window.location = '/';
          resetEmailValue();
          resetPasswordValue();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...bindEmailValue} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...bindPasswordValue} placeholder="Password" />
          </Form.Group>
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </StyledForm>
        <LinkContainer>
          <Link to="/forgotpassword">Forgot Password?</Link>
          <Link to="/register" className="register">Register</Link>
        </LinkContainer>
      </FormContainer>
      <AlertContainer>
        <AlertStyle show={showAlert} variant="danger" transition>
          <Alert.Heading>
            <p>
              Credentials Invalid
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default Login;
