require("dotenv").config();
const express = require("express");

const { errorHandler, notFound } = require("./middleware/error-middleware.js");
const { validateToken } = require("./utils/validator.js");
// const { redisClient } = require("./utils/redis.js");

const userRoute = require("./routes/user-route.js");
const { noteRoute } = require("./routes/note-route.js");
const { accountDbConnection, appDbConnection } = require("./utils/db.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Connect db and run server

// redisClient
//   .connect()
// .then(() => {
//   console.log("=> Success, redis server connected");
// })
// .then(() => {
accountDbConnection.once("open", () => {
  console.log("=> Success, connected to Account database");
})
// })
// .then(() => {
appDbConnection.once("open", () => {
  console.log("=> Success, connected to App database");
  app.listen(port, console.log(`=> Server is running at port ${port}`));
});
// })
// .catch((err) =>
//   console.error("=> Fail, could not connect to server!", err.message)
// );

// Routes
app.use("/api/users", userRoute);
app.use("/api/notes", validateToken(), noteRoute);

app.use(notFound);
app.use(errorHandler);
