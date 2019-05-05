var onlineUsers = require('../index').onlineUsers;
const uuidv1 = require('uuid/v1');

module.exports = (io, socket) => {

    socket.on('push-private-message', data => {
        let { from, to, id, message} = data;

        if(id == null) {
            id = uuidv1();
            io.sockets.connected[onlineUsers[to]].join(id);
            socket.join(id);
        }

        io.sockets.in(id).emit('new-private-message', { from, to, id, message});
    });

}