import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

import ModalWindow from '../../../common/ModalWindow/ModalWindow';
import WarehouseDistribution from './WarehouseDistribution/WarehouseDistribution';

import Relations from '../../TableRelations';

import './AddModal.scss';


const relations = new Relations('PRODUCT_WAREHOUSE_QUANTITY');

const AddModal = ({ open, handleClose, applyFunc }) => {
  const [nameVal, setNameVal] = useState('');
  const [numberVal, setNumberVal] = useState('');
  const [weightVal, setWeightVal] = useState('');
  const [widthVal, setWidthVal] = useState('');
  const [heightVal, setHeightVal] = useState('');
  const [lengthVal, setLengthVal] = useState('');
  const [quantityVal, setQuantityVal] = useState('');
  const [colorVal, setColorVal] = useState('');
  const [error, setError] = useState('');
  const listQuantities = [];

  const getQuantity = (id, value) => {
    if (listQuantities.some((item) => item.storeId === id)) {
      listQuantities.forEach((item) => {
        if (item.storeId === id) item.quantity = value;
      });
    } else {
      listQuantities.push({
        storeId: id,
        quantity: value,
      });
    }
  };

  useEffect(() => {
    if (!open) {
      setNameVal('');
      setNumberVal('');
      setWeightVal('');
      setWidthVal('');
      setHeightVal('');
      setLengthVal('');
      setColorVal('');
      setError('');
    }
  }, [open]);

  const addProductApply = () => {
    const usedQuantity = listQuantities.reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    if (nameVal && numberVal && quantityVal && (quantityVal >= usedQuantity)) {
      const product = {
        id: `row ${Date.now()}`,
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
      listQuantities.forEach((item) => {
        item.prodId = product.id;
      });
      const existing = relations.getRelationListFromLocalStorage();
      relations.setRelationListInLocalStorage([...existing, ...listQuantities]);
      applyFunc(product);
      handleClose();
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
      handleClose={handleClose}
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
        <WarehouseDistribution getQuantity={getQuantity} />
        {error && (<div className="warning-row">{error}</div>)}
      </div>
    </ModalWindow>
  );
};

export default AddModal;
