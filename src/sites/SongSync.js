import React, {Component} from 'react';
import APIConnector from '../api/APIConnector';
import Switch from '@material-ui/core/Switch';

class SongSync extends Component {

    constructor(props) {

        super(props);
        this.state = {isDisabled: true};
        this.toggleButton = this.toggleButton.bind(this);

    }

    toggleButton(e, checked) {

        this.setState({isDisabled: !checked});

    }

    songSync() {

        const app = window.require('electron').remote;
        const fs = window.require('fs');
        const dialog = app.dialog;

        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, function (folderPath) {

            if (folderPath === undefined) {
                console.log("You didn't choose a folder");
            } else {

                // do all 5 seconds until button is toggled & replace with current song when implemented

                APIConnector.ready(() => {

                    APIConnector.doPanelRequest("commands{id, name, content}", "commands")
                        .then(result => {

                            let commandToExport = result.commands[0].id + "-" + result.commands[0].name + "-" + result.commands[0].content;

                            fs.writeFile(folderPath[0] + '\\SongExport.txt', commandToExport, (err) => {

                                if (err) {
                                    alert("An error occurred creating the file " + err.message)
                                }

                            });

                        })
                });

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