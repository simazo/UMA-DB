export const requestErrorHandler = function (controller) {
  return async function (req, res, next) {
    try {
      return await controller(req, res, next);
    } catch (err) {
      next(err.stack);
      //next(err);
    }
  };
};