export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_WAREHOUSE_LIST = 'SET_WAREHOUSE_LIST';
export const SET_PRODUCT_WAREHOUSE_QUANTITY = 'SET_PRODUCT_WAREHOUSE_QUANTITY';

export const tableActions = {
  setProductList: (payload) => ({
    type: SET_PRODUCT_LIST,
    payload,
  }),
  setWarehouseList: (payload) => ({
    type: SET_WAREHOUSE_LIST,
    payload,
  }),
  setProductWarehouseQuantities: (payload) => ({
    type: SET_PRODUCT_WAREHOUSE_QUANTITY,
    payload,
  }),
};
