import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import express from 'express';
import { __express } from 'ejs';
import api from './src/api';
import App from './src';
import getStore from './src/store';

const app = express();
const PORT = 3000;

app.engine('.ejs', __express);
app.set('view engine', 'ejs');
app.set('views', 'src');

app.use(express.static('dist'));
app.use(express.static('assets'));
app.use('/api', api(app, express));

app.get('*', (req, res) => {
  const store = getStore();
  const ServerApp = App({
    store,
    Router: StaticRouter,
    props: { context: {}, location: req.url }
  });

  const markup = renderToString(<ServerApp />);

  res.render('index', {
    markup,
    preloadedState: store.getState()
  });
});

app.listen(PORT, () => console.log('listening on port', PORT));
