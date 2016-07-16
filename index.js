import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import Login from './src/pages/login'
import Register from './src/pages/register'
import Feed from './src/pages/feed'
import SitterProfile from './src/pages/sitters'
import Invite from './src/pages/invite'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/feed" component={Feed}/>
        <Route path="/sitters/:sitter" component={SitterProfile}/>
        <Route path="/sendInvite" component={Invite}/>
    </Router>
), document.getElementById('app'));
