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
import domScraper from '../../../modules/domScraper';
import {
  WebhookTable, Recents, ProductInfo
} from '../layout/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboard,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

const FormContainer = styled(Container)`
  margin-top: 2em;
`;

const StyledForm = styled(Form)`
  .select-form {
    width: 5%;
    margin-bottom: 1.5em;
  }
  .form-label {
    color: #cfdbd5;
    font-family: 'Roboto';
  }
`;

const VariantContainer = styled(Container)`
  margin-bottom: 75px;
  padding-left: 0;
  .variant-box {
    border-radius: 5px;
    width: 100%;
    background-color: #cfdbd5;
  }
  .variant-title {
    color: #cfdbd5;
    font-family: 'Roboto';
    display: block;
    margin-top: 1em;
  }
`
const VariantProductInfoWrapper = styled(Container)`
  display: flex;
`;

const AlertContainer = styled(Container)`
  margin-bottom: 5em;
  `;

const MessageContainer = styled(Container)`
  padding-left: 1.8em;
  padding-right: 1.8em;
  position: fixed;
  width: inherit;
  left: 0;
  right: 0;
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const WebhookTableContainer = styled(Container)`
  padding: 0;
  margin-top: 1em;
  font-family: 'Roboto';
  margin-bottom: 35px;
  .svg-inline--fa {
    margin-right: 0.5em;
  }
  .table {
    color: #cfdbd5;
  }
  .table > tbody > tr > td {
    word-wrap: break-word;
    min-width: 160px;
    max-width: 160px;
    white-space: normal;
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
    td:hover {
      background-color: #f5cb5c;
      color: black;
    }
  }
`;

const ProductTableContainer = styled(Container)`
padding-right: 0;
padding-left: 3em;
  .table {
    color: #cfdbd5;
  }
  .table th, .table td {
    border: none;
  }
  .product-title {
    padding-left: 12px;
    color: #cfdbd5;
    font-family: 'Roboto';
    display: block;
    margin-top: 2.6em;
  }
