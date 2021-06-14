import express from 'express';
import picture from './api/picture';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log('The server is up. url: localhost:3000');
});

app.get('/', (req, res) => {
  res.send('The server is up');
});

app.use('/api', picture);
