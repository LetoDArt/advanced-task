import React, { memo } from 'react';

import ModalWindow from '../../common/ModalWindow/ModalWindow';
import Distribution from './Distribution/Distribution';
import AllFields from './AllFields/AllFields';

import './AddEditModal.scss';


const AddEditModal = memo(({
  title,
  values,
  getQuantity,
  distribution,
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
    title={title}
    submitBtnFunc={applyFunc}
    customStyle="add-edit-window"
  >
    <div className="product-addition-container">
      <AllFields modalPattern={modalPattern} setter={setter} />
      <Distribution
        distribute={distribution}
        getQuantity={getQuantity}
        warehouseDist={warehouseDist}
      />
      {values.error && (<div className="warning-row">{values.error}</div>)}
    </div>
  </ModalWindow>
));

export default AddEditModal;
