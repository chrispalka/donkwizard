/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import scraper from '../../../modules/scraper';

const axios = require('axios');

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
    <form onSubmit={handleSubmit} id="variant_form">
      <div className="container">
        <div className="form-group" id="variant_form">
          <div className="row">
            <div className="col">
              <label htmlFor="site_url">
                Insert product URL
                <input type="text" {...bindSiteValue} className="form-control" id="site_url" rows="1" placeholder="Paste product URL here" />
              </label>
              <label htmlFor="delimiter">
                Select delimiter format
                <select {...bindDelimiterValue}>
                  <option value=":">:</option>
                  <option value=";">;</option>
                  <option value="-">-</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="form-group" id="webhook_form">
          <div className="row">
            <div className="col">
              <label htmlFor="webhook_url">
                {!isLoggedIn ? (
                  <input type="text" {...bindWebhookValue} id="webhook_url" className="form-control" rows="1" />
                )
                  : ''}
              </label>
              <input type="submit" value="Submit" />
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
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Home;
