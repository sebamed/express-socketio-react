import React from 'react';
import { Layout, Menu, Avatar } from 'antd';

const MyMessages = props => {

    const renderRoomsMenu = () => {
        const { rooms } = props;

        return rooms.map(room => {
            return (
                <Menu.Item key={room.id} className='room'>
                    <span className="avatar">{room.name.toString().substring(0,2)}</span>
                    <div className='room-info'>
                        <h4 className='room-name'>{room.name}</h4>
                        <h6 className="room-last-message">{room.messages.length > 0 ? room.messages[room.messages.length - 1].message : 'No messages yet!'}</h6>
                    </div>
                </Menu.Item>
            )
        })
    }

    return (
        <Layout.Sider width={400} style={{
            backgroundColor: '#fefefe',
            overflow: 'auto', height: '100vh', position: 'relative', left: 0,
        }}>
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                style={{ height: '100%' }}
            >
                {renderRoomsMenu()}
            </Menu>
        </Layout.Sider>
    )

}

export default MyMessages;