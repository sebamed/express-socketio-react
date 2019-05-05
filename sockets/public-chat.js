module.exports = (io, socket) => {

    // Recieves public message and emits it back to all sockets
    socket.on('push-public-message', data => {
        const { from, message } = data;
        io.sockets.in('public-room').emit('new-public-message', { from, message });
    });

    socket.on('join-public-message', data => {
        io.sockets.in('public-room').emit('public-member-joined', data);
    });

    socket.on('leave-public-message', data => {
        io.sockets.in('public-room').emit('public-member-left', data);
    });
};