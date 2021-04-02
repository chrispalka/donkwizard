/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
`;

const StyledForm = styled(Form)`
`;

const Register = ({ hasRegistered }) => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const { value: passwordValue, bind: bindPasswordValue, reset: resetPasswordValue } = useInput('');
  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('/register', {
      email: emailValue,
      password: passwordValue,
    })
      .then((response) => console.log('data from register!', response.data))
      .catch((err) => console.log(err));
    hasRegistered(true);
    resetEmailValue();
    resetPasswordValue();
  };
  return (
    <FormContainer>
      <StyledForm onSubmit={handleRegister}>
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
    </FormContainer>
  );
};

export default Register;
