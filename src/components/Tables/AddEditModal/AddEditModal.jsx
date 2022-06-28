import React from 'react';

import ModalWindow from '../../common/ModalWindow/ModalWindow';
import Distribution from './Distribution/Distribution';
import AllFields from './AllFields/AllFields';

import './AddEditModal.scss';


const AddEditModal = ({
  values,
  getQuantity,
  warehouses,
  handleClose,
  open,
  applyFunc,
  setter,
  modalPattern,
  warehouseDist,
}) => (
  <ModalWindow
    open={open}
    handleClose={handleClose}
    title="Add Product"
    submitBtnFunc={applyFunc}
  >
    <div className="product-addition-container">
      <AllFields modalPattern={modalPattern} setter={setter} />
      <Distribution
        warehouses={warehouses}
        getQuantity={getQuantity}
        warehouseDist={warehouseDist}
      />
      {values.error && (<div className="warning-row">{values.error}</div>)}
    </div>
  </ModalWindow>
);

export default AddEditModal;
