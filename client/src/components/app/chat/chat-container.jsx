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
            messages: [
                { user: { email: 'seba.med@yahoo.com' }, message: 'This is my first message!' },
                { user: { email: 'seba.med@yahoo.com' }, message: 'This is my second message!' },
                { user: { email: 'teba.med@yahoo.com' }, message: 'This is my new message!' },
                { user: { email: 'teba.med@yahoo.com' }, message: 'This is my last message!' },
            ]
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

    render() {
        const { onlineUsers, email, messages } = this.state;

        return (
            <Layout>
                <OnlineUsers email={email} onlineUsers={onlineUsers} />
                <ChatLayout messages={messages} email={email} />
            </Layout>
        );
    }

}

export default withRouter(ChatContainer);