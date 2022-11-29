const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

// For invalid endpoints
app.get('*',(req,res) => {
  res.send('Error 404: Invalid endpoint (check URL)');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
