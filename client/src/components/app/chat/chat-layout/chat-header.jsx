import React from 'react';

const ChatHeader = props => {
    const { typing, room } = props;

    return (
        <div className="chat-header">
            <div className="title">
                <h3>
                    {room.name} 
                </h3>
                <h6>
                    {typing.map((email, i) => {
                        if (i < 4) {
                            return (
                                <span key={email}><b>{i === typing.length - 1 ? `${email}` : `${email}, `}</b></span>
                            )
                        } else if (i === 4) {
                            return `and ${typing.length - 4} more`
                        } else {
                            return '';
                        }
                    })}
                    {typing.length === 1 ? ' is typing...' : null}
                    {typing.length > 1 ? ' are typing...' : null}
                </h6>
            </div>
        </div>
    )

}

export default ChatHeader;