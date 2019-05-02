module.exports = (socket) => {

    io.sockets.on('connect', data => {
        console.log(data)
    })
    
}