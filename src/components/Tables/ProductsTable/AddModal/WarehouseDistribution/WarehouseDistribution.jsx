import React, { useEffect, useState } from 'react';

import DistributionRow from './DistributionRow/DistributionRow';

import Actions from '../../../tableActions';

import { WAREHOUSE_LIST_KEY } from '../../../WarehouseTable/consts';


const actions = new Actions(WAREHOUSE_LIST_KEY);

const WarehouseDistribution = ({ getQuantity }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    setWarehouses(actions.getDataListFromLocalStorage());
  }, []);

  return (
    <div className="warehouse-distribution">
      <div className="warehouse-distribute-row header-row">
        <div>Warehouse</div>
        <div>Quantity</div>
      </div>
      <div className="warehouse-distribution-list">
        {warehouses && warehouses.map((row) => (
          <DistributionRow
            key={row.id}
            id={row.id}
            warehouse={row.name}
            getValue={getQuantity}
          />
        ))}


      </div>
    </div>
  );
};

export default WarehouseDistribution;
