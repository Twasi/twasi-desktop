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
    
        this.items = [
          {
            title: 'Stream duration',
            query: 'user {stream duration}',
            value: '7 Minutes'
          },
          {
            title: 'Current viewers',
            query: 'user {viewers}',
            value: '7 Viewers'
          }
        ];
    }

    getInfo(key) {
        return key;
    }
    
    render() {
        const renderItems = () =>
            this.items.map(item => (
                <ListItem
                style={getItemStyle()}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                >
                { item.title }:
                <i className="tileValue">{this.getInfo(item.value)}</i>
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