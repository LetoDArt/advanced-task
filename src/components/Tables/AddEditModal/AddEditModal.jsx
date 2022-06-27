import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import ModalWindow from '../../common/ModalWindow/ModalWindow';
import Distribution from './Distribution/Distribution';

import Relations from '../TableRelations';

import { PRODUCT_WAREHOUSE_QUANTITY } from '../ProductsTable/consts';

import './AddEditModal.scss';


const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);

const AddEditModal = ({
  editing,
  initialValues,
  open,
  handleClose,
  applyFunc,
  listQuantities,
  setQuantities,
  warehouses,
}) => {
  const [nameVal, setNameVal] = useState('');
  const [numberVal, setNumberVal] = useState('');
  const [weightVal, setWeightVal] = useState('');
  const [widthVal, setWidthVal] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [lengthVal, setLengthVal] = useState('');
  const [quantityVal, setQuantityVal] = useState('');
  const [colorVal, setColorVal] = useState('');
  const [error, setError] = useState('');

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
    setQuantities(list);
  };
  const clearFields = () => {
    setNameVal('');
    setNumberVal('');
    setWeightVal('');
    setWidthVal('');
    setHeightVal('');
    setLengthVal('');
    setQuantityVal('');
    setColorVal('');
    setError('');
  };

  const closeWindow = useCallback(() => {
    clearFields();
    handleClose();
  }, []);

  useEffect(() => {
    if (editing && initialValues) {
      setNameVal(initialValues?.name ?? '');
      setNumberVal(initialValues?.num ?? '');
      setWeightVal(initialValues?.weight ?? '');
      setWidthVal(initialValues?.width ?? '');
      setHeightVal(initialValues?.height ?? '');
      setLengthVal(initialValues?.length ?? '');
      setQuantityVal(initialValues?.quantity ?? '');
      setColorVal(initialValues?.color ?? '');
    } else {
      clearFields();
    }
    if (!open) {
      clearFields();
    }
  }, [initialValues, editing, open]);

  const processApply = (usedQuantity) => {
    const product = {
      id: editing ? initialValues?.id : `row ${Date.now()}`,
      name: nameVal,
      num: numberVal,
      weight: weightVal,
      width: widthVal,
      height: heightVal,
      length: lengthVal,
      color: colorVal,
      quantity: quantityVal,
      nonUsedQuantity: quantityVal - usedQuantity,
    };
    const existing = relations.getRelationListFromLocalStorage();
    listQuantities.forEach((item) => {
      item.prodId = product.id;
    });

    console.log('editing', editing);
    if (!editing) {
      console.log('AddEditModal', [...existing, ...listQuantities]);
      relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
    } else {
      const save = [];
      let newExisting = [];

      if (listQuantities.length) {
        listQuantities.forEach((newOnes) => {
          newExisting = existing
            .filter((exItem) => !(exItem.prodId === product.id && exItem.storeId === newOnes.storeId));
          save.push(newOnes);
        });

        console.log(newExisting, save, 'AddEditModal 166');
        relations.setRelationListInLocalStorage([...newExisting, ...save]);
      }
    }
    applyFunc(product);
  };

  const addProductApply = () => {
    const usedQuantity = listQuantities.reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    console.log(usedQuantity, +quantityVal, listQuantities);
    if (nameVal && numberVal && quantityVal && (+quantityVal >= usedQuantity)) {
      processApply(usedQuantity);
      closeWindow();
    } else if (!nameVal || !numberVal) {
      setError('Name of a product and individual number are required');
    } else if (!quantityVal) {
      setError('Quantity of all product items must be specified');
    } else if (quantityVal < usedQuantity) {
      setError('Quantity of all products must be more than quantity of distributed items');
    }
  };

  return (
    <ModalWindow
      open={open}
      handleClose={closeWindow}
      title="Add Product"
      submitBtnFunc={addProductApply}
    >
      <div className="product-addition-container">
        <div className="product-addition">
          <div className="input-row">
            <TextField
              variant="outlined"
              label="Name"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Number of a product"
              value={numberVal}
              onChange={(e) => setNumberVal(e.target.value)}
            />
          </div>
          <div className="input-row">
            <TextField
              variant="outlined"
              label="Weight, kg"
              type="number"
              value={weightVal}
              onChange={(e) => setWeightVal(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Width, m"
              type="number"
              value={widthVal}
              onChange={(e) => setWidthVal(e.target.value)}
            />
          </div>
          <div className="input-row">
            <TextField
              variant="outlined"
              label="Height, kg"
              type="number"
              value={heightVal}
              onChange={(e) => setHeightVal(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Length, m"
              type="number"
              value={lengthVal}
              onChange={(e) => setLengthVal(e.target.value)}
            />
          </div>
          <div className="input-row">
            <TextField
              variant="outlined"
              label="Color"
              value={colorVal}
              onChange={(e) => setColorVal(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="Quantity of all items"
              type="number"
              value={quantityVal}
              onChange={(e) => setQuantityVal(e.target.value)}
            />
          </div>
        </div>
        <Distribution warehouses={warehouses} getQuantity={getQuantity} />
        {error && (<div className="warning-row">{error}</div>)}
      </div>
    </ModalWindow>
  );
};

export default AddEditModal;
