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

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._title.textContent = data.title;
  }
}
