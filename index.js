import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import Login from './src/pages/login'
import Register from './src/pages/register'
import Feed from './src/pages/feed'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/feed" component={Feed}/>
    </Router>
), document.getElementById('app'));
