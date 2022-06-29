
export const useProductDataPattern = (values) => ([
  {
    id: 'first', needed: true, label: 'Name', setterKey: 'name', inputType: 'text', value: values.name,
  },
  {
    id: 'second', needed: true, label: 'Number of a product', setterKey: 'num', inputType: 'text', value: values.num,
  },
  {
    id: 'third', needed: true, label: 'Width, m', setterKey: 'width', inputType: 'number', value: values.width,
  },
  {
    id: 'fourth', needed: true, label: 'Length, m', setterKey: 'length', inputType: 'number', value: values.length,
  },
  {
    id: 'fifth', needed: true, label: 'Height, m', setterKey: 'height', inputType: 'number', value: values.height,
  },
  {
    id: 'sixth', needed: true, label: 'Weight, kg', setterKey: 'weight', inputType: 'number', value: values.weight,
  },
  {
    id: 'seventh', needed: true, label: 'Color', setterKey: 'color', inputType: 'text', value: values.color,
  },
  {
    id: 'eighth', needed: true, label: 'Quantity', setterKey: 'quantity', inputType: 'number', value: values.quantity,
  },
]);

export const useWarehouseDataTable = (values) => ([
  {
    id: 'first', needed: true, label: 'Name', setterKey: 'name', inputType: 'text', value: values.name,
  },
  {
    id: 'second', needed: true, label: 'Address', setterKey: 'address', inputType: 'text', value: values.address,
  },
  {
    id: 'third', needed: true, label: 'Width, m', setterKey: 'width', inputType: 'number', value: values.width,
  },
  {
    id: 'fourth', needed: true, label: 'Length, m', setterKey: 'length', inputType: 'number', value: values.length,
  },
  {
    id: 'fifth', needed: true, label: 'Height, m', setterKey: 'height', inputType: 'number', value: values.height,
  },
]);
