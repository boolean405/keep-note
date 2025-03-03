require("dotenv").config();
const express = require("express");

const { errorHandler, notFound } = require("./middleware/error-middleware.js");
const { validateToken } = require("./utils/validator.js");

const { userRoute } = require("./routes/user-route.js");
const { noteRoute } = require("./routes/note-route.js");
const { accountDbConnection, appDbConnection } = require("./utils/db.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Connect db and run server
const runServer = () => {
  accountDbConnection.once("open", () => {
    appDbConnection.once("open", () => {  
      console.log("=> Success, connected to Account database");
      console.log("=> Success, connected to App database");
      app.listen(port, console.log(`=> Server is running at port ${port}`));
    });
  });
};
 
runServer();

// Routes
app.use("/api/user", userRoute); 
app.use("/api/note", validateToken(), noteRoute);

app.use(notFound);
app.use(errorHandler);
