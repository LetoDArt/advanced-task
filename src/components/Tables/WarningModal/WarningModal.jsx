import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

import ModalWindow from '../../common/ModalWindow/ModalWindow';

import './WarningModal.scss';


const WarningModal = ({
  open, handleClose, message, apply,
}) => {
  const applyAction = () => {
    apply();
    handleClose();
  };

  return (
    <ModalWindow
      open={open}
      handleClose={handleClose}
      title="Warning"
      submit={false}
      customStyle="warning-deletion-window"
    >
      <div className="warning-modal-container">
        <div className="warning-message">
          <div className="vertical-align-for-message">
            {message}
          </div>
        </div>
        <div className="warning-modal-buttons">
          <MDBBtn color="success" className="modal-buttons" onClick={handleClose}>Cancel</MDBBtn>
          <MDBBtn color="danger" className="modal-buttons" onClick={applyAction}>Ok</MDBBtn>
        </div>
      </div>
    </ModalWindow>
  );
};

export default WarningModal;
