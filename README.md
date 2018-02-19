# Async-middleware-wrapper

Обертка асинхронных функций для работы в express-стиле.

### Установка
```bash
npm i git+https://git@github.com/rochnyak-d-i/node-async-mw-wrap.git
```
### Работа
```js
const wrap = require('rdi-async-mw-wrap');
const app = express();

app.use(wrap(async (req, res, next) => {
    await doSomething();

    next();
}));
```
