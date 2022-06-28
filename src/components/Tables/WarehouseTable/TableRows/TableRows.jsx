import React from 'react';
import TableBody from '@mui/material/TableBody';

import OneRow from './OneRow/OneRow';

import '../../TableStyles/TableRows/TableRows.scss';


const TableRows = ({ rows, deleteFunc, editItem }) => (
  <TableBody>
    {rows && rows.map((row) => (
      <OneRow key={row.id} row={row} deleteFunc={deleteFunc} editItem={editItem} />
    ))}
  </TableBody>
);

export default TableRows;
