export default class UserInfo {
  constructor(nameSelector, titleSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._title = document.querySelector(titleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._title.textContent,
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._title.textContent = data.about;
    this._avatar.alt = data.name;
    this._avatar.src = data.avatar;
  }

  getAvatarInfo() {
    return {
      avatar: this._avatar.src,
    };
  }

  setAvatarInfo(avatarLink) {
    this._avatar.src = avatarLink;
  }
}
