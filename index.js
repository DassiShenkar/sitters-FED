import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import Login from './src/modules/Login'
import Register from './src/modules/Register'
import Feed from './src/modules/Feed'

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/feed" component={Feed}/>
    </Router>
), document.getElementById('app'));
