const express = require("express");
const path = require("path");

const connectDatabase = require("./config/database");

const app = express();

// Connect Database
connectDatabase();

// Bodyparser Middleware
app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/logs", require("./routes/api/logs"));
// app.use("/api/fields", require("./routes/api/fields"));

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
