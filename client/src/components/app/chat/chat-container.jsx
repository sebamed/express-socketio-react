import React from 'react';
import { Layout } from 'antd';
import OnlineUsers from './online-users/online-users';

class ChatContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            onlineUsers: []
        }
    }

    componentDidMount() {
        const { socket } = this.props;

        socket.emit('get-online-users');

        socket.on('online-users', onlineUsers => {
            let users = []
            for(let key in onlineUsers) {
                users.push({ email: key, socketId: onlineUsers[key]});
            }

            this.setState({onlineUsers: users});
        })
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

export default ChatContainer;