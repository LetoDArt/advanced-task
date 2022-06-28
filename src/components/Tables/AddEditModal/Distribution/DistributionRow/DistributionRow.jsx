import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';


import { PRODUCT_LIST_KEY, PRODUCT_WAREHOUSE_QUANTITY } from '../../../consts';

import Relations from '../../../TableRelations';
import Actions from '../../../tableActions';


const relations = new Relations(PRODUCT_WAREHOUSE_QUANTITY);
const actions = new Actions(PRODUCT_LIST_KEY);

const DistributionRow = ({
  id,
  name,
  quantity,
  getValue,
  warehouseDist = false,
}) => {
  const [quant, setQuant] = useState(quantity);
  const [left, setLeft] = useState('');

  useEffect(() => {
    const used = relations.getRelationListFromLocalStorage()
      .filter((item) => item.prodId === id)
      .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
    const all = actions.getDataListFromLocalStorage().find((item) => item.id === id);
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
