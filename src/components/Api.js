export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Get Cards Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Get User Info Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  editUserInfo({ name, about }) {
    fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Add Card Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Remove Card Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Add Like Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Add Like Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
  }
}
