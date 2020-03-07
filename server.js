const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const orm = require('mongoose');

if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
    }

orm.connect(process.env.MONGODB_URI  || "mongodb://mattmatt:pass123@ds215988.mlab.com:15988/heroku_t957lb48")

app.get('/', (req, res) => res.json({msg: 'testing server'}))

app.listen(PORT, () => console.log(`site live at http://localhost:${PORT}`))