`;

const Home = ({ isLoggedIn }) => {
  const [siteValue, setSiteValue] = useState('');
  const { value: delimiterValue, bind: bindDelimiterValue, reset: resetDelimiterValue } = useInput('');
  const { value: webhookValue, bind: bindWebhookValue } = useInput('');
  const [isEdit, setIsEdit] = useState(false);
  const [webhookField, setWebhookField] = useState('');
  const [recentsArray, setRecentsArray] = useState([]);
  const [showUrlAlert, setShowUrlAlert] = useState(false);
  const [showVariantAlert, setShowVariantAlert] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  const [showWebhookAlert, setShowWebhookAlert] = useState(false);
  const [showWebhookSuccessAlert, setWebhookSuccessAlert] = useState(false);
  const [showWebhookSubmitSuccessAlert, setWebhookSubmitSuccessAlert] = useState(false);
  const [showWebhookDeleteSuccessAlert, setShowWebhookDeleteSuccessAlert] = useState(false);
  const [variantBox, setVariantBox] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (isLoggedIn) {
      axios('/getWebhook')
        .then((webhookData) => {
          setWebhookField(webhookData.data);
        })
        .then(() => handleGetRecent())
        .catch((err) => console.log(err));
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (siteValue.length === 0) {
      setShowUrlAlert(true);
      setTimeout(() => setShowUrlAlert(false), 2000);
    } else if (
      (webhookValue.length !== 120 && webhookField.length !== 120)
      &&
      (webhookValue.length !== 0 && webhookField.length !== 0)
    ) {
      setShowWebhookAlert(true);
      setTimeout(() => setShowWebhookAlert(false), 2000);
    } else {
      setIsLoading(true);
      const productLink = siteValue
      const valueArray = siteValue.split('/');
      const domain = valueArray[2];
      const handle = valueArray[valueArray.length - 1]
      const url = `https://${domain}/products.json`;
      if (domain !== undefined) {
        handleScrape(url, domain, handle, productLink)
      } else {
        setShowUrlAlert(true);
        setTimeout(() => setShowUrlAlert(false), 2000);
      }
    }
  };

  const handleGetRecent = () => {
    axios('/getRecent')
      .then((recentData) => {
        if (recentData.data.length !== 0) {
          setRecentsArray([...recentData.data])
        }
      })
      .catch((err) => console.log(err));
  }

  const handleScrape = (url, domain, handle, productLink) => {
    axios(url)
      .then((data) => scraper(
        data.data, !isLoggedIn ? webhookValue : webhookField,
        domain, handle, productLink,
        delimiterValue,
      ))
      .then((scraperResponse) => {
        if (!scraperResponse) {
          axios(productLink)
            .then((productLinkData) => domScraper(
              productLinkData.data, !isLoggedIn ? webhookValue : webhookField,
              domain, productLink,
              delimiterValue,
            ))
            .then((scraperResponse) => {
              if (!scraperResponse) {
                setShowVariantAlert(true);
                setTimeout(() => setShowVariantAlert(false), 2000);
                resetDelimiterValue();
              } else {
                setProductImage(scraperResponse.productImage);
                setProductTitle(scraperResponse.productTitle);
                setProductPrice(`Price: \$${scraperResponse.productPrice}`);
                setVariantBox(scraperResponse.variants)
                if (isLoggedIn) {
                  handleRecentSave();
                }
                setWebhookSubmitSuccessAlert(true)
                setTimeout(() => setWebhookSubmitSuccessAlert(false), 2000);
                setIsLoading(false);
              }
            })
        } else {
          setProductImage(scraperResponse.productImage);
          setProductTitle(scraperResponse.productTitle);
          setProductPrice(`Price: \$${scraperResponse.productPrice}`);
          setVariantBox(scraperResponse.variants)
          if (isLoggedIn) {
            handleRecentSave();
          }
          setWebhookSubmitSuccessAlert(true)
          setTimeout(() => setWebhookSubmitSuccessAlert(false), 2000);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }

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
    handleGetRecent()
  }

  const handleSiteValue = (e) => {
    setSiteValue(e.target.value.replace(/\?.+/, ''));
  }
  const handleRecentChange = (e) => {
    setSiteValue(e.target.id)
    document.getElementById('ControlTextarea1').innerText = e.target.id;
  }

  const handleCopy = (variantBox) => {
    setShowCopiedAlert(true)
    setTimeout(() => setShowCopiedAlert(false), 2000);
    navigator.clipboard.writeText(variantBox)
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
      <AlertContainer>
        <MessageContainer>
          <AlertStyle show={showUrlAlert} variant="danger" transition>
            <Alert.Heading>
              <p>
                Please enter a valid URL
            </p>
            </Alert.Heading>
          </AlertStyle>
          <AlertStyle show={showCopiedAlert} variant="success" transition>
            <Alert.Heading>
              <p>
                Copied!
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
        </MessageContainer>
      </AlertContainer>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Form.Group controlId="ControlTextarea1">
            <Form.Label>Insert Product URL</Form.Label>
            <Form.Control as="textarea" row={1} onChange={handleSiteValue} value={siteValue} placeholder="Enter product URL" />
          </Form.Group>
          {isLoggedIn && recentsArray.length !== 0
            ? (
              <RecentsTableContainer>
                <Recents
                  recents={recentsArray}
                  handleChange={handleRecentChange}
                />
              </RecentsTableContainer>

            )
            : ''}
          <Form.Group controlId="ControlSelect2" className="delimeter-box">
            <Form.Label>Select delimiter format</Form.Label>
            <Form.Control {...bindDelimiterValue} as="select" className="select-form">
              <option value=":">:</option>
              <option value=";">;</option>
              <option value="-">-</option>
            </Form.Control>
            {!isLoggedIn ? (
              <Form.Group controlId="eControlTextarea1">
                <Form.Label>Insert Webhook</Form.Label>
                <Form.Control as="textarea" row={1} {...bindWebhookValue} placeholder="Register an account to save!" />
              </Form.Group>
            )
              :
              <WebhookTableContainer>
                <WebhookTable
                  isEdit={isEdit}
                  handleWebhookEdit={handleWebhookEdit}
                  handleWebhookSave={handleWebhookSave}
                  handleWebhookDelete={handleWebhookDelete}
                  setWebhookField={setWebhookField}
                  webhookField={webhookField}
                />
              </WebhookTableContainer>
            }
            <Button variant="warning" type="submit">
              {!isLoading ? (
                'Submit'
              ) : <FontAwesomeIcon
                className="fa-spin"
                icon={faCircleNotch}
              />}
            </Button>
          </Form.Group>
        </StyledForm>
      </FormContainer>
      <VariantProductInfoWrapper>
        <VariantContainer>
          <label className="variant-title">Variants</label>
          <textarea className="variant-box" rows="12" disabled defaultValue={variantBox} />
          <FontAwesomeIcon
            icon={faClipboard}
            style={{ color: '#f5cb5c', cursor: 'pointer', display: 'block' }}
            onClick={() => handleCopy(variantBox)}
          />
        </VariantContainer>
        <ProductTableContainer>
          <label className="product-title">{productTitle}</label>
          <ProductInfo
            productImage={productImage}
            productPrice={productPrice}
          />
        </ProductTableContainer>
      </VariantProductInfoWrapper>
    </>
  );
};

export default Home;
