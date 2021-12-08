import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

class Sidebar extends Component {

  state = { }

  render() {
    const { activePage, selectPageClick } = this.props

    return (
      <div className="menu-container">
        <Menu vertical className="sidebar-menu">
          <Menu.Item
            name='status'
            active={activePage === 'status'}
            onClick={selectPageClick}
          >
            <Icon name='folder' className='left' />
            {/* <Icon name='clipboard left' /> */}
              Status
            <Icon name='angle right' />
          </Menu.Item>
          <Menu.Item
            name='archive'
            active={activePage === 'archive'}
            onClick={selectPageClick}
          >
            {/* <Icon name='hdd left' /> */}
            <Icon name='archive' className='left' />
              Archive Index
            <Icon name='angle right' />
            
          </Menu.Item>
          <Menu.Item
            name='graphs'
            active={activePage === 'graphs'}
            onClick={selectPageClick}
          >
            <Icon name='area graph' className='left' />
              Graphs
            <Icon name='angle right' />
          </Menu.Item>
          <Menu.Item
            name='alerts'
            active={activePage === 'alerts'}
            onClick={selectPageClick}
          >
            <Icon name='alarm' className='left' />
            {/* <Icon name='mail left' /> */}
            Alerts 
            <Icon name='angle right' />
          </Menu.Item>
          <Menu.Item
            name='settings'
            active={activePage === 'settings'}
            onClick={selectPageClick}
          >
            <Icon name='wrench' className='left' />
            {/* <Icon name='settings left' /> */}
            {/* <Icon name='setting left' /> */}
              Settings
            <Icon name='angle right'/>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Sidebar

