import React from 'react';
import TableBody from '@mui/material/TableBody';

import OneRow from './OneRow/OneRow';

import './TableRows.scss';


const TableRows = ({ rows, deleteFunc }) => (
  <TableBody>
    {rows && rows.map((row) => (
      <OneRow key={row.id} row={row} deleteFunc={deleteFunc} />
    ))}
  </TableBody>
);

export default TableRows;
