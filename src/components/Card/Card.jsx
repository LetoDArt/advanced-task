import React, { memo } from 'react';

import { MDBBtn } from 'mdb-react-ui-kit';

import './Card.scss';


const Card = memo(({
  pgTitle,
  btnTitle,
  btnFunction,
  wrapperClass,
  children,
}) => (
  <div className={`card-container ${wrapperClass ?? ''}`}>
    <div className="custom-card-header">
      <h3 className="header-itself">{pgTitle}</h3>
      <div className="card-buttons">
        <MDBBtn onClick={btnFunction}>{btnTitle}</MDBBtn>
      </div>
    </div>
    {children}
  </div>
));

export default Card;
