const path = require('path');
const express = require('express');
const app = express();
const PORT = 8080;

function root (...paths) {
  return path.resolve(__dirname, '..', ...paths);
}

app.use(express.static(root('dist')));

app.get('*', (req, res) => {
  res.sendFile(root('dist/index.html'));
});

app.listen(PORT, () => console.log('listening on', PORT));
