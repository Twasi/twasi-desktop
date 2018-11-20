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