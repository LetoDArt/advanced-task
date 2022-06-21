import React from 'react';

import Card from '../Card/Card';
import TableItself from './TableItself/TableItself';

import './WarehouseTable.scss';


function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('row 1', 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('row 2', 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('row 3', 'Eclair', 262, 16.0, 24, 6.0),
  createData('row 4', 'Cupcake', 305, 3.7, 67, 4.3),
  createData('row 5', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 6', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 7', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 8', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 9', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 10', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 11', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 12', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 13', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 14', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 15', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 16', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 17', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 18', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 19', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 20', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 21', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 22', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 23', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 24', 'Gingerbread', 356, 16.0, 49, 3.9),
  createData('row 25', 'Gingerbread', 356, 16.0, 49, 3.9),
];

const TableList = () => {
  console.log('table list');
  return (
    <Card
      wrapperClass="table-list-container"
      btnTitle="Add Warehouse"
      btnFunction={() => console.log('click')}
      pgTitle="Warehouses"
    >
      <div className="table-body">
        <TableItself rows={rows} />
      </div>
    </Card>
  );
};

export default TableList;

