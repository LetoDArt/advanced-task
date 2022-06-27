import React, { useState } from 'react';
import { TextField } from '@mui/material';


const DistributionRow = ({
  id,
  warehouse,
  quantity,
  getValue,
}) => {
  const [quant, setQuant] = useState(quantity);

  const changeQuant = (value) => {
    setQuant(value);
    getValue(id, value);
  };

  return (
    <div className="warehouse-distribute-row">
      <TextField
        variant="outlined"
        label="Warehouse"
        disabled
        value={warehouse}
      />
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
