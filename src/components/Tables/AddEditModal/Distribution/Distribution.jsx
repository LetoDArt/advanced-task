import React, { memo } from 'react';

import DistributionRow from './DistributionRow/DistributionRow';


const Distribution = memo(({ distribute, getQuantity, warehouseDist }) => (
  <div className="warehouse-distribution">
    <div className={`warehouse-distribute-row header-row ${warehouseDist && 'product-list'}`}>
      <div>{ warehouseDist ? 'Products' : 'Warehouses'}</div>
      {warehouseDist && (
        <>
          <div>Left</div>
        </>
      )}
      <div>Quantity</div>
    </div>
    <div className={`warehouse-distribution-list ${warehouseDist && 'product-list'}`}>
      {distribute && distribute.map((row) => (
        <DistributionRow
          key={row.id}
          id={row.id}
          name={row.name}
          getValue={getQuantity}
          quantity={row.quantity}
          warehouseDist={warehouseDist}
        />
      ))}


    </div>
  </div>
));

export default Distribution;
