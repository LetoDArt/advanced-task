import React from 'react';
import TableBody from '@mui/material/TableBody';

import OneRow from './OneRow/OneRow';

import './TableRows.scss';


const TableRows = ({ rows }) => (
  <TableBody>
    {rows.map((row) => (
      <OneRow key={row.id} row={row} />
    ))}
  </TableBody>
);

export default TableRows;
