import React from 'react';
import { Layout } from 'antd';
import ChatFeed from './chat-feed';
import ChatInput from './chat-input';
import ChatHeader from './chat-header';


const ChatLayout = props => {
    const { messages, email, typing } = props;

    return (
        <Layout.Content style={{position: 'relative', height: '100vh'}}>
            <ChatHeader typing={typing} />
            <ChatFeed messages={messages} email={email} />
            <ChatInput onTyping={() => props.onTyping()} addMessage={(message) => props.addMessage(message)} />
        </Layout.Content>
    )

}

export default ChatLayout;