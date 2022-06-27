import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';
import AddEditModal from '../AddEditModal/AddEditModal';

import { PRODUCT_LIST_KEY, PRODUCT_WAREHOUSE_QUANTITY } from './consts';
import { WAREHOUSE_LIST_KEY } from '../WarehouseTable/consts';

import '../TableStyles/TableStyles.scss';

import Actions from '../tableActions';
import Relations from '../TableRelations';


const actions = new Actions(PRODUCT_LIST_KEY);
const actions2 = new Actions(WAREHOUSE_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const TableList = () => {
  const [rows, setRows] = useState(null);
  const [openProductWindow, setOpenProductWindow] = useState(false);
  const [modalInitialValues, setModalInitialValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [listQuantities, setListQuantities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const createWarehouseRows = (editing, prodId) => {
    const newDistribution = [];
    const stores = actions2.getDataListFromLocalStorage();
    if (editing) {
      const relate = relations
        .getRelationListFromLocalStorage().filter((item) => item.prodId === prodId);
      stores.forEach((store) => {
        const relationOfStore = relate.find((rel) => rel.storeId === store.id);
        newDistribution.push({
          ...store,
          quantity: relationOfStore ? relationOfStore.quantity : '',
        });
      });
      console.log(editing, newDistribution);

      return newDistribution;
    }
    return stores;
  };

  const closeAddWindow = () => setOpenProductWindow(false);
  const forceOpenAddWindow = (editing = false, product) => {
    setListQuantities([]);
    setWarehouses(createWarehouseRows(editing, product?.id));
    if (editing) {
      setIsEditing(editing);
      setModalInitialValues(product);
    } else {
      setIsEditing(false);
      setModalInitialValues({});
    }
    setOpenProductWindow(true);
  };

  const deleteItem = (item) => {
    actions.deleteOneItemFromList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  const addItem = (item) => {
    actions.addOptionToDataList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  const editItem = (item) => {
    actions.editItemOfList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  useEffect(() => {
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
          <TableItself rows={rows} deleteFunc={deleteItem} editItem={forceOpenAddWindow} />
        </div>
      </Card>
      <AddEditModal
        editing={isEditing}
        initialValues={modalInitialValues}
        open={openProductWindow}
        handleClose={closeAddWindow}
        applyFunc={isEditing ? editItem : addItem}
        listQuantities={listQuantities}
        setQuantities={setListQuantities}
        warehouses={warehouses}
      />
    </>
  );
};

export default TableList;
