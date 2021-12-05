import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuHeading extends Component {

  render() {

    return (
      <div className="server-menu__container">
        <Menu className="server-menu">
          <Menu.Item
            name='BackupServerMini'
            active={this.props.activeServer === 'BackupServerMini'}
            onClick={this.props.selectServerClick}
          />
          <Menu.Item
            name='MunkiServer'
            active={this.props.activeServer === 'MunkiServer'}
            onClick={this.props.selectServerClick}
          />
          <Menu.Item
            name='MockAPI'
            active={this.props.activeServer === 'MockAPI'}
            onClick={this.props.selectServerClick}
          />
        </Menu>
      </div>
    )
  }
}
