import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';

import { PRODUCT_LIST_KEY } from './consts';
import Actions from '../tableActions';

import AddModal from './AddModal/AddModal';

import '../TableStyles/TableStyles.scss';
// import { WAREHOUSE_LIST_KEY } from '../WarehouseTable/consts';


const actions = new Actions(PRODUCT_LIST_KEY);
// const actions2 = new Actions(WAREHOUSE_LIST_KEY);

const TableList = () => {
  const [rows, setRows] = useState(null);
  const [openAddWindow, setOpenAddWindow] = useState(false);

  const closeAddWindow = () => setOpenAddWindow(false);
  const forceOpenAddWindow = () => setOpenAddWindow(true);

  const deleteItem = (item) => {
    actions.deleteOneItemFromList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  const addItem = (item) => {
    actions.addOptionToDataList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  useEffect(() => {
    // const products = actions.getDataListFromLocalStorage();
    // const warehouses = actions2.getDataListFromLocalStorage();
    // const list = [];
    //
    // warehouses.forEach((store) => {
    //   products.forEach((prod) => {
    //     list.push({
    //       storeId: store.id,
    //       prodId: prod.id,
    //       quantity: 0,
    //     });
    //   });
    // });
    //
    // window.localStorage.setItem('PRODUCT_WAREHOUSE_QUANTITY', JSON.stringify(list));
    setRows(actions.getDataListFromLocalStorage());
  }, []);

  return (
    <>
      <Card
        wrapperClass="table-list-container"
        btnTitle="Add product"
        btnFunction={forceOpenAddWindow}
        pgTitle="Products"
      >
        <div className="table-body">
          <TableItself rows={rows} deleteFunc={deleteItem} />
        </div>
      </Card>
      <AddModal
        open={openAddWindow}
        handleClose={closeAddWindow}
        applyFunc={addItem}
      />
    </>
  );
};

export default TableList;

