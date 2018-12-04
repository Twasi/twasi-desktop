/**
 * Header is the visible component on top of the application, which shows the current logged in user.
 *
 * Marco Steiner, 04.12.2018
 */

import React, { Component } from 'react';
import './Header.css';
import APIConnector from '../../api/APIConnector';

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "checking..."
        }

        this.getUserName()
    }

    getUserName() {
        APIConnector.ready(() => {
            APIConnector.getUserInfo().then((x) => {
                this.state.username = x.user.twitchAccount.email
                this.setState(this.state);
            });
        });
    }

    render() {
        return (
            <div className="background">
                <div className="header" />
                <p id="username">{  this.state.username  }</p>
            </div>
        );
    }
}

export default Header;
