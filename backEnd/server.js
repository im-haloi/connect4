const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];
let gameState = {
    turn: 'red',
    board: Array.from({ length: 6 }, () => Array(7).fill(null))
};

wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            const { column, player } = data;
            for (let row = 5; row >= 0; row--) {
                if (gameState.board[row][column] === null) {
                    gameState.board[row][column] = player;
                    gameState.turn = player === 'red' ? 'yellow' : 'red';
                    break;
                }
            }

            clients.forEach(client => {
                client.send(JSON.stringify({ type: 'state', gameState }));
            });
        }
    });

    ws.send(JSON.stringify({ type: 'state', gameState }));

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
