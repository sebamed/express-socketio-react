import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import OnlineUsers from './online-users/online-users';

class ChatContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: [],
            email: this.props.location.state.email
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

        window.addEventListener("beforeunload", this.onUnload.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload.bind(this));
    }

    onUnload(e) {
        const { socket } = this.props;
        const { email } = this.state;

        console.log('disconnecting')
        console.log(email)

        socket.emit('force-disconnect', { email });

        e.returnValue = 'test'
    }

    render() {
        const { onlineUsers } = this.state;

        return (
            <Layout>
                <OnlineUsers onlineUsers={onlineUsers} />
            </Layout>
        );
    }

}

export default withRouter(ChatContainer);