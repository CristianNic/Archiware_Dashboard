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
          // onClick={this.handleItemClick}
          onClick={this.props.selectSidebar}
          >
            <Icon name='sidebar' className= "sidebar-icon left" /> 
          </Menu.Item>

          <Menu.Item header>Archiware P5 Monitoring</Menu.Item>

          <Menu.Item position='right' className="right-side"
            name='login'
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
            >
            <Icon name='user' className='left' />
            Login
          </Menu.Item>
        </Menu>
      </section>
    )
  }
}

export default Header
