import React from 'react';
import { Layout } from 'antd';
import ChatFeed from './chat-feed';


const ChatLayout = props => {
    const { messages, email } = props;

    return (
        <Layout.Content>
            <ChatFeed messages={messages} email={email} />
        </Layout.Content>
    )

}

export default ChatLayout;