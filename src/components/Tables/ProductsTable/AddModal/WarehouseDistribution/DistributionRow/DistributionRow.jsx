import React from 'react';
import { TextField } from '@mui/material';


const DistributionRow = ({ id, warehouse, getValue }) => {
  console.log('dfsafrweaf', id);

  return (
    <div className="warehouse-distribute-row">
      <TextField
        variant="outlined"
        label="Warehouse"
        disabled
        value={warehouse}
        // onChange={(e) => setQuantityVal(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Quantity"
        type="number"
        onChange={(e) => getValue(id, e.target.value)}
      />
    </div>
  );
};

export default DistributionRow;
