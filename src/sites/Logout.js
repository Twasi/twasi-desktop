/**
 * This logout components logs you out once it would become visible on screen.
 * It makes the connection to electron and emits the logout event.
 *
 * Lars Bärtschi, 27.11.2018
 */

import React, { Component } from 'react';

class Logout extends Component {
    componentDidMount() {
        this.remote = window.require('electron').remote;
        this.remote.app.emit("logout");
    }

    render() {
        return (
            <p>Logout/</p>
        );
    }
}

export default Logout;

