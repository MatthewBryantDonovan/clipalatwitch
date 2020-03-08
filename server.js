const express = require('express');
const orm = require('mongoose');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

orm.connect(process.env.MONGODB_URI  || process.env.MONGO_DB_KEY)


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});