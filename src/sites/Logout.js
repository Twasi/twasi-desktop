import React, { Component } from 'react';

class Logout extends Component {
    componentDidMount() {
        this.remote = window.require('electron').remote;
        console.log(remote);
    }

    render() {
        return (
            <p>Logout/</p>
        );
    }
}

export default Logout;

