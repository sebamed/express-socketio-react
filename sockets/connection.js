module.exports = (socket) => {

    socket.on('connected', data => {
        console.log(data)
    });

};