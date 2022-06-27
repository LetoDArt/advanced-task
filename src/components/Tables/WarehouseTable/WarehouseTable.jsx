import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';

import { WAREHOUSE_LIST_KEY } from './consts';
import Actions from '../tableActions';

import '../TableStyles/TableStyles.scss';


const actions = new Actions(WAREHOUSE_LIST_KEY);

const TableList = () => {
  const [rows, setRows] = useState(null);
  // const [openWarehouseWindow, setOpenWarehouseWindow] = useState(false);
  // const [modalInitialValues, setModalInitialValues] = useState({});
  // const [isEditing, setIsEditing] = useState(false);

  // const closeAddWindow = () => setOpenWarehouseWindow(false);
  // const forceOpenAddWindow = (editing, product) => {
  //   if (editing) {
  //     setIsEditing(editing);
  //     setModalInitialValues(product);
  //   } else {
  //     setIsEditing(false);
  //     setModalInitialValues({});
  //   }
  //   setOpenWarehouseWindow(true);
  // };

  const deleteItem = (item) => {
    actions.deleteOneItemFromList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  // const addItem = (item) => {
  //   actions.addOptionToDataList(item);
  //   setRows(actions.getDataListFromLocalStorage());
  // };
  //
  // const editItem = (item) => {
  //   actions.editItemOfList(item);
  //   setRows(actions.getDataListFromLocalStorage());
  // };


  useEffect(() => {
    setRows(actions.getDataListFromLocalStorage());
  }, []);

  return (
    <>
      <Card
        wrapperClass="table-list-container"
        btnTitle="Add Warehouse"
        // btnFunction={forceOpenAddWindow}
        pgTitle="Warehouses"
      >
        <div className="table-body">
          <TableItself rows={rows} deleteFunc={deleteItem} />
        </div>
      </Card>

    </>
  );
};

export default TableList;

