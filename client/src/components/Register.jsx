/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
  margin-top: 10em;
  .form-label {
    color: #cfdbd5;
  }
`;

const StyledForm = styled(Form)`
`;

const AlertContainer = styled(Container)`
  margin-top: 2em;
  width: 50%;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const Register = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const { value: passwordValue, bind: bindPasswordValue, reset: resetPasswordValue } = useInput('');
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (emailValue.length === 0 || passwordValue.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      axios.post('/register', {
        email: emailValue,
        password: passwordValue,
      })
        .then((response) => {
          if (response.data !== 'Success') {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
          } else {
            setIsLoading(true)
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 2000)
            setTimeout(() => window.location = '/login', 2000)
          }
          resetEmailValue();
          resetPasswordValue();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
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
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </StyledForm>
      </FormContainer>
      <AlertContainer>
        <AlertStyle show={showAlert} variant="danger" transition>
          <Alert.Heading>
            <p>
              Credentials Invalid
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showSuccessAlert} variant="success" transition>
          <Alert.Heading>
            <p>
              Success! You will now be redirected to the login page
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default Register;
