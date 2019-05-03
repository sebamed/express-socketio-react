import React from 'react';
import { Menu, Icon, Layout } from 'antd';

const OnlineUsers = props => {

    const renderOnlineUsers = () => {
        const { onlineUsers, email } = props;

        return onlineUsers.map(user => {
            return (
                <Menu.Item key={user.email}>
                    <Icon type="user" />
                    <span className="nav-text">{user.email} {user.email == email ? '(YOU)' : ''}</span>
                    <div className="online-status"></div>
                </Menu.Item>
            )
        })
    }

    return (
        <Layout.Sider collapsible width={300} style={{
            overflow: 'auto', height: '100vh', position: 'relative', left: 0,
        }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                {renderOnlineUsers()}
            </Menu>
        </Layout.Sider>
    )

}

export default OnlineUsers;