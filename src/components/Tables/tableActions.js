export default class Actions {
  constructor(key) {
    this.storageKey = key;
    this.#init();
  }

  #init() {
    const check = this.getDataListFromLocalStorage();
    if (!check) this.setDataListInLocalStorage([]);
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

  editItemOfList(item) {
    const products = this.getDataListFromLocalStorage();
    products.forEach((one, ind) => {
      if (one.id === item.id) products[ind] = { ...item, id: one.id };
    });
    this.setDataListInLocalStorage(products);
  }
}

