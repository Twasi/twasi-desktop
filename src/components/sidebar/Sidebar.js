/**
 * The sidebar component is the visible navigation on the left of the content.
 * Pages can be added with ease.
 *
 * Marco Steiner, 27.11.2018
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

import { getMenuStyle, getHeaderMenuItem } from './_style';

import './_style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        key: 'overview',
        path: '/',
        icon: 'home',
        name: 'Overview'
      },
      {
        key: 'commandexport',
        path: '/export',
        icon: 'code',
        name: 'Befehle'
      },
      {
       key: 'songsync',
       path: '/songsync',
       icon: 'library_music',
       name: 'SongSync'
      },
      {
        key: 'logout',
        path: '/logout',
        icon: 'keyboard_return',
        name: 'Logout'
      }
    ];

    this.handleClick = this.handleClick.bind(this);

    this.resetAnimation = throttle(
      () => {
        this.LogoDOM.src = this.Logo.src;
      },
      2500,
      { trailing: false }
    );
  }

  handleClick(event, value) {
    const { history } = this.props;
    const { path } = find(newItem => newItem.key === value, this.items);
    history.push(path);
    this.setState({});
  }

  render() {
    let { location } = this.props
    let selectedKey = find(item => item.path === location.pathname, this.items);
    if (typeof selectedKey === 'undefined') {
      selectedKey = this.items[0].key;
    } else {
      selectedKey = selectedKey.key;
    }
    const renderItems = () =>
      this.items.map(item => (
        <MenuItem
          style={{ fontSize: 13 }}
          value={item.key}
          key={item.key}
          selected={item.key === selectedKey}
          innerDivStyle={{ padding: '0px 16px 0px 52px' }}
          onClick={event => this.handleClick(event, item.key)}
        >
          <i className="material-icons" style={{ marginRight: '15px' }}>{item.icon}</i>
          { item.name }
        </MenuItem>
      ));

    return (
        <Paper style={getMenuStyle()} className="sidebar">
          <div style={getHeaderMenuItem()}>
            Navigation
          </div>
          <MenuList
            className="Sidebar"
          >
            {renderItems()}
          </MenuList>
        </Paper>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  userName: PropTypes.string
};

export default withRouter(Sidebar);