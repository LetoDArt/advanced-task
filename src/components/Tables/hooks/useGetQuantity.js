import { useCallback } from 'react';
import { PRODUCT_TABLE_ID } from '../consts';


export const useGetQuantity = (tableId, listQuantities, setListQuantities) => {
  const key = tableId === PRODUCT_TABLE_ID ? 'storeId' : 'prodId';
  return useCallback((id, value) => {
    const list = [...listQuantities];
    if (list.some((item) => item[key] === id)) {
      list.forEach((item) => {
        if (item[key] === id) item.quantity = value;
      });
    } else {
      const newQuant = {};
      newQuant[key] = id;
      newQuant.quantity = value;
      list.push(newQuant);
    }
    setListQuantities(list);
  }, [listQuantities]);
};
