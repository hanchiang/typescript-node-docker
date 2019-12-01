import bunyan = require('bunyan');

export const logger = bunyan.createLogger({
  name: 'Identity service',
  serializers: bunyan.stdSerializers,
});

const mapLevelToName = {
  10: 'trace', // Logging from external libraries used by your app or very detailed application logging.
  20: 'debug', // Anything else, i.e. too verbose to be included in "info" level.
  30: 'info', // Detail on regular operation.
  40: 'warn', // A note on something that should probably be looked at by an operator eventually
  50: 'error', // Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish)
  60: 'fatal', // The service/app is going to stop or become unusable now. An operator should definitely look into this soon
};

// Do not log in when running test. Uncomment to see logs
if (process.env.NODE_ENV === 'test') {
  logger.level(bunyan.FATAL + 1);
}

// Omit fields in logger because they are unncessarily annoying
// See: https://github.com/trentm/node-bunyan/issues/462#issuecomment-334253857
/* eslint-disable no-underscore-dangle, no-param-reassign */
// @ts-ignore
logger._emit = (rec, noemit) => {
  delete rec.v;

  const { level, ...rest } = rec;

  rec = {
    level,
    status: mapLevelToName[rec.level],
    ...rest,
  };
  // @ts-ignore
  bunyan.prototype._emit.call(logger, rec, noemit);
};

export const requestLoggerOpts = {
  // this method mutates ctx
  updateLogFields: (ctx) => {
    const clonedCtx = { ...ctx };

    if (clonedCtx.req.headers) {
      // remove `authorization` header
      // delete clonedCtx.req.headers.authorization;
    }

    if (clonedCtx.res) {
      // delete clonedCtx.req.headers;
      // Do not log response headers
      delete clonedCtx.res;
    }
    return clonedCtx;
  },
};
