import React from 'react';
import { Menu, Icon } from 'antd';
import Sider from 'antd/lib/layout/Sider';

const OnlineUsers = props => {

    const renderOnlineUsers = () => {
        const { onlineUsers } = props;

        return onlineUsers.map(user => {
            return (
                <Menu.Item key={user.email}>
                    <Icon type="user" />
                    <span className="nav-text">{user.email}</span>
                </Menu.Item>
            )
        })
    }

    return (
        <Sider collapsible={true} width={300} style={{
            overflow: 'auto',  height: '100vh', position: 'fixed', left: 0,
        }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                {renderOnlineUsers()}
            </Menu>
        </Sider>
    )

}

export default OnlineUsers;