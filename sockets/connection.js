var onlineUsers = require('../index').onlineUsers;

module.exports = (io, socket) => {

    // Listens for the `go-online` event emitted from client
    // Recieves clients email
    // If there is property in `onlineUsers` object with key of that email,
    // it will rewrite its value (socket id), if not, will add a new one
    // Finally, emits the `onlineUsers` array
    socket.on('go-online', data => {
        const { email } = data;
        onlineUsers[email] = socket.id;
    });

    socket.on('get-online-users', () => {
        io.sockets.emit('online-users', onlineUsers);
    })

};