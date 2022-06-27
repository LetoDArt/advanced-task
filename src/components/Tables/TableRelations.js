export default class Relations {
  constructor(key) {
    this.storageKey = key;
    // this.#init();
  }

  getRelationListFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(this.storageKey));
  }

  setRelationListInLocalStorage(data) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
