const express = require('express');
const { __express } = require('ejs');
const api = require('./src/api');
const { root } = require('./webpack/helpers');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Routes = require('./src/Routes');

const app = express();
const PORT = 3000;

app.engine('.ejs', __express);
app.set('view engine', 'ejs');
app.set('views', root('src'));

app.use(express.static('dist'));
app.use(express.static('assets'));
app.use('/api', api(app, express));

app.get('*', (req, res) => {
  const markup = ReactDOMServer.renderToStaticMarkup(<Routes />);

  console.log(markup);
  res.sendFile(root('src/index.html'));
});

app.listen(PORT, () => console.log('listening on port', PORT));
