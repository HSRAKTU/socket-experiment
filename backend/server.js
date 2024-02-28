const app = require('express')()

const server = require('http').createServer()

const io = require('socket.io')(server,{
    cors: {
        origin: 'http://localhost:5173',
      },
});

io.on("connection",(socket) => {
    console.log("What is socket:", socket);
    console.log("Socket is active to be connected");

    socket.on("chat", (payload) => {
        console.log("What is payload:", payload);

        io.emit("chat", payload)
    });

})

server.listen(3000, () => {
    console.log("PORT-3000: Server is listening...")
})