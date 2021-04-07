/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
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

const ResetPassword = ({ hasUpdatedPassword }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setUpdateEmail] = useState(true);
  const { token } = useParams();
  useEffect(() => {
    axios('/reset', {
      params: {
        resetPasswordToken: token,
      },
    }).then((response) => {
      if (response.data.email) {
        setUpdateEmail(response.data.email);
        setIsLoading(false);
      }
    });
  });
  const { value, bind, reset } = useInput('');
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    axios.post('/updatePasswordFromEmail', {
      email,
      password: value,
    }).then((response) => console.log('Password updated ', response))
      .catch((err) => console.log(err));
    hasUpdatedPassword();
    reset();
  };

  return (
    <>
      { isLoading ? (
        <h1>Loading...</h1>
      )
        : (
          <FormContainer>
            <h1>Update Password</h1>
            <StyledForm onSubmit={handleUpdatePassword}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...bind} placeholder="Password" />
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

export default ResetPassword;
