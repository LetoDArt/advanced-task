import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import TableCell from '@mui/material/TableCell';

import '../../../TableStyles/TableRows/OneRow/OneRow.scss';


const OneRow = ({ row, deleteFunc }) => {
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
        {row?.name ?? ''}
      </TableCell>
      <TableCell align="right">{row?.num ?? ''}</TableCell>
      <TableCell align="right">{row?.quantity ?? ''}</TableCell>
      <TableCell align="right">{row?.nonUsedQuantity ?? ''}</TableCell>
      <TableCell align="right">{row?.weight ?? ''}</TableCell>
      <TableCell align="right">{row?.height ?? ''}</TableCell>
      <TableCell align="right">{row?.width ?? ''}</TableCell>
      <TableCell align="right">{row?.length ?? ''}</TableCell>
      <TableCell align="right">{row?.color ?? ''}</TableCell>
      <TableCell className="button-group" align="right">
        <div className={`button-cell ${showButtons && 'shown'}`}>
          <MDBBtn outline color="success">
            <MDBIcon size="2x" fas icon="edit" />
          </MDBBtn>
          <MDBBtn
            onClick={() => deleteFunc(row)}
            outline
            color="danger"
          >
            <MDBIcon size="2x" fas icon="trash-alt" />
          </MDBBtn>
        </div>

      </TableCell>

    </TableRow>
  );
};

export default OneRow;
