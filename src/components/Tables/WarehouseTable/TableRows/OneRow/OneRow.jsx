import React, { useEffect, useState } from 'react';
import TableRow from '@mui/material/TableRow';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import TableCell from '@mui/material/TableCell';


import { PRODUCT_WAREHOUSE_QUANTITY } from '../../../consts';

import Relations from '../../../TableRelations';

import '../../../TableStyles/TableRows/OneRow/OneRow.scss';


const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const OneRow = ({ row, deleteFunc, editItem }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const currentStore = relations.getRelationListFromLocalStorage().filter((item) => item.storeId === row.id);
    const usedQuantity = currentStore.reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    setQuantity(usedQuantity);
  }, [row.quantity]);

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
      <TableCell align="right">{quantity}</TableCell>
      <TableCell align="right">{row?.address ?? ''}</TableCell>
      <TableCell align="right">{row?.width ?? ''}</TableCell>
      <TableCell align="right">{row?.height ?? ''}</TableCell>
      <TableCell align="right">{row?.length ?? ''}</TableCell>
      <TableCell className="button-group" align="right">
        <div className={`button-cell ${showButtons && 'shown'}`}>
          <MDBBtn
            onClick={() => editItem(true, row)}
            outline
            color="success"
          >
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
