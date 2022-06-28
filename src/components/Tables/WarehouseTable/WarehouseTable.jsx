import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';
import AddEditModal from '../AddEditModal/AddEditModal';

import Actions from '../tableActions';
import Relations from '../TableRelations';

import { PRODUCT_LIST_KEY, PRODUCT_WAREHOUSE_QUANTITY, WAREHOUSE_LIST_KEY } from '../consts';

import '../TableStyles/TableStyles.scss';


const actions = new Actions(WAREHOUSE_LIST_KEY);
const actions2 = new Actions(PRODUCT_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);
const initialValues = {
  name: '',
  quantity: '',
  address: '',
  width: '',
  height: '',
  length: '',
  error: '',
};

const TableList = () => {
  const [rows, setRows] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [products, setProducts] = useState([]);
  const [warehouseId, setwarehouseId] = useState('');
  const [listQuantities, setListQuantities] = useState([]);
  const [openWarehouseWindow, setOpenWarehouseWindow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dataPattern = {
    first: {
      needed: true, label: 'Name', setterKey: 'name', inputType: 'text', value: values.name,
    },
    second: {
      needed: true, label: 'Address', setterKey: 'address', inputType: 'text', value: values.address,
    },
    third: {
      needed: true, label: 'Width, m', setterKey: 'width', inputType: 'number', value: values.width,
    },
    fourth: {
      needed: true, label: 'Length, m', setterKey: 'length', inputType: 'number', value: values.length,
    },
    fifth: {
      needed: true, label: 'Height, m', setterKey: 'height', inputType: 'number', value: values.height,
    },
  };

  const valueSetter = (current) => {
    setValues((prevState) => ({
      name: current?.name ?? prevState.name,
      width: current?.width ?? prevState.width,
      address: current?.address ?? prevState.address,
      height: current?.height ?? prevState.height,
      length: current?.length ?? prevState.length,
      quantity: current?.quantity ?? prevState.quantity,
      error: current?.error ?? prevState.error,
    }));
  };

  const advancedSetter = (key, value) => {
    const obj = {};
    obj[key] = value;
    valueSetter(obj);
  };

  const createWarehouseRows = (editing, storeId) => {
    const newDistribution = [];
    const prods = actions2.getDataListFromLocalStorage();
    if (editing) {
      const relate = relations.getRelationListFromLocalStorage()
        .filter((item) => item.storeId === storeId);
      prods.forEach((prod) => {
        const relationOfStore = relate.find((rel) => rel.prodId === prod.id);
        newDistribution.push({
          ...prod,
          quantity: relationOfStore ? relationOfStore.quantity : '',
        });
      });
      return newDistribution;
    }

    prods.forEach((item) => {
      item.quantity = '';
    });
    return prods;
  };

  const closeWindow = () => {
    setValues(initialValues);
    setOpenWarehouseWindow(false);
  };
  const forceOpenAddWindow = (editing, warehouse) => {
    const edit = typeof editing === 'boolean' && editing;
    setListQuantities([]);
    setProducts(createWarehouseRows(edit, warehouse?.id));
    if (edit) {
      setIsEditing(edit);
      setwarehouseId(warehouse?.id);
      valueSetter({ ...warehouse });
    } else {
      setIsEditing(false);
      setwarehouseId('');
    }
    setOpenWarehouseWindow(true);
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
    setRows([]);
    actions.editItemOfList(item);
    setRows(actions.getDataListFromLocalStorage());
  };

  const processApply = () => {
    const store = {
      id: isEditing ? warehouseId : `row ${Date.now()}`,
      name: values.name,
      width: values.width,
      height: values.height,
      length: values.length,
      quantity: +values.quantity,
      address: values.address,
      error: values.error,
    };
    const existing = [...relations.getRelationListFromLocalStorage()];
    listQuantities.forEach((item) => {
      item.storeId = store.id;
    });

    if (!isEditing) {
      relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
    } else if (listQuantities.length) {
      if (existing.length) {
        listQuantities.forEach((newOnes) => {
          const one = existing
            .find((exItem) => exItem.storeId === store.id && exItem.prodId === newOnes.prodId);
          const ind = existing
            .findIndex((exItem) => exItem.storeId === store.id && exItem.prodId === newOnes.prodId);
          if (one) existing.splice(ind, 1);
        });

        store.quantity = [...existing, ...listQuantities]
          .filter((exItem) => exItem.storeId === store.id)
          .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);

        relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
      } else relations.setRelationListInLocalStorage([...listQuantities]);
    }
    if (isEditing) editItem(store);
    else addItem(store);
  };

  const addProductApply = () => {
    if (values.name && values.address) {
      processApply();
      closeWindow();
    } else if (!values.name || !values.address) {
      valueSetter({ error: 'Name of a store and address are required' });
    }
  };


  useEffect(() => {
    setRows(actions.getDataListFromLocalStorage());
  }, []);

  const getQuantity = (id, value) => {
    const list = [...listQuantities];
    if (list.some((item) => item.prodId === id)) {
      list.forEach((item) => {
        if (item.prodId === id) item.quantity = value;
      });
    } else {
      list.push({
        prodId: id,
        quantity: value,
      });
    }
    setListQuantities(list);
  };

  return (
    <>
      <Card
        wrapperClass="table-list-container"
        btnTitle="Add Warehouse"
        btnFunction={forceOpenAddWindow}
        pgTitle="Warehouses"
      >
        <div className="table-body">
          <TableItself rows={rows} deleteFunc={deleteItem} editItem={forceOpenAddWindow} />
        </div>
      </Card>
      <AddEditModal
        values={values}
        warehouses={products}
        open={openWarehouseWindow}
        getQuantity={getQuantity}
        handleClose={closeWindow}
        listQuantities={listQuantities}
        setQuantities={setListQuantities}
        applyFunc={addProductApply}
        setter={advancedSetter}
        modalPattern={dataPattern}
        warehouseDist
      />
    </>
  );
};

export default TableList;

