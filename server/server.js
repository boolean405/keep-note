require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { errorHandler, notFound } = require("./middleware/error-middleware.js");
const { validateToken } = require("./utils/validator.js");

const { userRoute } = require("./routes/user-route.js");
const { noteRoute } = require("./routes/note-route.js");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Main Function
const runServer = async () => {
  // DB Connection
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("=> Success, MONGODB connected");
    })
    .then(() => {
      // Run Server
      app.listen(port, console.log(`=> Server is running at port ${port}`));
    })
    .catch((err) => console.error(`=> MONGODB connect error! ${err.message}`));
};
// Migrate Data
//   await Migrator.migrate();
// })
//   // Backup Data
//   await Migrator.backup();

// Run Server
runServer();

// Routes
app.use("/api/user",  userRoute);
app.use("/api/note", validateToken(), noteRoute);

app.use(notFound);
app.use(errorHandler);
