export default class UserInfo {
  constructor(nameSelector, titleSelector) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      title: this._title.textContent,
    };
  }

  setUserInfo(nameInput, titleInput) {
    this._name.textContent = nameInput;
    this._title.textContent = titleInput;
  }
}
