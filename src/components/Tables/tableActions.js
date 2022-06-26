export default class Actions {
  constructor(key) {
    this.storageKey = key;
  }

  setDataListInLocalStorage(data) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getDataListFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  deleteOneItemFromList(item) {
    const products = this.getDataListFromLocalStorage().filter((prod) => prod.id !== item.id);
    this.setDataListInLocalStorage(products);
  }

  addOptionToDataList = (item) => {
    const products = this.getDataListFromLocalStorage();
    products.push(item);
    this.setDataListInLocalStorage(products);
  };
}

