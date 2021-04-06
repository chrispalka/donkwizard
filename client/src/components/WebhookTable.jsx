/* eslint-disable react/prop-types */
import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

const WebhookTable = ({
  isEdit,
  handleWebhookEdit,
  handleWebhookSave,
  webhookField,
  setWebhookField,
}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>My Webhooks</th>
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
          {!isEdit ? (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => handleWebhookEdit()}
            />
          )
            : ''}
          {isEdit ? (
            <FontAwesomeIcon
              icon={faSave}
              onClick={() => handleWebhookSave()}
            />
          )
            : ''}
        </td>
      </tr>
    </tbody>
  </Table>
);

export default WebhookTable;
