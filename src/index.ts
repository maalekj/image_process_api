import express from 'express';
import picture from './api/picture';

const app = express();
const port = 3000;

app.listen(port, () => {
  // console.log('The server is up. url: localhost:3000');
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    'The server is up.  to get a resized picture write this url with your variable: http://localhost:3000/api/picture?name=santamonica&width=200&high=200'
  );
});

app.use('/api', picture);
export default app;
