import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import OnlineUsers from './online-users/online-users';
import ChatLayout from './chat-layout/chat-layout';
import MyMessages from './my-messages/my-messages';

class ChatContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: [],
            email: this.props.location.state.email,
            messages: [],
            typing: [],
            rooms: [
                {
                    id: 0, from: 'everyone', to: 'everyone', name: 'Public Room', messages: []
                },
            ],
            room: {},
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        const { email } = this.state;

        this.setState({ room: this.state.rooms[0] });

        if (!email) {
            this.props.history.push('/');
        }

        socket.emit('get-online-users');
        socket.emit('join-public-message', { email });
        socket.emit('get-all-public-members');

        socket.on('get-all-public-members', data => {
            this.setState({
                publicMembers: data
            });
        });

        socket.on('online-users', onlineUsers => {
            let users = []
            for (let key in onlineUsers) {
                users.push({ email: key, socketId: onlineUsers[key] });
            }

            this.setState({ onlineUsers: users });
        });

        socket.on('currently-typing', data => {
            this.setState({ typing: data });
        })

        socket.on('new-public-message', data => {
            const { from, message } = data;

            let publicRoom = this.state.rooms[0];

            publicRoom.messages.push({ from, message });

            let rooms = this.state.rooms;
            rooms[0] = publicRoom;

            this.setState({
                rooms: rooms
            })
        })

        socket.on('new-private-message', data => {
            const { from, id } = data;

            let rooms = this.state.rooms;

            for (let room of rooms) {
                if (room.id == id) {
                    room.messages.push({ from, message: data.message });
                    room.id = id;
                    return;
                }

                if (room.from == from) {
                    room.messages.push({ from, message: data.message });
                    room.id = id;
                    return;
                }
            }


            this.setState({
                rooms: [...this.state.rooms, { name: from, from: this.state.email, to: from, id, messages: [...[], { from, message: data.message }] }]
            });
        });

        socket.on('public-member-joined', data => {
            const { email } = data;
            const { rooms } = this.state;

            let newRooms = rooms;
            newRooms[0].messages.push({ from: 'SERVER', message: `${email} has joined!` });


            this.setState({
                rooms: newRooms
            });
        });

        socket.on('public-member-left', data => {
            const { email } = data;
            const { rooms } = this.state;

            let newRooms = rooms;
            newRooms[0].messages.push({ from: 'SERVER', message: `${email} has left!` });


            this.setState({
                rooms: newRooms
            });
        })

        // Commented out for development testing purposes
        // window.addEventListener("beforeunload", this.onUnload.bind(this));
    }

    componentWillUnmount() {
        // window.removeEventListener("beforeunload", this.onUnload.bind(this));
    }

    onUnload(e) {
        const { socket } = this.props;
        const { email } = this.state;

        socket.emit('force-disconnect', { email });
    }

    handleAddMessage(message) {
        const { email, room } = this.state;
        const { socket } = this.props;

        if (this.state.room.id === 0) {
            socket.emit('push-public-message', {
                from: email,
                message
            });
        } else {
            socket.emit('push-private-message', {
                id: room.id,
                from: email,
                to: room.to,
                message
            })
        }

        socket.emit('stop-typing', { email });
    }

    handleOnTyping() {
        const { email, typing } = this.state;
        const { socket } = this.props;

        if (typing.includes(email)) return;

        socket.emit('start-typing', { email });
    }

    handleCreateRoom(user) {
        const { rooms, email } = this.state;

        for (const room of rooms) {
            if (room.name == user.email) {
                return;
            }
        }

        this.setState({
            rooms: [...this.state.rooms, { id: null, from: email, to: user.email, name: user.email, messages: [] }]
        });
    }

    handleChangeRoom(room) {
        const { socket } = this.props;
        const { email } = this.state;

        this.setState({
            room: room
        },
            () => {
                if (room.id === 0) socket.emit('join-public-message', { email });
                else socket.emit('leave-public-message', { email });
            }
        )
    }

    render() {
        const { onlineUsers, email, messages, typing, rooms, room, publicMembers } = this.state;

        return (
            <Layout>
                <OnlineUsers createRoom={(user) => this.handleCreateRoom(user)} email={email} onlineUsers={onlineUsers} />
                <MyMessages changeRoom={(room) => this.handleChangeRoom(room)} rooms={rooms} />
                <ChatLayout room={room} onTyping={() => this.handleOnTyping()} typing={typing} addMessage={(message) => this.handleAddMessage(message)} messages={messages} email={email} />
            </Layout>
        );
    }

}

export default withRouter(ChatContainer);