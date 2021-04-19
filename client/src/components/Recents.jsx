import React from 'react';
import { Table } from 'react-bootstrap';

const Recents = ({ recents, handleChange }) => (
  <>
    <Table striped bordered>
      <thead>
        <tr>
          <th>Recents</th>
        </tr>
      </thead>
      <tbody>
        {recents.map((recent, i) => (
          <tr key={i}>
            <td title={recent} id={recent} style={{ cursor: 'pointer' }} onClick={(e) => handleChange(e)}>
              {recent.slice(0, 110)}...
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export default Recents;