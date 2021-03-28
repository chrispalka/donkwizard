/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import useInput from '../hooks/useInput';

const axios = require('axios');

const FormContainer = styled(Container)`
`;

const Register = ({ hasRegistered }) => {
  // useEffect(() => {

  // })

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
  };
  return (
    <FormContainer>
      <form onSubmit={handleRegister}>
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
    </FormContainer>
  );
};

export default Register;
