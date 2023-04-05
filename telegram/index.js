const TelegramApi = require('node-telegram-bot-api');

const { BOT_TOKEN } = process.env;

const botToken = BOT_TOKEN;

const bot = new TelegramApi(botToken, { polling: true });
const {
  getAllChatId,
  saveNewChatId,
} = require('./api');

const users = [
  { userChatId: 300123159, firstName: 'Александра', lastName: '' },
  { userChatId: 417643617, firstName: 'Nadezhda', lastName: 'Tkach' },
  { userChatId: 206633135, firstName: 'Oleg', lastName: 'Tkach' },
];

const buttonOption = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Согласен', callback_data: 'Agree' }],
      [{ text: 'Нет возможности', callback_data: 'Disagree' }],
    ],
  }),
};
// const sendMessage = function (chatID, message) {
//   return bot.sendMessage(chatID, message);
// };

const start = function () {
  bot.setMyCommands([
    { command: '/start', description: 'Начальное приветствие' },
    { command: '/info', description: 'Получить информацию о пользователе' },
    { command: '/testnadin', description: 'Тест замена учителя- Nadin' },
    { command: '/testalex', description: 'Тест замена учителя- Alex' },
    { command: '/testoleg', description: 'Тест замена учителя- Oleg' },
  ]);

  bot.on('message', async function (msg) {
    // console.log(msg)
    const text = await msg.text;
    const userChatId = await msg.chat.id;
    const firstName = await msg.from.first_name;
    const lastName = await msg.from.last_name;

    if (text === '/start') {
      await bot.sendSticker(userChatId, 'https://tlgrm.ru/_/stickers/1bf/c0b/1bfc0b94-5bd4-34e3-8b60-588100010d95/7.webp');
      // Информирование модератора о регистрации пользовател
      await saveNewChatId({ chatId: String(userChatId), lastName, firstName })
        .then((res) => console.log('response - OK-200'))
        .catch((err) => console.log(`Ошибка записи chatId: ${err}`));
      await bot.sendMessage(206633135, `зарегистрирован пользователь ${lastName} ${firstName} c chatID: ${userChatId}`);
      return bot.sendMessage(userChatId, 'Добро пожаловать в ЧатБот по сервису поиска замены учителя');
    }
    if (text === '/info') {
      const userData = { userChatId, firstName, lastName };
      if (!(userData in users)) {
        users.push(userData);
      }
      // console.log(users)
      return bot.sendMessage(userChatId, `Тебя зовут ${msg.from.last_name} ${msg.from.first_name}`)
    }
    if (text === '/testnadin') {
      return bot.sendMessage(417643617, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
      // await sendMessageForChange(users[1].userChatId);
    }
    if (text === '/testalex') {
      return bot.sendMessage(300123159, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
      // await sendMessageForChange(users[1].userChatId);
    }
    if (text === '/testoleg') {
      return bot.sendMessage(206633135, 'Нужна замена учителя ФИО на ЗАВТРА', buttonOption);
      // await sendMessageForChange(users[1].userChatId);
    }
    return bot.sendMessage(userChatId, 'Я тебя не понимаю, попробуй еще раз');
    // await bot.sendMessage(cuserChatId, `Ты написал мне ${text}`)
  });

  bot.on('callback_query', async answer => {
    const msg = await answer;
    const data = msg.data;
    console.log(msg.message.chat);
    const userChatId = msg.message.chat.id;
    const firstName = msg.message.chat.first_name;
    const lastName = msg.message.chat.last_name;
    if (data === 'Agree') {
      console.log(msg.data); // Agree / Disagree
      return bot.sendMessage(userChatId, `Уважаемая/ый ${firstName} ${lastName}, Вы подтвердили замену учителя ФИО на ЗАВТРА`);
    }
    console.log(msg.data);
    return bot.sendMessage(userChatId, `Уважаемая/ый ${firstName} ${lastName}, Вы отказались от замены учителя ФИО на ЗАВТРА`);
  });
};

// start();
module.exports = start;
