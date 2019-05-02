/**
 * NodeJS backend service using Express
 * @author sebamed
 */

var express = require('express');
var socket = require('socket.io');

// configuration
const port = 4000;

var app = express();
var server = app.listen(port, () => {
    console.log(`Listening requests on ${port}`);
});

// socket inicialization
var io = socket(server);

// sockets

io.on('connection', socket => {
    console.log(`Connected: ${socket.id}`);

    var connectionSocket = require('./sockets/connection')(io, socket)

});

var onlineUsers = {};

exports.onlineUsers = onlineUsers;

