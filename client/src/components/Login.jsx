/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import useInput from '../hooks/useInput';
import { ForgotPassword } from '../layout/index';

const axios = require('axios');

const FormContainer = styled(Container)`
`;

const Login = () => {
  const { value: emailValue, bind: bindEmailValue, reset: resetEmailValue } = useInput('');
  const { value: passwordValue, bind: bindPasswordValue, reset: resetPasswordValue } = useInput('');
  const [isForgotPassword, setForgotPassword] = useState(false);
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

  const handleSetForgotPassword = () => {
    setForgotPassword(true);
  };
  return (
    <>
      {
        isForgotPassword
          ? (
            <ForgotPassword />
          )
          : (
            <FormContainer>
              <form onSubmit={handleLogin}>
                <label htmlFor="email_field">
                  Email
                  <input type="text" {...bindEmailValue} id="email_field" className="form-control" placeholder="name@example.com" />
                </label>
                <label htmlFor="password_field">
                  Password
                  <input type="password" {...bindPasswordValue} id="password_field" className="form-control" />
                </label>
                <input type="submit" value="submit" />
              </form>
              <button type="button" onClick={handleSetForgotPassword}>Forgot Password</button>
            </FormContainer>
          )
      }
    </>
  );
};

export default Login;
