import React from 'react';
import { Layout, Menu, Avatar } from 'antd';

const MyMessages = props => {

    const renderRoomsMenu = () => {
        const { rooms } = props;

        return rooms.map(room => {
            return (
                <Menu.Item key={room.id} className='room'>
                    <span className="avatar">se</span>
                    <div className='room-info'>
                        <h4 className='room-name'>Public room</h4>
                        <h6 className="room-last-message">da</h6>
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
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
            >
                {renderRoomsMenu()}
            </Menu>
        </Layout.Sider>
    )

}

export default MyMessages;