import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuHeading extends Component {

  render() {

    const { activeServer, selectServerClick, sidebar } = this.props

    return (
      <div className="server-menu__container">
        <Menu className={`server-menu ${sidebar === true ? "padding" : ""}`}>
          <Menu.Item
            name='BackupServerMini'
            active={activeServer === 'BackupServerMini'}
            onClick={selectServerClick}
          />
          <Menu.Item
            name='MunkiServer'
            active={activeServer === 'MunkiServer'}
            onClick={selectServerClick}
          />
        </Menu>
      </div>
    )
  }
}