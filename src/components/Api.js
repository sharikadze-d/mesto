export default class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers
  }

  getUserData() {
    return fetch(`${this._url}/users/me `, { headers: this._headers })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error('Ошибка'));
    })
  }
}

