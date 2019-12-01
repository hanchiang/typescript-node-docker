import { httpStatus, ErrorCode } from '../types/errors';
import { throwError } from '../utils/errors';

const catchAndPropagateError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // some errors will have .status, however this is not a guarantee
    let message = err.message;
    ctx.status = httpStatus(err.code);

    ctx.body = {
      error: {
        code: err.code || ErrorCode.INTERNAL_SERVER_ERROR,
        message,
      },
    };

    // since we handled this manually we'll want to delegate to the regular app
    // level error handling as well so that centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
};

const notFound = (ctx) => {
  throwError(ErrorCode.NOT_FOUND, `${ctx.request.url} is not found`);
};

export default {
  catchAndPropagateError,
  notFound,
};
