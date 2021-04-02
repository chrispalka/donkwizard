/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
`;

const LinkContainer = styled(Container)`
  padding: 0;
  margin-top: 1em;
  .register {
    float: right;
  }
  a {
    color: black;
  }
`;

const StyledForm = styled(Form)`
  span:hover {
    cursor: pointer;
  }
`;

const Login = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const { value: passwordValue, bind: bindPasswordValue, reset: resetPasswordValue } = useInput('');
  const handleLogin = () => {
    axios.post('login', {
      email: emailValue,
      password: passwordValue,
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    resetEmailValue();
    resetPasswordValue();
  };

  return (
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </StyledForm>
      <LinkContainer>
        <Link to="/forgotpassword">Forgot Password?</Link>
        <Link to="/register" className="register">Register</Link>
      </LinkContainer>
    </FormContainer>
  );
};

export default Login;
