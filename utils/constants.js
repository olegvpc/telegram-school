const URL = 'http://localhost:4000';
const userExistErrorMessage = 'Пользователь с таким email уже существует';
const BadRequestErrorMessage = 'Переданы некорректные данные';
const requiredValidationMessage = (name) => `Поле "${name}" обязательно`;

module.exports = {
  URL,
  userExistErrorMessage,
  BadRequestErrorMessage,
  requiredValidationMessage,
};
