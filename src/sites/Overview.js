/**
 * Overview is the page that is displayed under the overview entry in the sidebar.
 * It returns the InfoTiles, which can show general stats.
 *
 * Marco Steiner, 27.11.2018
 */

import React, { Component } from 'react';
import InfoTiles from '../components/info-tiles/InfoTiles';

class Overview extends Component {
    render() {
        return (
            <div>
                <p className="siteTitle">Overview</p>
                <div className="tiles">
                    <InfoTiles />
                </div>
            </div>
        );
    }
}

export default Overview;