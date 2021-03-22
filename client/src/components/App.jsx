/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import useInput from '../hooks/useInput';
import scraper from '../../../modules/scraper';

const axios = require('axios');

const SERVER = process.env.SERVER || 'localhost';
const PORT = process.env.PORT || 3000;

const App = () => {
  const { value: siteValue, bind: bindSiteValue, reset: resetSiteValue } = useInput('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');
  const { value: webhookValue, bind: bindWebhookValue } = useInput('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [webhookField, setWebhookField] = useState('');

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
          data.data, webhookValue,
          domain, handle, productLink,
          delimiterValue,
        ))
        .catch((err) => console.log(err));
      resetSiteValue();
      resetDelimiterValue();
    }
  };
  useEffect(() => {
    axios(`http://${SERVER}:${PORT}/isLoggedIn`)
      .then((response) => {
        if (response.data) {
          setIsLoggedIn(true);
          axios(`http://${SERVER}:${PORT}/getWebhook`)
            .then((data) => {
              setWebhookField(data.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleWebhookSave = () => {
    const webhookURL = webhookValue;
    axios.post(`http://${SERVER}:${PORT}/saveWebhook`, {
      webhookURL,
    });
  };

  const handleWebhookQuery = () => {

  }
  return (
    <>
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
        <input type="submit" value="Submit" />
      </form>
      <form onSubmit={handleWebhookSave} id="webhook_form">
        <div className="container">
          <div className="form-group" id="webhook_form">
            <div className="row">
              <div className="col">
                <label htmlFor="webhook_url">
                  <input type="text" {...bindWebhookValue} id="webhook_url" className="form-control" rows="1" value={webhookField} />
                </label>
                <button type="button" disabled={!isLoggedIn} onClick={() => handleWebhookSave()}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col">
          <a href="/logout">Logout</a>
        </div>
        <div className="col">
          <a href="/login">Login</a>
        </div>
        <h1>
          Is
          {isLoggedIn === false ? ' NOT logged in' : ' logged in'}
          {' '}
        </h1>
      </div>
    </>
  );
};

export default App;
