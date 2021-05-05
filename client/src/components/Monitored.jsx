import React from 'react';
import { Table, Button } from 'react-bootstrap';

const Monitored = ({
  monitors,
  startMonitor,
  stopMonitor
}) => (
  <>
    <Table striped>
      <tbody>
        {monitors.map((monitor, i) => (
          <tr key={i}>
            <td title={monitor} id={monitor}>
              {monitor}
            </td>
            <td>
              <Button variant="warning" id={monitor} onClick={(e) => startMonitor(e)}>
                Start
              </Button>
            </td>
            <td>
              <Button variant="danger" id={monitor} onClick={(e) => stopMonitor(e)}>
                Stop
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </>
);

export default Monitored;