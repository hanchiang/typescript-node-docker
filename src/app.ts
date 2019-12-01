import routes from "./routes";
import middlewares from "./middlewares";

import { requestLoggerOpts, logger } from "./utils/logging";

const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const koaBunyanLogger = require("koa-bunyan-logger");

app.keys = [process.env.COOKIE_SECRET];
app.use(
  cors({
    credentials: true
  })
);

app.use(middlewares.catchAndPropagateError);
if (process.env.NODE_ENV !== "test") {
  // bunyan logger
  app.use(koaBunyanLogger(logger));
  app.use(koaBunyanLogger.requestIdContext());
  app.use(koaBunyanLogger.requestLogger(requestLoggerOpts));
}

app.use(routes.routes());

app.use(middlewares.notFound);

// app level error handler
app.on("error", (err, ctx) => {
  if (process.env.NODE_ENV !== "test") {
    if (ctx.status >= 500) {
      ctx.log.error(err.devMessage || err.message);
    } else if (ctx.status >= 400) {
      ctx.log.warn(err.devMessage || err.message);
    }
  }
});

export default app;
