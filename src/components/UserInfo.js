export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  //Метод получение данных профиля со страницы
  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.job = this._job.textContent;

    return data;
  }

  //Метод установки данных профиля на странице из передаваемого объекта
  setUserInfo({ userName, description }) {
    this._name.textContent = userName;
    this._job.textContent = description;
  }
}