const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000;
// Gak bisa pake express nya hadehh
// next update maybe
// // deklarasi lagi karena express itu function 
// app.use(BodyParser.urlencoded({extended : true }));
// //untuk post form , supaya menangkap hasil input an

// app.set("view engine", "ejs");
// app.set("views", "views"); /*directory html nya dimana*/


// jika server di buka
app.get('/', (req, res) => {
    // directory yang di perlihatkan
    res.sendFile(__dirname + '/src/index.html');
});

io.on('connection', (socket) => {
    // socket on dapatkan masage
    socket.on('chat message', (msg) => {
        console.log(msg)
        // emit massage
        io.emit('chat message', msg);
    });
    // jika user disconect
    socket.on('disconnect', () => {

        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log(`listening on *:${port}`);
});