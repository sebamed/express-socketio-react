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
                    id: 0, from: 'everyone', to: 'everyone', name: 'Public Room', messages: [
                        { from: 'email', message: 'Testing testing 1' },
                        { from: 'email', message: 'Testing testing 2' },
                        { from: 'email', message: 'Testing testing 3' },
                    ]
                },
            ],
            room: {},
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        const { email } = this.state;

        this.setState({room: this.state.rooms[0]});

        if (!email) {
            this.props.history.push('/');
        }

        socket.emit('get-online-users');

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
            const { user, message } = data;

            this.setState({
                messages: [...this.state.messages, { user, message }]
            })
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
        const { email } = this.state;
        const { socket } = this.props;

        socket.emit('push-public-message', {
            user: { email },
            message
        });

        socket.emit('stop-typing', { email });
    }

    handleOnTyping() {
        const { email, typing } = this.state;
        const { socket } = this.props;

        if (typing.includes(email)) return;

        socket.emit('start-typing', { email });
    }

    handleChooseUser(user) {
        const { rooms, email } = this.state;

        for(const room of rooms) {
            if(room.name == user.email) {
                console.log(room)
                console.log(user.email)
                return;
            }
        }

        this.setState({
            rooms: [...this.state.rooms, { id : this.state.rooms.length, from: email, to: user.email, name: user.email, messages: [] }]
        });
    }

    handleChangeRoom(room) {
        this.setState({
            room: room
        })
    } 
        
    

    render() {
        const { onlineUsers, email, messages, typing, rooms, room } = this.state;

        return (
            <Layout>
                <OnlineUsers chooseUser={(user) => this.handleChooseUser(user)} email={email} onlineUsers={onlineUsers} />
                <MyMessages changeRoom={(room) => this.handleChangeRoom(room)} rooms={rooms} />
                <ChatLayout room={room} onTyping={() => this.handleOnTyping()} typing={typing} addMessage={(message) => this.handleAddMessage(message)} messages={messages} email={email} />
            </Layout>
        );
    }

}

export default withRouter(ChatContainer);