## Telegram School Project for information and notification teachers

npm init -y

```
npm i node-telegram-bot-api nodemon
```

### username: 
zamenu121357bot
### Use this token to access the HTTP API:
6186212482:AAH8qnCtSGIIT62fyvGG42O4vMWO97pK9tg


## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта
`npm install` - загрузка задействованных библиотек

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Полезные инстументы- создание Хардверного пользователя
```typescript
// _id созданного пользователя для автоматического добавления req.user._id во всех middleware ниже
app.use((req, res, next) => {
  req.user = {
    _id: '632dd2b94ceb7519db223be0',
  };
  next();
});
```

```shell
 npm list
```
