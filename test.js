const assert = require('assert');
const wrapper = require('./index');
const timeout = time =>
  new Promise((resolve,reject) =>
    setTimeout(resolve, time));
const createDone = () =>
  function done(error) {
    done.withoutError = !error;
    done.withError = !!error;
  };

describe('Тестирование обертки', () => {
  it('Без ошибок', async () => {
    const wrapped = wrapper(async (req, res, next) => {
      await timeout(1);
      next();
    });
    const done = createDone();

    assert.strictEqual(
      Object.prototype.toString.call(wrapped),
      '[object Function]',
      'обертка не является функцией (не асинхронной)'
    );

    await wrapped({}, {}, done);

    assert.strictEqual(done.withoutError, true);
  });

  it('С ошибкой', async () => {
    const wrapped = wrapper(async (req, res, next) => {
      await timeout(1);
      next(new Error(''));
    });
    const done = createDone();

    await wrapped({}, {}, done);

    assert.strictEqual(done.withError, true);
  });
});
