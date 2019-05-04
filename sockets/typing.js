var usersTyping = [];

module.exports = (io, socket) => {

    socket.on('start-typing', data => {
        const { email } = data;

        if (!usersTyping.includes(email)) {
            usersTyping.push(email);
        }

        io.sockets.emit('currently-typing', usersTyping);
    })

    socket.on('stop-typing', data => {
        const { email } = data;

        usersTyping.splice(usersTyping.indexOf(email), 1);

        io.sockets.emit('currently-typing', usersTyping);
    })

};