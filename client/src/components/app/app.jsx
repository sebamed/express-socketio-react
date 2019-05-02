import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Login from './login/login';

const App = props => {
    return (
        <Router>
            <Switch>
                <Route path='' render={() => <Login />} />
            </Switch>
        </Router>
    )
}

export default App;