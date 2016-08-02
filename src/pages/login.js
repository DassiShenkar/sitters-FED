import React from 'react';
import Logo from '../components/Logo';
import '../styles/components/login.scss';

export default class Login extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="login-form">
                <Logo/>
                <h1>Sign In</h1>
                <div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
            </div>
        );
    }
}
