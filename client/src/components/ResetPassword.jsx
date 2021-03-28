/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useInput from '../hooks/useInput';

const axios = require('axios');

const ResetPassword = () => {
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
    reset();
  };

  return (
    <>
      { isLoading ? (
        <h1>Loading...</h1>
      )
        : (
          <div>
            <h1>Update Password</h1>
            <form onSubmit={handleUpdatePassword} id="update_password">
              <div className="container">
                <div className="form-group">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="password_reset">
                        <input type="text" {...bind} />
                      </label>
                      <input type="submit" value="Submit" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
    </>
  );
};

export default ResetPassword;
