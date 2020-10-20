const express = require('express');
const socket = require('socket.io');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(3000, () => {
    console.log('Server Running')
})

const io = socket(server);

io.on('connection', (socket) => {
    socket.on('chat', (data) =>{
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})