import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';


import { getMenuStyle, getHeaderMenuItem, getActiveMenuItem } from './_style';

import './_style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        key: 'overview',
        path: '/',
        icon: 'home',
        name: 'sidebar.overview'
      },
      {
        key: 'status',
        path: '/status',
        icon: 'info',
        name: 'sidebar.status'
      },
      {
        key: 'profile',
        path: '/profile',
        icon: 'account_box',
        name: 'sidebar.profile'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'store',
        name: 'sidebar.plugins'
      },
      {
        key: 'commands',
        path: '/commands',
        icon: 'code',
        name: 'sidebar.commands'
      },
      {
        key: 'songrequests',
        path: '/songrequests',
        icon: 'library_music',
        name: 'sidebar.songrequests'
      },
      {
        key: 'giveaways',
        path: '/giveaways',
        icon: 'redeem',
        name: 'sidebar.giveaways'
      },
      {
        key: 'urlshortener',
        path: '/urlshortener',
        icon: 'link',
        name: 'sidebar.urlshortener'
      },
      {
        key: 'fakechat',
        path: '/fakechat',
        icon: 'vertical_split',
        name: 'sidebar.fakechat'
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
    const { location, intl } = this.props;

    let selectedKey = 'fakechat' //find(item => item.path === location.pathname, this.items);
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
      <div>
        <Hidden mdDown>
          <Paper style={getMenuStyle()} className="sidebar">
            <div style={getHeaderMenuItem()}>
              "asdasd"
            </div>
            <MenuList
              className="Sidebar"
            >
              {renderItems()}
            </MenuList>
          </Paper>
          <Paper style={getMenuStyle()} className="sidebar sidebarSecondary">
            <MenuList
              className="Sidebar"
            >
              <MenuItem
                style={{ fontSize: 13 }}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                onClick={() => window.open('https://docs.twasi.net', '_blank')}
              >
                <i className="material-icons" style={{ marginRight: '15px' }}>language</i>
                Docs
              </MenuItem>
              <MenuItem
                style={{ fontSize: 13 }}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                onClick={() => {
                  localStorage.clear();
                  window.location = 'https://twasi.net';
                }}
              >
                <i className="material-icons" style={{ marginRight: '15px' }}>keyboard_return</i>
                Logout
              </MenuItem>
            </MenuList>
          </Paper>
        </Hidden>
      </div>
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
  intl: "intlShape",
  userName: PropTypes.string
};

const mapStateToProps = state => ({
  userName: "breadly"
});

export default Sidebar;