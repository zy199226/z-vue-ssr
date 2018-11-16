const path = require('path');
const express = require('express');
const compression = require('compression');
const resFavicon = require('./controller/resFavicon');
const defaultRes = require('./controller/default');

const port = 8080;
const app = express();
app.use(compression());
app.use('/static', express.static(path.join(__dirname, '../dist/static')));
app.get('/favicon.ico', resFavicon);

app.get('*', defaultRes);

app.listen(port);
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
