import React, { Component } from 'react';
import APIConnector from '../api/APIConnector';
class CommandExport extends Component {

    constructor(props) {
        super(props);
        this.remote = window.require("electron").remote;
    }

    exportCommands() {
        APIConnector.ready(() => {
            APIConnector.doPanelRequest("commands{id, name, content}", "commands")
                .then(result => {console.log(result)})
        });
    }

    render() {
        return (
            <button onClick={this.exportCommands}>Export</button>
        );
    }
}

export default CommandExport;