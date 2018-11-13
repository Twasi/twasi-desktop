import React, { Component } from 'react';

class Overview extends Component {
    componentDidMount() {
        const remote = require('electron').remote;
        console.log(remote);
    }

    render() {
        return (
            <p>Logout/</p>
        );
    }
}

export default Overview;