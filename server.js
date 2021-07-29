const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('combined'));

let myData = Math.random();
let somethingElse = Math.random();

app.get('/api/data', (req, res, next) => {
  // res.setHeader("Cache-Control", "private, max-age=3600"); // if you want to set time for caching manually. Even without setting it, etag is set automatically here.
  // myData = Math.random(); // if you run this, myData changes, so etag hash sent changes.
  setTimeout(()=> {
    res.json({ data: req.query['name'] ?  req.query['name']  : myData });
  }, 3000);
});

app.get('/api/data/update', (req, res, next) => {
  // myData is changed below. So, the etag of the data changes here.
  myData = Math.random();
  console.log('myData: ', myData);
  res.json({ success: 'true' });
});

app.get('/api/something-else', (req, res, next) => {
  res.setHeader("Cache-Control", "private, max-age=3600"); // if you want to set time for caching manually. Even without setting it, etag is set automatically here.
  // myData = Math.random(); // if you run this, myData changes, so etag hash sent changes.
  setTimeout(()=> {
    res.json({ somethingElse });
  }, 3000);
});

app.get('/api/something-else/update', (req, res, next) => {
  somethingElse = Math.random();
  console.log('somethingElse: ', somethingElse);
  res.json({ somethingElse });
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});