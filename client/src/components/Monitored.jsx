import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const Monitored = ({
  monitors,
  startMonitor,
  stopMonitor,
  monitorDelete,
}) => {

  return (
    <>
      <Table striped>
        {console.log('monitors: ', monitors)}
        <tbody>
          {monitors.map((monitor, i) => (
            <tr key={i} >
              <td title={monitor.product} id={monitor.id}>
                {monitor.product}
              </td>
              <td>
                {monitor.run ? (
                  <FontAwesomeIcon
                    className="fa-spin"
                    icon={faCog}
                  />
                ) : ''}
              </td>
              <td>
                {monitor.run ? (
                  <Button variant="danger" id={monitor.product} onClick={(e) => stopMonitor(e)}>
                    Stop
                  </Button>
                ) :
                  <Button variant="warning" id={monitor.product} onClick={(e) => startMonitor(e)}>
                    Start
                  </Button>
                }
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: '#f5cb5c', cursor: 'pointer' }}
                  onClick={() => monitorDelete(monitor.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Monitored;