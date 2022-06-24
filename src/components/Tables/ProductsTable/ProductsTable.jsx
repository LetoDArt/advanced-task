import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';

import { PRODUCT_LIST_KEY } from './consts';
import Actions from '../tableActions';

import './ProductsTable.scss';


const actions = new Actions(PRODUCT_LIST_KEY);

const TableList = () => {
  const [rows, setRows] = useState(null);

  const deleteItem = (item) => {
    actions.deleteOneItemFromList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  useEffect(() => {
    setRows(actions.getDataListFromLocalStorage());
  }, []);

  return (
    <Card
      wrapperClass="table-list-container"
      btnTitle="Add product"
      btnFunction={() => console.log('click')}
      pgTitle="Products"
    >
      <div className="table-body">
        <TableItself rows={rows} deleteFunc={deleteItem} />
      </div>
    </Card>
  );
};

export default TableList;

