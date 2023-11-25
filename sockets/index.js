const { Server } = require("socket.io");

module.exports = (server) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        const username = socket.handshake.query.username;

        // Informer les autres utilisateurs que quelqu'un s'est connecté
        socket.broadcast.emit('chat message', `${username} s'est connecté`);

        socket.on('disconnect', () => {
            // Informer les autres utilisateurs que quelqu'un s'est déconnecté
            socket.broadcast.emit('chat message', `${username} s'est déconnecté`);
        });

        socket.on('chat message', (msg) => {
            console.log("Message : ", msg);
            const message = `${msg.firstName} a dit : ${msg.message}`;
            io.emit('chat message', message);
        });
    });
};
