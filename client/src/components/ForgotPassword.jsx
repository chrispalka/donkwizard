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

const AlertContainer = styled(Container)`
  width: 50%;
  margin-top: 2em;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;


const StyledForm = styled(Form)`
`;

const ForgotPassword = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  const [showEmailFailure, setShowEmailFailure] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault()
    if (emailValue.length === 0) {
      setShowEmailFailure(true)
      setTimeout(() => setShowEmailFailure(false), 2000);
    } else {
      axios.post('/forgotPassword', {
        emailValue,
      })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
      setShowEmailSuccess(true);
      setTimeout(() => setShowEmailSuccess(false), 2000);
      resetEmailValue();
    }
  };
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={sendEmail}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" {...bindEmailValue} placeholder="Enter email" />
          </Form.Group>
          <Button variant="warning" type="submit">
            Submit
              </Button>
        </StyledForm>
      </FormContainer>
      <AlertContainer>
        <AlertStyle show={showEmailSuccess} variant="success" transition>
          <Alert.Heading>
            <p>
              Please check your email
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showEmailFailure} variant="danger" transition>
          <Alert.Heading>
            <p>
              Please enter a valid email
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default ForgotPassword;
