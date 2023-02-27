const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export default class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
    .then(handleResponse)
  }

  setUserData({ name, about }) {
    return fetch(`${this._url}/users/me`, { 
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
     })
    .then(handleResponse)
  }

  getInitialCardsData() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
    .then(handleResponse)
  }

  setCardData( {name, link } ) {
    return fetch(`${this._url}/cards`, { 
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
       })
      })
    .then(handleResponse)
  }

  deleteCard(item) {
    return fetch (`${this._url}/cards/${item._id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        return item;
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }

}

