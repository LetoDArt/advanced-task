import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import TableCell from '@mui/material/TableCell';

import './OneRow.scss';


const OneRow = ({ row }) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <TableRow
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      key={row.id}
      className="table-row"
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.calories}</TableCell>
      <TableCell align="right">{row.fat}</TableCell>
      <TableCell align="right">{row.carbs}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
      <TableCell align="right">{row.protein}</TableCell>
      <TableCell className="button-group" align="right">
        <div className={`button-cell ${showButtons && 'shown'}`}>
          <MDBBtn outline color="success">
            <MDBIcon size="2x" fas icon="edit" />
          </MDBBtn>
          <MDBBtn outline color="danger">
            <MDBIcon size="2x" fas icon="trash-alt" />
          </MDBBtn>
        </div>

      </TableCell>

    </TableRow>
  );
};

export default OneRow;
