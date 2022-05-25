const http = require('http');
const Koa = require('koa');
// const { wasm } = require('webpack');
const app = new Koa();
const WS = require('ws');

const port = process.env.PORT || 8080;
const server = http.createServer(app.callback());
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws) => {
    const errCallback = (err) => {
        if (err) {
            console.log(err);
        }
    }


})

