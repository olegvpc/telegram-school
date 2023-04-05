const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnauthorizedError('Необходима авторизация - нет поля AUTHORIZATION');
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');
  // console.log(token);

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    const err = new UnauthorizedError(`Необходима авторизация - несовпадает токен - ${e.message}`);
    return next(err);
  }

  req.user = payload;
  // записываем пейлоуд в объект запроса
  // { _id: '633ea43ee3d90638840ab4fb', iat: 1665049683, exp: 1665654483 }
  // console.log(req.user);

  return next(); // пропускаем запрос дальше
};
