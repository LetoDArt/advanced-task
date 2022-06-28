import React from 'react';
import { TextField } from '@mui/material';


const AllFields = ({ modalPattern, setter }) => {
  const {
    first, second, third, fourth, fifth, sixth, seventh, eighth,
  } = modalPattern;

  return (
    <div className="product-addition">
      <div className="input-row">
        {first && first.needed
          && (
            <TextField
              variant="outlined"
              label={first.label}
              type={first.inputType}
              value={first.value}
              onChange={(e) => setter(first.setterKey, e.target.value)}
            />
          )}
        {second && second.needed
          && (
            <TextField
              variant="outlined"
              label={second.label}
              type={second.inputType}
              value={second.value}
              onChange={(e) => setter(second.setterKey, e.target.value)}
            />
          )}
      </div>
      <div className="input-row">
        {third && third.needed
          && (
            <TextField
              variant="outlined"
              label={third.label}
              type={third.inputType}
              value={third.value}
              onChange={(e) => setter(third.setterKey, e.target.value)}
            />
          )}
        {fourth && fourth.needed
          && (
            <TextField
              variant="outlined"
              label={fourth.label}
              type={fourth.inputType}
              value={fourth.value}
              onChange={(e) => setter(fourth.setterKey, e.target.value)}
            />
          )}
      </div>
      <div className="input-row">
        {fifth && fifth.needed
          && (
            <TextField
              variant="outlined"
              label={fifth.label}
              type={fifth.inputType}
              value={fifth.value}
              onChange={(e) => setter(fifth.setterKey, e.target.value)}
            />
          )}
        {sixth && sixth.needed
          && (
            <TextField
              variant="outlined"
              label={sixth.label}
              type={sixth.inputType}
              value={sixth.value}
              onChange={(e) => setter(sixth.setterKey, e.target.value)}
            />
          )}
      </div>
      <div className="input-row">
        {seventh && seventh.needed
          && (
            <TextField
              variant="outlined"
              label={seventh.label}
              type={seventh.inputType}
              value={seventh.value}
              onChange={(e) => setter(seventh.setterKey, e.target.value)}
            />
          )}
        {eighth && eighth.needed
          && (
            <TextField
              variant="outlined"
              label={eighth.label}
              type={eighth.inputType}
              value={eighth.value}
              onChange={(e) => setter(eighth.setterKey, e.target.value)}
            />
          )}
      </div>
    </div>
  );
};

export default AllFields;
