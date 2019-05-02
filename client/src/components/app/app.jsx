import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import io from 'socket.io-client';

import Login from './login/login';
import ChatContainer from './chat/chat-container';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.socket = io('http://localhost:4000');
    }

    handleGoOnline(email) {
        this.socket.emit('go-online', { email })
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/chat-app' exact render={() => <ChatContainer socket={this.socket} />} />
                    <Route path='' exact render={() => <Login goOnline={(email) => this.handleGoOnline(email)} />} />
                </Switch>
            </Router>
        )
    }
}

export default App;