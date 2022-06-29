
export const useProductErrorChecker = (setter) => (value, quantities, usedQuantity) => {
  let isThereError;
  const isThereNegativeNumbers = quantities.some((item) => item.quantity < 0);
  if (value.name && value.num && value.quantity && (+value.quantity >= usedQuantity) && !isThereNegativeNumbers) {
    isThereError = false;
  } else if (!value.name || !value.num) {
    isThereError = true;
    setter('error', 'Name of a product and individual number are required');
  } else if (!value.quantity) {
    isThereError = true;
    setter('error', 'Quantity of all product items must be specified');
  } else if (value.quantity < usedQuantity) {
    isThereError = true;
    setter('error', 'Quantity of all products must be more than quantity of distributed items');
  } else if (isThereNegativeNumbers) {
    isThereError = true;
    setter('error', 'Distributed products must be 0 or more');
  }
  return isThereError;
};

export const useWarehouseErrorChecker = (setter) => (value, quantities) => {
  let isThereError;
  const isThereNegativeNumbers = quantities.some((item) => item.quantity < 0);
  if (value.name && value.address && !isThereNegativeNumbers) {
    isThereError = false;
  } else if (!value.name || !value.address) {
    isThereError = true;
    setter('error', 'Name of a store and address are required');
  } else if (isThereNegativeNumbers) {
    isThereError = true;
    setter('error', 'Distributed products must be 0 or more');
  }
  return isThereError;
};
