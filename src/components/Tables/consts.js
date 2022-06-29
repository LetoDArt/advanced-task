export const WAREHOUSE_LIST_KEY = 'WAREHOUSE_LIST_KEY';
export const PRODUCT_WAREHOUSE_QUANTITY = 'PRODUCT_WAREHOUSE_QUANTITY';
export const PRODUCT_LIST_KEY = 'PRODUCT_LIST_KEY';
export const PRODUCT_TABLE_ID = 'PRODUCT_TABLE_ID';
export const WAREHOUSE_TABLE_ID = 'WAREHOUSE_TABLE_ID';
export const WARNING_ON_DELETION_MESSAGE = 'If you delete production from the list, it will be deleted from all stores.'
  + ' Do you want to delete anyway?';

export const INITIAL_VALUES_OF_PRODUCT_STATE = {
  name: '',
  num: '',
  weight: '',
  width: '',
  height: '',
  length: '',
  quantity: '',
  color: '',
  npnUsedQuantity: '',
  error: '',
};
export const INITIAL_VALUES_OF_WAREHOUSE_STATE = {
  name: '',
  quantity: '',
  address: '',
  width: '',
  height: '',
  length: '',
  error: '',
};

export const PRODUCT_HEADER = [
  { id: '1', align: 'left', text: 'Product' },
  { id: '2', align: 'right', text: 'Number' },
  { id: '3', align: 'right', text: 'Quantity' },
  { id: '4', align: 'right', text: 'Non-distributed' },
  { id: '5', align: 'right', text: 'Weight, kg' },
  { id: '6', align: 'right', text: 'Height, m' },
  { id: '7', align: 'right', text: 'Width, m' },
  { id: '8', align: 'right', text: 'Length, m' },
  { id: '9', align: 'right', text: 'Color' },
  { id: '10', align: 'center', text: 'Actions' },
];
export const WAREHOUSE_HEADER = [
  { id: '1', align: 'left', text: 'Warehouse' },
  { id: '2', align: 'right', text: 'Total products' },
  { id: '3', align: 'right', text: 'Address' },
  { id: '4', align: 'right', text: 'Width, m' },
  { id: '6', align: 'right', text: 'Height, m' },
  { id: '8', align: 'right', text: 'Length, m' },
  { id: '10', align: 'center', text: 'Actions' },
];
