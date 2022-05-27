const http = require('http');
const Koa = require('koa');

const app = new Koa();
const WS = require('ws');

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
const wsServer = new WS.Server({ server });

const users = [
  {
    username: 'Sasha',
  },
  {
    username: 'Misha',
  },
  {
    username: 'Andrew',
  },
  {
    username: 'Patrick',
  },
  {
    username: 'Helen',
  },
];

wsServer.on('connection', (ws) => {
  const errCallback = (err) => {
    if (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  };

  ws.on('message', (msg) => {
    if (!users.some((el) => el.username === `${msg}`)) {
      ws.send(`${msg}`, errCallback);
      users.push({ username: msg });
    } else {
      ws.send('Доступ запрещен', errCallback);
    }
  });
});
