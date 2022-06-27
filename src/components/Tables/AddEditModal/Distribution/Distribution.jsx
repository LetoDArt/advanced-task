import React from 'react';

import DistributionRow from './DistributionRow/DistributionRow';


const Distribution = ({ warehouses, getQuantity }) => (
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
          quantity={row.quantity}
        />
      ))}


    </div>
  </div>
);

export default Distribution;
