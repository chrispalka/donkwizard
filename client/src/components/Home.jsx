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
  WebhookTable, Recents,
} from '../layout/index';

const axios = require('axios');

const FormContainer = styled(Container)`
  margin-top: 2em;
`;

const StyledForm = styled(Form)`
  .select-form {
    width: 5%;
  }
  .variant-box {
    width: 25%;
  }
  .variant-title {
    margin-top: 1em;
  }
  .form-label {
    color: #cfdbd5;
    font-family: 'Roboto';
  }
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

const WebhookTableContainer = styled(Container)`
  margin-top: 1em;
  font-family: 'Roboto';
  .svg-inline--fa {
    margin-right: 0.5em;
  }
  .table {
    color: #cfdbd5;
  }
`;

const RecentsTableContainer = styled(Container)`
  margin-top: 1em;
  padding: 0;
  font-family: 'Roboto';
  .svg-inline--fa {
    margin-right: 0.5em;
  }
  .table {
    color: #cfdbd5;
  }
`;

const Home = ({ isLoggedIn }) => {
  const { value: siteValue, bind: bindSiteValue, reset: resetSiteValue } = useInput('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');
  const { value: webhookValue, bind: bindWebhookValue } = useInput('');
  const [isEdit, setIsEdit] = useState(false);
  const [webhookField, setWebhookField] = useState('');
  const [recentsArray, setRecentsArray] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showVariantAlert, setShowVariantAlert] = useState(false);
  const [showWebhookAlert, setShowWebhookAlert] = useState(false);
  const [showWebhookSuccessAlert, setWebhookSuccessAlert] = useState(false);
  const [showWebhookSubmitSuccessAlert, setWebhookSubmitSuccessAlert] = useState(false);
  const [showWebhookDeleteSuccessAlert, setShowWebhookDeleteSuccessAlert] = useState(false);
  const [variantBox, setVariantBox] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      axios('/getWebhook')
        .then((webhookData) => {
          setWebhookField(webhookData.data);
        })
        .catch((err) => console.log(err));
      axios('/getRecent')
      .then((recentData) => {
        if (recentData.data.length !== 0) {
          setRecentsArray(recentsArray => [...recentsArray, recentData.data])
        }
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (siteValue.length === 0) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
      console.log(webhookValue.length)
    } else if (webhookValue.length !== 120 && webhookField.length !== 120) {
      setShowWebhookAlert(true);
      setTimeout(() => setShowWebhookAlert(false), 2000);
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
              resetSiteValue();
              resetDelimiterValue();
            } else {
              setVariantBox(response)
              handleRecentSave();
              setWebhookSubmitSuccessAlert(true)
              setTimeout(() => setWebhookSubmitSuccessAlert(false), 2000);
            }
          })
          .catch((err) => console.log(err));
      }
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
      })
      .catch((err) => console.log(err));
      setWebhookSuccessAlert(true)
      setTimeout(() => setWebhookSuccessAlert(false), 2000);
      setIsEdit(!isEdit);
    }
  };

  const handleRecentSave = () => {
    axios.post('/saveRecent', {
      siteValue,
    })
    .catch((err) => console.log(err));
  }


  const handleWebhookEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleWebhookDelete = () => {
    axios.put('/deleteWebhook')
      .then((response) => {
        if (response.data === 'Success') {
          setWebhookField('')
          setShowWebhookDeleteSuccessAlert(true)
          setTimeout(() => setShowWebhookDeleteSuccessAlert(false), 2000);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Insert Product URL</Form.Label>
            <Form.Control as="textarea" row={1} {...bindSiteValue} placeholder="Enter product URL" />
          </Form.Group>
          {isLoggedIn && recentsArray.length !== 0
            ? (
              <RecentsTableContainer>
                <Recents recents={recentsArray}
                />
              </RecentsTableContainer>

            )
            : ''}
          <Form.Group controlId="ControlSelect2">
            <Form.Label>Select delimiter format</Form.Label>
            <Form.Control {...bindDelimiterValue} as="select" className="select-form">
              <option value=":">:</option>
              <option value=";">;</option>
              <option value="-">-</option>
            </Form.Control>
            <Form.Label className="variant-title">Variants</Form.Label>
            <Form.Control as="textarea" className="variant-box" rows="12" defaultValue={variantBox}>

            </Form.Control>
          </Form.Group>
          {!isLoggedIn ? (
            <Form.Group controlId="eControlTextarea1">
              <Form.Label>Insert Webhook</Form.Label>
              <Form.Control as="textarea" row={1} {...bindWebhookValue} placeholder="Register an account to save!" />
            </Form.Group>
          )
            : ''}
          <Button variant="warning" type="submit">
            Submit
          </Button>
        </StyledForm>
      </FormContainer>
      <WebhookTableContainer>
        {isLoggedIn
          ? (
            <WebhookTable
              isEdit={isEdit}
              handleWebhookEdit={handleWebhookEdit}
              handleWebhookSave={handleWebhookSave}
              handleWebhookDelete={handleWebhookDelete}
              setWebhookField={setWebhookField}
              webhookField={webhookField}
            />
          )
          : ''}
      </WebhookTableContainer>
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
        <AlertStyle show={showWebhookSuccessAlert} variant="success" transition>
          <Alert.Heading>
            <p>
              Webhook Saved
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showWebhookSubmitSuccessAlert} variant="success" transition>
          <Alert.Heading>
            <p>
              Webhook sent!
            </p>
          </Alert.Heading>
        </AlertStyle>
        <AlertStyle show={showWebhookDeleteSuccessAlert} variant="success" transition>
          <Alert.Heading>
            <p>
              Webhook Deleted
            </p>
          </Alert.Heading>
        </AlertStyle>
      </AlertContainer>
    </>
  );
};

export default Home;
