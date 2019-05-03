import React from 'react';
import { Avatar } from 'antd';

const ChatFeed = props => {

    const renderChatMessages = () => {
        const { messages, email } = props;
        console.log(messages)
        console.log(email)

        return messages.map((message, i) => {
            return (
                <div className={`message-container  ${message.user.email == email ? 'right' : 'left'}`}>
                    {i > 0 && messages[i - 1].user.email == message.user.email ?
                        // display message without avatar
                        <div className="message">
                            <div className="avatar-placeholder"></div>
                            <div className="text-without-avatar">
                                {message.message}
                            </div>
                        </div>
                        :
                        // display message with avatar
                        <div className="message message-with-avatar">                       
                            <Avatar style={{ backgroundColor: '#008cba', verticalAlign: 'middle' }} size="large">
                                <span>{message.user.email.toString().substring(0, 2).toUpperCase()}</span>
                            </Avatar>
                            <div className="text">
                                {message.message}
                            </div>
                        </div>
                    }
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