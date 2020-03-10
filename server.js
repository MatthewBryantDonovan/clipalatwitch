const express = require('express');
const orm = require('mongoose');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const chalk = require('chalk')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/////////////// FIXME: DELETE FOR production////////////////////
app.use(express.static("client/build"));
/////////////// FIXME: DELETE FOR production////////////////////


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);


orm.connect(process.env.MONGODB_URI  || process.env.MONGO_DB_KEY)


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  console.log("hello world");
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server live at ` +  chalk.bgBlue(`http://localhost:${PORT}`) + '\n ' + chalk.bgMagenta(`http://localhost:${PORT}/api/users`));
});