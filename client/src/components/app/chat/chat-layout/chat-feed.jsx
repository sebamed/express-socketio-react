import React from 'react';
import { Avatar } from 'antd';

const ChatFeed = props => {

    const renderChatMessages = () => {
        const { messages, email } = props;

        return messages.map(message => {
            return (
                <div className="message-container left">
                    <div className="message">
                        <Avatar style={{ backgroundColor: '#008cba', verticalAlign: 'middle' }} size="large">
                            <span>{message.user.email.toString().substring(0, 2).toUpperCase()}</span>
                        </Avatar>
                        <div className="text">
                            {message.message}
                        </div>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="chat-feed-container">
            {renderChatMessages()}
        </div>
    );

}

export default ChatFeed;