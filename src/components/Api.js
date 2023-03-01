const handleResponse = res => { //Обработка ответа
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

  //Получение данных пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
    .then(handleResponse)
  }

  //Установка данных пользователя
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

  //Получение данных карточек "из коробки"
  getInitialCardsData() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
    .then(handleResponse)
  }

  //Отправка данных карточки на сервер
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

  //Удаление данных карточки с сервера
  deleteCard(item) {
    return fetch(`${this._url}/cards/${item._id}`, {
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

  //Отправка на сервер данных о нажатии на "лайк"
  addLike( {_id} ) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
    .then(handleResponse)
  }

  //Отправка на сервер данных о снятии лайка
  removeLike( {_id} ) {
    return fetch(`${this._url}/cards/${_id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then(handleResponse)
  }

  //установка аватара
  setAvatar( {link} ) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
       })
    })
    .then(handleResponse);
  }
}

