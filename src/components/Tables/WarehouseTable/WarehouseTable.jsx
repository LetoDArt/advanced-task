import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';

import { WAREHOUSE_LIST_KEY } from './consts';
import Actions from '../tableActions';

import '../TableStyles/TableStyles.scss';


const actions = new Actions(WAREHOUSE_LIST_KEY);

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
      btnTitle="Add Warehouse"
      btnFunction={() => console.log('click')}
      pgTitle="Warehouses"
    >
      <div className="table-body">
        <TableItself rows={rows} deleteFunc={deleteItem} />
      </div>
    </Card>
  );
};

export default TableList;

