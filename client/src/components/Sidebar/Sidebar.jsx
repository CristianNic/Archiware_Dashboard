import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {
  state = {
    activeServer: "100.234.536.413"
  }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  // added --> 
  // active={activeItem === 'status'}
  // onClick={this.handleItemClick}
  // onClick = { this.handleItemClick }

  render() {
    const { activePage, selectPageClick} = this.props

    // console.log("Sidebar", activeItem)

    const activeServer = this.props.activeServer

    return (
      <div className="menu-container">
        <Menu vertical className="sidebar-menu">
          <Menu.Item
            as={NavLink} to="/status"
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
            as={NavLink} to="/archive"
            name='archiveIndex'
            active={activePage === 'archiveIndex'}
            onClick={selectPageClick}
          >
            {/* <Icon name='hdd left' /> */}
            <Icon name='archive' className='left' />
              Archive Index
            <Icon name='angle right' />
            
          </Menu.Item>
          <Menu.Item
            as={NavLink} to="/graphs"
            name='graphs'
            active={activePage === 'graphs'}
            onClick={selectPageClick}
          >
            <Icon name='area graph' className='left' />
              Graphs
            <Icon name='angle right' />
          </Menu.Item>
          <Menu.Item
            as={NavLink} to="/alerts"
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
            // as={NavLink} to="/settings"

            as={NavLink} to={{
              pathname: "/settings",
              aboutProps: {
                activeServer: activeServer,
                activePage: "settings",

              }
            }}


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

