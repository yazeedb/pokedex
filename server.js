const { join } = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(join(__dirname, 'assets')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'src/index.html'));
});

app.listen(PORT, () => console.log('listening on port', PORT));
