/* eslint-disable react/prop-types */
import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faSave,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';


const WebhookTable = ({
  isEdit,
  handleWebhookEdit,
  handleWebhookSave,
  handleWebhookDelete,
  webhookField,
  setWebhookField,
}) => (
  <>
    <Table striped bordered>
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
        </tr>
      </tbody>
    </Table>
    <>
      {webhookField === '' ? (
        <FontAwesomeIcon
          icon={faPlus}
          style={{ color: '#f5cb5c', cursor: 'pointer' }}
          onClick={() => handleWebhookEdit()}
        />
      ) :
        <>
          {!isEdit ? (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                style={{ color: '#f5cb5c', cursor: 'pointer'  }}
                onClick={() => handleWebhookEdit()}
              />
              <FontAwesomeIcon
                icon={faTrash}
                style={{ color: '#f5cb5c', cursor: 'pointer' }}
                onClick={() => handleWebhookDelete()}
              />
            </>
          )
            : ''}
          {isEdit ? (
            <FontAwesomeIcon
              icon={faSave}
              style={{ color: '#f5cb5c', cursor: 'pointer' }}
              onClick={() => handleWebhookSave()}
            />
          )
            : ''}
        </>
      }
    </>
  </>
);

export default WebhookTable;
