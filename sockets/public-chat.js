module.exports = (io, socket) => {

    // Recieves public message and emits it back to all sockets
    socket.on('push-public-message', data => {
        const { user, message } = data;
        io.sockets.emit('new-public-message', { user, message });
    });

};