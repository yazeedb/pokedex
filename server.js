import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import express from 'express';
import { __express } from 'ejs';
import api from './src/api';
import { root } from './webpack/helpers';

import App from './src';

const app = express();
const PORT = 3000;

app.engine('.ejs', __express);
app.set('view engine', 'ejs');
app.set('views', root('src'));

app.use(express.static('dist'));
app.use(express.static('assets'));
app.use('/api', api(app, express));

app.get('*', (req, res) => {
  console.log(App);
  const ServerApp = App(StaticRouter, {
    context: {},
    location: req.url
  });

  const markup = renderToString(<ServerApp />);
  console.log(markup);

  res.send(markup);

  // res.sendFile(root('src/index.html'));
});

app.listen(PORT, () => console.log('listening on port', PORT));
