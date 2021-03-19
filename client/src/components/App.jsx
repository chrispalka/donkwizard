/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import useInput from '../hooks/useInput';
import scraper from '../../../modules/scaper';

const axios = require('axios');

const App = () => {
  const { value: siteValue, bind: bindSiteValue, reset: resetSiteValue } = useInput('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const productLink = siteValue;
    const valueArray = siteValue.split('/');
    const domain = valueArray[2];
    const handle = valueArray[valueArray.length - 1];
    const url = `https://${domain}/products.json`;
    if (domain !== undefined) {
      axios(url)
        .then((data) => scraper(data.data, domain, handle, productLink, delimiterValue))
        .catch((err) => console.log(err));
      resetSiteValue();
      resetDelimiterValue();
    }
  };
  return (
    <form onSubmit={handleSubmit} id="myForm">
      <div className="container">
        <div className="form-group" id="myForm">
          <div className="row">
            <div className="col">
              <label htmlFor="site-url">
                Insert product URL
                <input type="text" {...bindSiteValue} className="form-control" id="site-url" rows="1" placeholder="Paste product URL here" />
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
  );
};

export default App;
