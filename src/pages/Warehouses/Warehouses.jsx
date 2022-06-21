import React from 'react';

import NavigationSystem from '../../components/NavigationSystem/NavigationSystem';
import WarehouseTable from '../../components/WarehouseTable/WarehouseTable';


const Warehouses = () => {
  console.log('1');
  return (
    <NavigationSystem>
      <WarehouseTable />
    </NavigationSystem>
  );
};

export default Warehouses;
