/**
 * CommandExport component holds the page content and logic of the
 * command export page.
 *
 * Yvo Hofer, 27.11.2018
 */

import React, {Component} from 'react';
import APIConnector from '../api/APIConnector';

class CommandExport extends Component {

    constructor(props) {
        super(props);
        this.remote = window.require("electron").remote;
    }

    exportCommands() {
        APIConnector.ready(() => {

            APIConnector.doPanelRequest("commands{id, name, content}", "commands")
                .then(result => {

                    const app = window.require('electron').remote;
                    const dialog = app.dialog;
                    const fs = window.require('fs');

                    dialog.showSaveDialog({
                        filters: [{
                            name: 'Text Documents (*.txt)',
                            extensions: ['txt']
                        }]
                    }, (fileName) => {
                        if (fileName === undefined) {
                            console.log("You didn't save the file");
                            return;
                        }

                        fs.writeFile(fileName, JSON.stringify(result), (err) => {
                            if (err) {
                                alert("An error occurred creating the file " + err.message)
                            }

                            alert("The file has been successfully exported");

                        });
                    });
                })
        });

    }

    render() {
        return (
            <div>
                <p>Hey, here you're able to export your custom commands. Have fun!</p>
                <button className="exportButton" onClick={this.exportCommands}>Export</button>
            </div>
        );
    }
}

export default CommandExport;