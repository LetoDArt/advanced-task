import React from 'react';
import TableBody from '@mui/material/TableBody';

import ProductRow from './Rows/ProductRow';
import WarehouseRow from './Rows/WarehouseRow';

import { PRODUCT_TABLE_ID, WAREHOUSE_TABLE_ID } from '../../consts';

import '../../TableStyles/TableRows/TableRows.scss';


const TableRows = ({
  tableId, rows, deleteFunc, editItem,
}) => (
  <TableBody>
    {rows && rows.map((row) => {
      if (tableId === PRODUCT_TABLE_ID) {
        return <ProductRow key={row.id} row={row} deleteFunc={deleteFunc} editItem={editItem} />;
      }
      if (tableId === WAREHOUSE_TABLE_ID) {
        return <WarehouseRow key={row.id} row={row} deleteFunc={deleteFunc} editItem={editItem} />;
      }
      return null;
    })}
  </TableBody>
);

export default TableRows;
