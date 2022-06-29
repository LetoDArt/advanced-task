export const useQuantityProcessor = (editing, listQuantities) => (existArray, product) => {
  const existing = JSON.parse(JSON.stringify(existArray));
  if (editing && listQuantities.length && existing.length) {
    listQuantities.forEach((newOnes) => {
      const one = existing
        .find((exItem) => exItem.prodId === product.id && exItem.storeId === newOnes.storeId);
      const ind = existing
        .findIndex((exItem) => exItem.prodId === product.id && exItem.storeId === newOnes.storeId);
      if (one) existing.splice(ind, 1);
    });

    product.nonUsedQuantity = +product.quantity - [...existing, ...listQuantities]
      .filter((exItem) => exItem.prodId === product.id)
      .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
  }

  return [...existing, ...listQuantities];
};

export const useWarehouseQuantityProcessor = (editing, listQuantities) => (existArray, store) => {
  const existing = JSON.parse(JSON.stringify(existArray));
  if (editing && listQuantities.length && existing.length) {
    listQuantities.forEach((newOnes) => {
      const one = existing
        .find((exItem) => exItem.storeId === store.id && exItem.prodId === newOnes.prodId);
      const ind = existing
        .findIndex((exItem) => exItem.storeId === store.id && exItem.prodId === newOnes.prodId);
      if (one) existing.splice(ind, 1);
    });

    store.quantity = [...existing, ...listQuantities]
      .filter((exItem) => exItem.storeId === store.id)
      .reduce((accumulator, cur) => accumulator + (+cur.quantity), 0);
  }

  return [...existing, ...listQuantities];
};
