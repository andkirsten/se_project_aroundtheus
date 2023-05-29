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
        res.ok ? res.json() : Promise.reject(`Card Error: ${res.status}`)
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
        res.ok ? res.json() : Promise.reject(`Profile Error: ${res.status}`)
      )
      .catch((err) => {
        console.error(err);
      });
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
        res.ok ? res.json() : Promise.reject(`Card Error: ${res.status}`)
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
      .then((res) => console.log("delete" + res))
      .catch((err) => {
        console.error(err);
      });
  }

  // addLike(item, likes) {
  //   likes += 1;
  //   console.log(likes);
  //   return fetch(
  //     `https://around.nomoreparties.co/v1/group-12/cards/likes/${item._id}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         authorization: this._authToken,
  //       },
  //     }
  //   ).then((res) => console.log(res));
  // }
}
