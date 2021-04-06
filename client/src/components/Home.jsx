/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import scraper from '../../../modules/scraper';
import {
  WebhookTable,
} from '../layout/index';

const axios = require('axios');

const FormContainer = styled(Container)`
  margin-top: 2em;
`;

const StyledForm = styled(Form)`
`;

const AlertContainer = styled(Container)`
  width: 50%;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const TableContainer = styled(Container)`
  margin-top: 1em;
`;

const Home = ({ isLoggedIn }) => {
  const { value: siteValue, bind: bindSiteValue, reset: resetSiteValue } = useInput('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');
  const { value: webhookValue, bind: bindWebhookValue } = useInput('');
  const [isEdit, setIsEdit] = useState(false);
  const [webhookField, setWebhookField] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showVariantAlert, setShowVariantAlert] = useState(false);
  const [showWebhookAlert, setShowWebhookAlert] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios('/getWebhook')
        .then((data) => {
          setWebhookField(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (siteValue.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      const productLink = siteValue;
      const valueArray = siteValue.split('/');
      const domain = valueArray[2];
      const handle = valueArray[valueArray.length - 1];
      const url = `https://${domain}/products.json`;
      if (domain !== undefined) {
        axios(url)
          .then((data) => scraper(
            data.data, !isLoggedIn ? webhookValue : webhookField,
            domain, handle, productLink,
            delimiterValue,
          ))
          .then((response) => {
            if (!response) {
              setShowVariantAlert(true);
              setTimeout(() => setShowVariantAlert(false), 2000);
            }
          })
          .catch((err) => console.log(err));
      }
      resetSiteValue();
      resetDelimiterValue();
    }
  };
  const handleWebhookSave = () => {
    const webhookURL = webhookField;
    if (webhookURL.length !== 120) {
      setShowWebhookAlert(true);
      setTimeout(() => setShowWebhookAlert(false), 2000);
    } else {
      axios.post('/saveWebhook', {
        webhookURL,
      });
      setIsEdit(!isEdit);
    }
  };

  const handleWebhookEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Insert Product URL</Form.Label>
            <Form.Control as="textarea" row={1} {...bindSiteValue} placeholder="Enter product URL" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Select delimiter format</Form.Label>
            <Form.Control {...bindDelimiterValue} as="select">
              <option value=":">:</option>
              <option value=";">;</option>
              <option value="-">-</option>
            </Form.Control>
          </Form.Group>
          {!isLoggedIn ? (
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Insert Webhook</Form.Label>
              <Form.Control as="textarea" row={1} {...bindWebhookValue} placeholder="Register an account to save!" />
            </Form.Group>
          )
            : ''}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </StyledForm>
      </FormContainer>
      <TableContainer>
        {isLoggedIn
          ? (
            <WebhookTable
              isEdit={isEdit}
              handleWebhookEdit={handleWebhookEdit}
              handleWebhookSave={handleWebhookSave}
              setWebhookField={setWebhookField}
              webhookField={webhookField}
            />
          )
          : ''}
      </TableContainer>
      <AlertContainer>
        <AlertStyle show={showAlert} variant="danger" transition>
          <Alert.Heading>
            <p>
              Please enter a valid URL
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showVariantAlert} variant="danger" transition>
          <Alert.Heading>
            <p>
              No Variants Found
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showWebhookAlert} variant="danger" transition>
          <Alert.Heading>
            <p>
              Invalid Webhook URL
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default Home;
