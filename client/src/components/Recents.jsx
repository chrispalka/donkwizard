import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Table } from 'react-bootstrap';

const Recents = ({ recents, handleChange, showRecents }) => (
  <>
    <Table striped>
      <CSSTransition
        in={showRecents}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <tbody>
          {recents.map((recent, i) => (
            <tr key={i}>
              <td title={recent} id={recent} style={{ cursor: 'pointer' }} onClick={(e) => handleChange(e)}>
                {recent.slice(0, 110)}...
            </td>
            </tr>
          ))}
        </tbody>
      </CSSTransition>
    </Table>
  </>
);

export default Recents;