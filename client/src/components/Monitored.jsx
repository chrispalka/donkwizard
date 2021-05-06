import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog
} from '@fortawesome/free-solid-svg-icons';

const Monitored = ({
  monitors,
  startMonitor,
  stopMonitor,
}) => {

  return (
    <>
      <Table striped>
        <tbody>
          {monitors.map((monitor, i) => (
            <tr key={i}>
              <td title={monitor.product} id={monitor.id}>
                {monitor.product}
              </td>
              <td>
                {monitor.run ? (
                  <FontAwesomeIcon
                    className="fa-spin"
                    icon={faCog}
                  />
                ): ''}
              </td>
              <td>
                <Button variant="warning" id={monitor.product} onClick={
                  (e) => {
                    startMonitor(e);
                  }
                }>
                  Start
              </Button>
              </td>
              <td>
                <Button variant="danger" id={monitor.product} onClick={
                  (e) => {
                    stopMonitor(e);
                  }
                }>
                  Stop
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Monitored;