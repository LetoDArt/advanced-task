import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';

import { getProductList, getQuantitiesList } from '../../../../../redux/tables/selectors';


const DistributionRow = ({
  id,
  name,
  quantity,
  getValue,
  warehouseDist = false,
}) => {
  const [quant, setQuant] = useState(quantity);
  const [left, setLeft] = useState('');

  const quantitiesList = useSelector(getQuantitiesList);
  const productList = useSelector(getProductList);

  useEffect(() => {
    const used = [...quantitiesList]
      .filter((item) => item.prodId === id)
      .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    const all = [...productList].find((item) => item.id === id);
    setLeft((+all?.quantity) - (+used));
  }, []);

  const changeQuant = (value) => {
    setQuant(value);
    getValue(id, value);
  };

  return (
    <div className={`warehouse-distribute-row ${warehouseDist && 'product-list'}`}>
      <TextField
        variant="outlined"
        label="Warehouse"
        disabled
        value={name}
      />
      {warehouseDist && (
        <>
          <div className="quantity-shown">
            {left}
          </div>
        </>
      )}
      <TextField
        variant="outlined"
        label="Quantity"
        type="number"
        value={quant}
        onChange={(e) => changeQuant(e.target.value)}
      />
    </div>
  );
};

export default DistributionRow;
