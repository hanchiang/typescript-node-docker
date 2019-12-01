import Router = require("koa-router");
const router = new Router();

router.get("/health", ctx => {
  ctx.body = {
    payload: {
      status: "Node app is up and running!"
    }
  };
});

export default router;
