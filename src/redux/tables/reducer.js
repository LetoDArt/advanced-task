import { SET_PRODUCT_LIST, SET_PRODUCT_WAREHOUSE_QUANTITY, SET_WAREHOUSE_LIST } from './actions';


const initialState = {
  products: [],
  warehouses: [],
  quantities: [],
};

export const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
      };
    case SET_WAREHOUSE_LIST:
      return {
        ...state,
        warehouses: action.payload,
      };
    case SET_PRODUCT_WAREHOUSE_QUANTITY:
      return {
        ...state,
        quantities: action.payload,
      };
    default:
      return state;
  }
};
