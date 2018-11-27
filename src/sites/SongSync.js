/**
 * The SongSync component manages the view and logic of the SongSync functionality.
 *
 * Lars Bärtschi, 27.11.2018
 */

import React, {Component} from 'react';
import APIConnector from '../api/APIConnector';
import Switch from '@material-ui/core/Switch';

class SongSync extends Component {

    constructor(props) {
        super(props);

        this.state = {isDisabled: true};

        this.toggleButton = this.toggleButton.bind(this);
        this.songSync = this.songSync.bind(this);
    }

    toggleButton(e, checked) {
        this.setState({isDisabled: !checked});
    }

    songSync() {
        const component = this;
        const app = window.require('electron').remote;
        const fs = window.require('fs');
        const dialog = app.dialog;

        function updateFile(folderPath) {
            APIConnector.ready(() => {
                APIConnector.doPanelRequest("current{status, secondsIn, request{song{name}}}", "songrequest")
                    .then(result => {
                        let commandToExport = result.current.request.song.name;
                        fs.writeFile(folderPath[0] + '\\SongExport.txt', commandToExport, (err) => {
                            if (err) {
                                alert("An error occurred creating the file " + err.message)
                            }
                            console.log(component);
                            if (!component.state.isDisabled) {
                                setTimeout(() => updateFile(folderPath), 5000);
                            }
                        });
                    })
            });
        }

        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, function (folderPath) {
            if (folderPath === undefined) {
                console.log("You didn't choose a folder");
            } else {
                updateFile(folderPath);
                setTimeout(() => updateFile(folderPath), 5000);
            }
        });
    }

    render() {
        return (
            <div>
                <p>Welcome to SongSync</p>
                <Switch onChange={this.toggleButton} className="syncSwitch"/>
                <button onClick={this.songSync} className={"syncButton"} disabled={this.state.isDisabled}>choose path
                </button>
            </div>
        );
    }
}

export default SongSync;