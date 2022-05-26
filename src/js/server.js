const http = require('http');
const Koa = require('koa');

const app = new Koa();
const WS = require('ws');

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws) => {
  const errCallback = (err) => {
    if (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  };
  ws.on('message', (msg) => {
    // eslint-disable-next-line
    console.log(msg);
    errCallback();
  });
});
