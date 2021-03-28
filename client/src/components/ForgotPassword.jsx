/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import useInput from '../hooks/useInput';

const axios = require('axios');

const SERVER = process.env.SERVER || 'localhost';
const PORT = process.env.PORT || 3000;

const FormContainer = styled(Container)`
`;

const ForgotPassword = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const sendEmail = () => {
    axios.post('/forgotPassword', {
      emailValue,
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
    resetEmailValue();
  };
  return (
    <FormContainer>
      <form onSubmit={sendEmail}>
        <label htmlFor="forgot_password">
          Email
          <input type="text" {...bindEmailValue} id="forgot_password" className="form-control" placeholder="name@example.com" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
