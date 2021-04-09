/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
  width: 50%;
  .form-label {
    color: #d0bcd5;
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

const LoadingContainer = styled(Container)`
  width: 50%;
  color: #d0bcd5;
  font-family: 'Roboto';
  text-align: center;
  margin-top: 20em;
`;

const StyledForm = styled(Form)`
`;

const ResetPassword = ({ hasUpdatedPassword }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setUpdateEmail] = useState(true);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);
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
    setShowUpdateSuccess(true);
    setTimeout(() => setShowUpdateSuccess(false), 2000);
    setTimeout(() => hasUpdatedPassword(), 3000)
    reset();
  };

  return (
    <>
      { isLoading ? (
        <LoadingContainer>
          <h1>Loading...</h1>
        </LoadingContainer>
      )
        : (
          <FormContainer>
            <StyledForm onSubmit={handleUpdatePassword}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Update Password</Form.Label>
                <Form.Control type="password" {...bind} placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </StyledForm>
          </FormContainer>
        )}
      <AlertContainer>
        <AlertStyle show={showUpdateSuccess} variant="success" transition>
          <Alert.Heading>
            <p>
              Password Successfully Updated!
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default ResetPassword;
