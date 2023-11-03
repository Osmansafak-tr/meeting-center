const { catchError } = require("../common/util");
const { handleValResult } = require("../middleware");

class RouterHandler {
  constructor(router) {
    this.router = router;
  }

  get(path, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.get(path, middlewares, catchError(controller));
    else this.router.get(path, catchError(controller));
  }

  getVal(path, validator, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.get(
        path,
        validator,
        middlewares,
        handleValResult,
        catchError(controller)
      );
    else
      this.router.get(path, validator, handleValResult, catchError(controller));
  }

  post(path, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.post(path, middlewares, catchError(controller));
    else this.router.post(path, catchError(controller));
  }

  postVal(path, validator, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.post(
        path,
        validator,
        middlewares,
        handleValResult,
        catchError(controller)
      );
    else
      this.router.post(
        path,
        validator,
        handleValResult,
        catchError(controller)
      );
  }

  put(path, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.put(path, middlewares, catchError(controller));
    else this.router.put(path, catchError(controller));
  }

  putVal(path, validator, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.put(
        path,
        validator,
        middlewares,
        handleValResult,
        catchError(controller)
      );
    else
      this.router.put(path, validator, handleValResult, catchError(controller));
  }

  del(path, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.delete(path, middlewares, catchError(controller));
    else this.router.delete(path, catchError(controller));
  }

  delVal(path, validator, controller, ...middlewares) {
    if (middlewares.length > 0)
      this.router.delete(
        path,
        validator,
        middlewares,
        handleValResult,
        catchError(controller)
      );
    else
      this.router.delete(
        path,
        validator,
        handleValResult,
        catchError(controller)
      );
  }
}

module.exports = (router) => {
  return new RouterHandler(router);
};
