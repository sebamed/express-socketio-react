import React from 'react';
import { Layout } from 'antd';
import ChatFeed from './chat-feed';
import ChatInput from './chat-input';


const ChatLayout = props => {
    const { messages, email } = props;

    return (
        <Layout.Content style={{position: 'relative', height: '100vh'}}>
            <ChatFeed messages={messages} email={email} />
            <ChatInput addMessage={(message) => props.addMessage(message)} />
        </Layout.Content>
    )

}

export default ChatLayout;