import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const iconColor = 'red';

const FooterContainer = styled(Container)`
  position: fixed;
  left: 0;
  bottom: 0;
  margin-bottom: 3em;
  width: 100%;
  max-width: 100%;
  text-align: center;
  font-family: 'Roboto';
  a {
    color: #cfdbd5;
    text-decoration: none;
  }
  h1 {
    font-size: 18px;
  }
  li {
    display: inline;
    padding: 1em;
  }
`;

const Footer = ({ links }) => (
  <FooterContainer>
    <ul>
      {links.map((link) => (
        <li>
          <a href={link.path} target="_blank" rel="noreferrer noopener">
            <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={link.icon} />
          </a>
        </li>
      ))}

    </ul>
  </FooterContainer>
)

export default Footer;
