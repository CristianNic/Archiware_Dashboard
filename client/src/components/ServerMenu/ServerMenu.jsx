import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuHeading extends Component {

  render() {

    const { activeServer, selectServerClick, sidebar } = this.props

    return (
      <div className="server-menu__container">
        <Menu className={`server-menu ${sidebar === true ? "padding" : ""}`}>
          <Menu.Item
            name='LemonadeFilms'
            active={activeServer === 'LemonadeFilms'}
            onClick={selectServerClick}
          />
          <Menu.Item
            name='EagleCreekStudios'
            active={activeServer === 'EagleCreekStudios'}
            onClick={selectServerClick}
          />
          <Menu.Item
            name='BridgeStudios'
            active={activeServer === 'BridgeStudios'}
            onClick={selectServerClick}
          />
        </Menu>
      </div>
    )
  }
}