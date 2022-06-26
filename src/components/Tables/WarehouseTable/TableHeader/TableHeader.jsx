import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';

import '../../TableStyles/TableHeader/TableHeader.scss';


const TableHeader = () => {
  console.log('tableHead');
  return (
    <TableHead>
      <TableRow>
        <TableCell>Warehouse</TableCell>
        <TableCell align="right">Total products</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">Width, m</TableCell>
        <TableCell align="right">Height, m</TableCell>
        <TableCell align="right">Length, m</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
