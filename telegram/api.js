// import { URL } from '../utils/constants';
const { URL } = require('../utils/constants');

function getResponse(res) {

  if (res.ok) {
    return res.ok; // true
  }
  return console.log(`ошибка в api.js - getResponse - ${res}`);
}

// Получение всех chatId из DB
const getAllChatId = () => {
  return fetch(`${URL}/chatid`, {
    method: 'GET',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return getResponse(res);
    });
};

// Сохраненение пользователем фильма
const saveNewChatId = (chatIdData) => {
  return fetch(`${URL}/chatid`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatIdData),
  })
    .then((res) => {
      // console.log('ОТВЕТ В api.js -');
      // console.log(chatIdData, URL);
      return getResponse(res);
    }).catch((err) => console.log(`ERROR В api.js -${err}`));
};

module.exports = {
  saveNewChatId,
  getAllChatId,
};
