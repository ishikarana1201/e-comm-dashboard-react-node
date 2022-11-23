const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const app = express();

app.use(express.json());

app.use(cors());
// Add User API
app.post("/register", async (req, res) => {
  let data = await User.create(req.body);
  res.send(data);
});

app.listen(4500)