export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.id;
  }

  //Метод получение данных профиля со страницы
  getUserInfo() {
    const data = {};
    data.name = this._name.textContent;
    data.job = this._job.textContent;

    return data;
  }

  //Метод установки данных профиля на странице из передаваемого объекта
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._job.textContent = about;
    this.setAvatar({ avatar });
    this.id = _id;
  }

  //Метод установки аватара на странице
  setAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}