import React, { Component } from 'react';
import APIConnector from '../../api/APIConnector';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { getListStyle, getItemStyle, getTitleStyle } from './_style';

import './_style.css';

class InfoTiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : [
                {
                    title: 'Requested Song',
                    query: 'current/request/song/name',
                    target: 'songrequest',
                    id: 'overviewSongName',
                    value: ""
                },
                {
                    title: 'Song Status',
                    query: 'current/status',
                    target: 'songrequest',
                    id: 'overviewSongStatus',
                    value: ""
                }
          ]
        }
    }

    componentDidMount() {
        this.state.items.forEach(e => {
            this.getInfo(e)
        });
    }

    getInfo(item) {
        var query = "";
        var queryEnd = "";
        var parts = item["query"].split("/");

        parts.forEach(part => {
            queryEnd += "}";
            query += part + "{";
        });

        query = query.slice(0, -1) + queryEnd.slice(0, -1);

        APIConnector.ready(() => {
            APIConnector.doPanelRequest(query, item.target).then(result => {
                var value = result
                parts.forEach(part => {
                    if(!value[part])
                        return
                    value = value[part]
                });
                const newItem = {...item, value}
                
                this.setState({items:[...this.state.items.filter(i => i.id !== item.id), newItem]})
            });
        });
        
    }
    
    render() {
        const renderItems = () =>
            this.state.items.map(item => (
                <ListItem
                key={item.id}
                style={getItemStyle()}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                >
                { item.title }:
                <i className="tileValue">{ item.value }</i>
                </ListItem>
            ));

        return (
            <Paper style={getListStyle()}>
                <div style={getTitleStyle()}>
                    Current Stream
                </div>
                <List className="tileList">
                    {renderItems()}
                </List>
            </Paper>
        );
    }
}

export default InfoTiles;