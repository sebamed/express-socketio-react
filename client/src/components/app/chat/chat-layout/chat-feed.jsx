import React from 'react';
import { Avatar, Tooltip } from 'antd';

class ChatFeed extends React.Component {

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    renderChatMessages = () => {
        const { room, email } = this.props;
        const { messages = [] } = room;

        return messages.map((message, i) => {
            return (
                <div className={`message-container  ${message.from == email ? 'right' : 'left'}`}>
                    {i > 0 && messages[i - 1].from == message.from ?
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
                            <Tooltip placement={message.from == email ? 'topRight' : 'topLeft'} title={message.from}>
                                <Avatar style={{ backgroundColor: '#008cba', verticalAlign: 'middle' }} size="large">
                                    <span>{message.from.toString().substring(0, 2).toUpperCase()}</span>
                                </Avatar>
                            </Tooltip>
                            <div className="text">
                                {message.message}
                            </div>
                        </div>
                    }
                </div>
            );
        });
    }

    render() {
        return (
            <div className="chat-feed-container">
                {this.renderChatMessages()}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }

}

export default ChatFeed;