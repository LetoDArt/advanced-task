import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';

import '../../TableStyles/TableHeader/TableHeader.scss';


const TableHeader = ({ header }) => (
  <TableHead>
    <TableRow>
      {header && header.map((cell) => (
        <TableCell key={cell.id} align={cell.align}>{cell.text}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeader;
