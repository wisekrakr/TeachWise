const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Get the URI for our database
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

// Use the route to the items
app.use("/api/items", require("./routes/api/items")); // everything in this file should refer to items
app.use("/api/users", require("./routes/api/users"));
app.use("/api/logs", require("./routes/api/logs"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve a static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

// Listen for connection
app.listen(port, () => {
  console.log(`Server Started on port: ${port}`);
});
