import app from "./app";

require("dotenv").config({ path: ".env.dev" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Nodejs is running on port ${port}`);
});
