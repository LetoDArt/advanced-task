import React, { memo } from 'react';
import { TextField } from '@mui/material';


const AllFields = memo(({ modalPattern, setter }) => (
  <div className="product-addition">
    {modalPattern && modalPattern.map((one) => (
      <TextField
        key={one.id}
        variant="outlined"
        label={one.label}
        type={one.inputType}
        value={one.value}
        onChange={(e) => setter(one.setterKey, e.target.value)}
      />
    ))}
  </div>
));

export default AllFields;
