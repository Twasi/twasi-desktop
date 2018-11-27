/**
 * Error404 component is displayed if a page is request that does not exist or is not registered.
 *
 * Marco Steiner, 27.11.2018
 */

import React, { Component } from 'react';

class Overview extends Component {
    render() {
        return (
            <p>Oh no, we can't find you requested page :/</p>
        );
    }
}

export default Overview;