/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import {
  Form, Button, Container, Table,
} from 'react-bootstrap';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import scraper from '../../../modules/scraper';

const axios = require('axios');

const FormContainer = styled(Container)`
`;

const StyledForm = styled(Form)`
`;

const TableContainer = styled(Container)`
`;

const Home = ({ isLoggedIn }) => {
  const { value: siteValue, bind: bindSiteValue, reset: resetSiteValue } = useInput('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');
  const { value: webhookValue, bind: bindWebhookValue } = useInput('');
  const [isEdit, setIsEdit] = useState(false);
  const [webhookField, setWebhookField] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      axios('/getWebhook')
        .then((data) => {
          setWebhookField(data.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        .catch((err) => console.log(err));
      resetSiteValue();
      resetDelimiterValue();
    }
  };
  const handleWebhookSave = () => {
    const webhookURL = webhookField;
    axios.post('saveWebhook', {
      webhookURL,
    });
    setIsEdit(!isEdit);
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
              <Form.Control as="textarea" row={1} {...bindWebhookValue} placeholder="Login to save!" />
            </Form.Group>
          )
            : ''}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </StyledForm>
      </FormContainer>
      <TableContainer>
        {!isLoggedIn ? (
          <h1>To save your webhook please login!</h1>
        )
          : ''}
        {isLoggedIn
          ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Webhook</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {isEdit ? (
                      <input
                        style={{ width: '100%' }}
                        value={webhookField}
                        onChange={(e) => setWebhookField(e.target.value)}
                      />
                    )
                      : webhookField}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleWebhookEdit()}
                    />
                    <FontAwesomeIcon
                      icon={faSave}
                      onClick={() => handleWebhookSave()}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          )
          : ''}
      </TableContainer>
    </>
  );
};

export default Home;
