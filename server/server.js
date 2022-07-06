const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('add restaurant', (restaurant, room) => {
        socket.nsp.to(room).emit('received restaurant', restaurant);
    });

    socket.on('join room', (room) => {
        console.log(`${socket.id} joined ${room}`);
        socket.join(room);
    });
});

server.listen(port, () => {
    console.log((`Listening on port ${port}`));
});
