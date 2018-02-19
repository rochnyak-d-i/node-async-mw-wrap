/**
 * оборачивает асинхронную функцию в обертку
 *   для работы в express-стиле
 *
 * @param  {Function} func  асинхронная функция
 *
 * @return {Function} обернутая функция
 */
module.exports = func =>
  (...args) =>
    func(...args)
      // В этой позиции всегда находится next.
      // args.slice(-1) не использовать, ибо в обработчике параметров
      //  (app.param / router.param) подставляется значение.
      .catch(args[2]);
