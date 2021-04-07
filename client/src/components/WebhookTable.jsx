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
        </tr>
      </tbody>
    </Table>
    <>
      {webhookField === '' ? (
        <FontAwesomeIcon
          icon={faPlus}
          onClick={() => handleWebhookEdit()}
        />
      ) :
        <>
          {!isEdit ? (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => handleWebhookEdit()}
              />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleWebhookDelete()}
              />
            </>
          )
            : ''}
          {isEdit ? (
            <FontAwesomeIcon
              icon={faSave}
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
