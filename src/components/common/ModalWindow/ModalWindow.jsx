import React from 'react';
import { Box, Modal } from '@mui/material';

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

import './ModalWindow.scss';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

const ModalWindow = ({
  open,
  handleClose,
  title,
  submitBtnFunc,
  children,
  submit = true,
  customStyle,
}) => (
  <Modal
    className="lol"
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <div className={`modal-container ${customStyle ?? ''}`}>
        <div className="modal-header-container">
          <h1 style={{ margin: 'auto 0', color: '#fff' }}>{title}</h1>
          <div className="button-container">
            {submit && (
            <MDBBtn
              className="modal-option-btn apply-submit"
              onClick={submitBtnFunc}
            >
              <MDBIcon size="3x" fas icon="check" />
            </MDBBtn>
            )}
            <MDBBtn className="modal-option-btn close-cancel" onClick={handleClose}>
              <MDBIcon size="3x" fas icon="times" />
            </MDBBtn>
          </div>
        </div>
        <div className="modal-content-container">
          { children }
        </div>
      </div>
    </Box>
  </Modal>
);


export default ModalWindow;
