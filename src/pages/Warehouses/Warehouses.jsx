import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import NavigationSystem from '../../components/NavigationSystem/NavigationSystem';
import WarehouseTable from '../../components/Tables/WarehouseTable/WarehouseTable';

import { navigationActions } from '../../redux/navigation/actions';
import { WAREHOUSE_PAGE_ID } from '../../components/NavigationSystem/consts';


const Warehouses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(navigationActions.setChosenOption(WAREHOUSE_PAGE_ID));
  }, []);

  return (
    <NavigationSystem>
      <WarehouseTable />
    </NavigationSystem>
  );
};

export default Warehouses;
