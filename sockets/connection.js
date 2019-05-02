module.exports = (socket) => {

    socket.on('connect', data => {
        console.log(data)
    });

};