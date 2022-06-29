import React from 'react';

import Card from '../../Card/Card';
import TableItself from './TableItself/TableItself';

import '../TableStyles/TableStyles.scss';


const MainTable = ({
  tableId,
  pageTitle,
  addButtonTitle,
  rows,
  deleteBtn,
  editBtn,
  header,
}) => (
  <>
    <Card
      wrapperClass="table-list-container"
      btnTitle={addButtonTitle}
      btnFunction={editBtn}
      pgTitle={pageTitle}
    >
      <div className="table-body">
        <TableItself
          tableId={tableId}
          rows={rows}
          deleteFunc={deleteBtn}
          editItem={editBtn}
          header={header}
        />
      </div>
    </Card>
  </>
);

export default MainTable;
