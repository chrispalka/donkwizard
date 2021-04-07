/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
  .form-label {
    color: #d0bcd5;
  }
`;

const StyledForm = styled(Form)`
`;

const ForgotPassword = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const [recoveryEmailSent, setRecoveryEmailSent] = useState(false);
  const sendEmail = () => {
    axios.post('/forgotPassword', {
      emailValue,
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    setRecoveryEmailSent(true);
    resetEmailValue();
  };
  return (
    <>
      { recoveryEmailSent ? (
        <h1>Recovery Email Sent!</h1>
      )
        : (
          <FormContainer>
            <StyledForm onSubmit={sendEmail}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...bindEmailValue} placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </StyledForm>
          </FormContainer>
        )}
    </>
  );
};

export default ForgotPassword;
