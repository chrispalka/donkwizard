import React, { useState, useEffect } from 'react';
import {
  Form, Button, Container,
} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import monitorScraper from '../../../modules/monitorScraper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import {
  Monitored
} from '../layout/index';

const axios = require('axios');

const MonitorContainer = styled(Container)`
  margin-top: 2em;
  .form-control {
    margin-bottom: 1em;
  }
`
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

const MonitorTableContainer = styled(Container)`
  margin-top: 1em;
  margin-bottom: 3em;
  padding: 0;
  font-family: 'Roboto';
  .svg-inline--fa {
    margin-right: 0.5em;
  }
  .table {
    color: black;
    background-color: #cfdbd5;
  }
  .table th, .table td {
    border-top: none;
  }
  span {
    padding-left: 0.4em;
    color: #cfdbd5;
    display: table;
    margin: auto;
    margin-bottom: 1em;
  }
  h1 {
    font-family: 'Roboto';
    color: #cfdbd5;
    font-size: 18px;
    display: table;
    margin: auto;
  }
`;

const AlertStyle = styled(Alert)`
  p {
    font-size: 18px;
    text-align: center;
    margin-bottom: 0;
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: #cfdbd5;
    font-family: 'Roboto';
  }
`;


const Monitor = () => {
  const [productValue, setProductValue] = useState('');
  const [showUrlAlert, setShowUrlAlert] = useState(false);
  const [showProductPresentAlert, setShowProductPresentAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [monitorArray, setMonitorArray] = useState([]);


  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleGetMonitors();
    }
    return () => { isMounted = false };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let monitorCheck = false;
    monitorArray.flat().forEach((x) => {
      if (x.product === productValue) {
        monitorCheck = true;
      }
    });
    if (productValue.length === 0) {
      setShowUrlAlert(true);
      setTimeout(() => setShowUrlAlert(false), 2000);
    } else if (!monitorCheck) {
      const valueArray = productValue.split('/');
      const handle = valueArray[valueArray.length - 1]
      const domain = valueArray[2]
      if (domain !== undefined) {
        setIsLoading(true);
        handleScrape(productValue, handle);
      } else {
        setShowUrlAlert(true);
        setTimeout(() => setShowUrlAlert(false), 2000);
      }
    } else {
      setShowProductPresentAlert(true);
      setTimeout(() => setShowProductPresentAlert(false), 2000);
    }
  };

  /*
https://kith.com/collections/mens-footwear/products/ai1201a115-001
https://kith.com/collections/mens-footwear/products/y3s42846
  */

  const handleGetMonitors = () => {
    let array = [];
    axios('/getMonitors')
    .then((monitorData) => {
      monitorData.data.forEach((item) => {
        array.push(item)
      })
      setMonitorArray([...array]);
    })
    .catch((err) => console.log(err));
  };


  const handleMonitorSave = () => {
    let monitorCheck = false;
    monitorArray.flat().forEach((x) => {
      if (x.product === productValue) {
        monitorCheck = true;
      }
    })
    if (!monitorCheck) {
      axios.post('/addMonitor', {
        productValue,
      })
        .then(() => {
          handleGetMonitors()
      })
        .catch((err) => console.log(err))
    } else {
      setShowProductPresentAlert(true);
      setTimeout(() => setShowProductPresentAlert(false), 2000);
    }
  };

  const handleMonitorDelete = (product) => {
    axios.put('/deleteMonitor', {
      product
    }).then(() => {
      handleGetMonitors();
    })
    .catch((err) => console.log(err));
  }

  const handleStartMonitor = (e) => {
    const product = e.target.id
    const run = true;
    axios.put('/changeMonitor', {
      product,
      run,
    }).then(() => {
      handleGetMonitors();
    })
      .catch((err) => console.log(err))
  };
  const handleStopMonitor = (e) => {
    const product = e.target.id
    const run = false;
    axios.put('/changeMonitor', {
      product,
      run,
    }).then(() => {
      handleGetMonitors();
    })
      .catch((err) => console.log(err))
  };


  const handleScrape = (productValue, handle) => {
    axios(productValue)
      .then((data) => monitorScraper(data.data, handle))
      .then((response) => {
        if (!response) {
          setIsLoading(false);
          setShowUrlAlert(true);
          setTimeout(() => setShowUrlAlert(false), 2000);
        } else {
          handleMonitorSave();
          setIsLoading(false);
          setProductValue('');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowUrlAlert(true);
        setTimeout(() => setShowUrlAlert(false), 2000);
        if (err.response.status === 404) {
          setIsLoading(false);
          setShowUrlAlert(true);
          setTimeout(() => setShowUrlAlert(false), 2000);
        }
      });
  }

  const handleProductValue = (e) => {
    setProductValue(e.target.value.replace(/\?.+/, '').trim());
  }
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
          <AlertStyle show={showProductPresentAlert} variant="danger" transition>
            <Alert.Heading>
              <p>
                Product already monitored
            </p>
            </Alert.Heading>
          </AlertStyle>
        </MessageContainer>
      </AlertContainer>
      <MonitorContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Insert Product URL</Form.Label>
            <Form.Control as="textarea" row={1} onChange={handleProductValue} value={productValue} placeholder="Enter product URL" />
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
        <MonitorTableContainer>
          <Monitored
            monitors={monitorArray.flat().sort()}
            startMonitor={handleStartMonitor}
            stopMonitor={handleStopMonitor}
            monitorDelete={handleMonitorDelete}
          />
        </MonitorTableContainer>
      </MonitorContainer>
    </>
  )
}

export default Monitor;