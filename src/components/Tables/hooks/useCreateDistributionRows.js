import { useMemo } from 'react';
import { PRODUCT_TABLE_ID } from '../consts';


export const useCreateDistributionRows = (tableId, list, quantities) => {
  const theFirstKey = tableId === PRODUCT_TABLE_ID ? 'prodId' : 'storeId';
  const theSecondKey = tableId === PRODUCT_TABLE_ID ? 'storeId' : 'prodId';

  return useMemo(() => (editing, id) => {
    const newDistribution = [];
    const newList = JSON.parse(JSON.stringify(list));
    if (editing) {
      const relate = [...quantities].filter((item) => item[theFirstKey] === id);
      newList.forEach((distributingItem) => {
        const relationOfStore = relate.find((rel) => rel[theSecondKey] === distributingItem.id);
        newDistribution.push({
          ...distributingItem,
          quantity: relationOfStore ? relationOfStore.quantity : '',
        });
      });
      return newDistribution;
    }
    newList.forEach((item) => {
      item.quantity = '';
    });
    return newList;
  }, [list, quantities]);
};
