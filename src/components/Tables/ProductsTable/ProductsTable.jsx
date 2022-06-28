import React, { useEffect, useState } from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';
import AddEditModal from '../AddEditModal/AddEditModal';

import '../TableStyles/TableStyles.scss';

import { PRODUCT_LIST_KEY, PRODUCT_WAREHOUSE_QUANTITY, WAREHOUSE_LIST_KEY } from '../consts';

import Actions from '../tableActions';
import Relations from '../TableRelations';


const actions = new Actions(PRODUCT_LIST_KEY);
const actions2 = new Actions(WAREHOUSE_LIST_KEY);
const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);


const initialValues = {
  name: '',
  num: '',
  weight: '',
  width: '',
  height: '',
  length: '',
  quantity: '',
  color: '',
  npnUsedQuantity: '',
  error: '',
};

const TableList = () => {
  const [rows, setRows] = useState(null);
  const [openProductWindow, setOpenProductWindow] = useState(false);
  const [productId, setProductId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [listQuantities, setListQuantities] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [values, setValues] = useState(initialValues);
  const dataPattern = {
    first: {
      needed: true, label: 'Name', setterKey: 'name', inputType: 'text', value: values.name,
    },
    second: {
      needed: true, label: 'Id of a product', setterKey: 'num', inputType: 'text', value: values.num,
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
    sixth: {
      needed: true, label: 'Weight, kg', setterKey: 'weight', inputType: 'number', value: values.weight,
    },
    seventh: {
      needed: true, label: 'Color', setterKey: 'color', inputType: 'text', value: values.color,
    },
    eighth: {
      needed: true, label: 'Quantity', setterKey: 'quantity', inputType: 'number', value: values.quantity,
    },
  };


  const valueSetter = (current) => {
    setValues((prevState) => ({
      name: current?.name ?? prevState.name,
      num: current?.num ?? prevState.num,
      weight: current?.weight ?? prevState.weight,
      width: current?.width ?? prevState.width,
      height: current?.height ?? prevState.height,
      length: current?.length ?? prevState.length,
      quantity: current?.quantity ?? prevState.quantity,
      npnUsedQuantity: current?.npnUsedQuantity ?? prevState.npnUsedQuantity,
      color: current?.color ?? prevState.color,
      error: current?.error ?? prevState.error,
    }));
  };

  const advancedSetter = (key, value) => {
    const obj = {};
    obj[key] = value;
    valueSetter(obj);
  };

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

      return newDistribution;
    }
    return stores;
  };

  const closeWindow = () => {
    setValues(initialValues);
    setOpenProductWindow(false);
  };
  const forceOpenAddWindow = (editing = false, product) => {
    const edit = typeof editing === 'boolean' && editing;
    setListQuantities([]);
    setWarehouses(createWarehouseRows(edit, product?.id));
    if (edit) {
      setIsEditing(edit);
      setProductId(product?.id);
      valueSetter({ ...product });
    } else {
      setIsEditing(false);
      setProductId('');
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

  const processApply = (usedQuantity) => {
    const product = {
      id: isEditing ? productId : `row ${Date.now()}`,
      name: values.name,
      num: values.num,
      weight: values.weight,
      width: values.width,
      height: values.height,
      length: values.length,
      color: values.color,
      quantity: values.quantity,
      nonUsedQuantity: +values.quantity - +usedQuantity,
    };
    const existing = [...relations.getRelationListFromLocalStorage()];
    listQuantities.forEach((item) => {
      item.prodId = product.id;
    });

    if (!isEditing) {
      relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
    } else if (listQuantities.length) {
      if (existing.length) {
        listQuantities.forEach((newOnes) => {
          const one = existing
            .find((exItem) => exItem.prodId === product.id && exItem.storeId === newOnes.storeId);
          const ind = existing
            .findIndex((exItem) => exItem.prodId === product.id && exItem.storeId === newOnes.storeId);
          if (one) existing.splice(ind, 1);
        });

        product.nonUsedQuantity = +values.quantity - [...existing, ...listQuantities]
          .filter((exItem) => exItem.prodId === product.id)
          .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);

        relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
      } else relations.setRelationListInLocalStorage([...listQuantities]);
    }
    if (isEditing) editItem(product);
    else addItem(product);
  };

  const addProductApply = () => {
    const usedQuantity = listQuantities.reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    if (values.name && values.num && values.quantity && (+values.quantity >= usedQuantity)) {
      processApply(usedQuantity);
      closeWindow();
    } else if (!values.name || !values.num) {
      valueSetter({ error: 'Name of a product and individual number are required' });
    } else if (!values.quantity) {
      valueSetter({ error: 'Quantity of all product items must be specified' });
    } else if (values.quantity < usedQuantity) {
      valueSetter({ error: 'Quantity of all products must be more than quantity of distributed items' });
    }
  };


  const getQuantity = (id, value) => {
    const list = [...listQuantities];
    if (list.some((item) => item.storeId === id)) {
      list.forEach((item) => {
        if (item.storeId === id) item.quantity = value;
      });
    } else {
      list.push({
        storeId: id,
        quantity: value,
      });
    }
    setListQuantities(list);
  };


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
        values={values}
        warehouses={warehouses}
        open={openProductWindow}
        getQuantity={getQuantity}
        handleClose={closeWindow}
        listQuantities={listQuantities}
        setQuantities={setListQuantities}
        applyFunc={addProductApply}
        setter={advancedSetter}
        modalPattern={dataPattern}
      />
    </>
  );
};

export default TableList;
