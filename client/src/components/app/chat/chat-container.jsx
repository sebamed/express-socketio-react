import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import OnlineUsers from './online-users/online-users';
import ChatLayout from './chat-layout/chat-layout';

class ChatContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: [],
            email: this.props.location.state.email,
            messages: [],
            typing: []
        }
    }

    componentDidMount() {
        const { socket } = this.props;
        const { email } = this.state;

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

        console.log('disconnecting')
        console.log(email)

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

        if(typing.includes(email)) return;

        socket.emit('start-typing', { email });
    }

    render() {
        const { onlineUsers, email, messages, typing } = this.state;

        return (
            <Layout>
                <OnlineUsers email={email} onlineUsers={onlineUsers} />
                <ChatLayout onTyping={() => this.handleOnTyping()} typing={typing} addMessage={(message) => this.handleAddMessage(message)} messages={messages} email={email} />
            </Layout>
        );
    }

}

export default withRouter(ChatContainer);