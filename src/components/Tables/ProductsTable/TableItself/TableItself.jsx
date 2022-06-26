import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

import TableHeader from '../TableHeader/TableHeader';
import TableRows from '../TableRows/TableRows';

import '../../TableStyles/TableItself/TableItself.scss';


const TableItself = ({ rows, deleteFunc }) => {
  console.log('ff');
  return (
    <TableContainer className="table-itself-container" component={Paper}>
      <Table stickyHeader sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHeader />
        <TableRows rows={rows} deleteFunc={deleteFunc} />
      </Table>
    </TableContainer>
  );
};

export default TableItself;
