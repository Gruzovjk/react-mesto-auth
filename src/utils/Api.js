import {ApiConfig} from "./ApiConfig";

class Api {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  // метод-форма запроса на сервер с проверкой ответа
  _request(url, options) {
    return fetch(url, options).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}: ${res.statusText}`);
      }
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.src,
      }),
    });
  }
  // удаление карточки с сервера по id (Будда услышит)
  removeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  // лайки (Афродита одобрит)
  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    } else {
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  }

  editUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
  // редактирование аватара профиля (Один в помощь)
  editUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }
}

export const api = new Api(ApiConfig);
