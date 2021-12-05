import React, { Component } from "react";
import { Icon, Menu } from 'semantic-ui-react';
  
class Header extends Component {

  state = { activeItem: [] }

  componentDidMount() {
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <section className="dashboard-header__container">
        <Menu className="dashboard-header">
          <Menu.Item
          name='sidebar'
          active={activeItem === 'sidebar'}
          onClick={this.handleItemClick}
          >
            <Icon name='sidebar left' className= "sidebar-icon" /> 
          </Menu.Item>

          <Menu.Item header>Archiware P5 Monitoring</Menu.Item>

          <Menu.Item position='right' className="right-side"
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            >
            <Icon name='user left' />
            Login
          </Menu.Item>
        </Menu>
      </section>
    )
  }
}

export default Header
