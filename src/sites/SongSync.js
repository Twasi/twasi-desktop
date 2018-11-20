import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

class SongSync extends Component {

    songSync() {


    }
    render() {
        return (
            <div>
                <p>HELLO IM THE Songsnyc XD</p>
                <Switch className="Switchsongsync"/>
                <button onClick={this.songSync}>Sync</button>
            </div>
        );
    }
}

export default SongSync;