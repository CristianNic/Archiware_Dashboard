import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../utils/Auth';
import { Divider } from 'semantic-ui-react';
import { Tab, Menu, Segment, Icon, Button } from 'semantic-ui-react';
// import SrvInfo from "../components/Tables/SrvInfo/SrvInfo";
// import LicenseResources from "../components/Tables/LicenseResources/LicenseResources";
// import Devices from "../components/Tables/Devices/Devices";
import Client from "../components/Tables/Client/Client";
// import Jukebox from "../components/Tables/Jukebox/Jukebox";
// import Pool from "../components/Tables/Pool/Pool";
// import Jobs from "../components/Tables/Jobs/Jobs";
import MenuHeading from "../components/Menu/Menu"
import Tabs from "../components/Tabs/Tabs"
import Sidebar from "../components/Sidebar/Sidebar"

// activeServer // displayedServer  

// const second = "===> Second URL"

class Dashboard extends Component {
  
  state = {
    isLoaded: true,
    activeServer: 'BackupServerMini',  
    // url: "===> First URL"
  }

  componentDidMount() {
  }

  // selectServerClick = (e, { name }) =>
  //   this.setState({
  //     activeServer: name,
  //     // url: firstOne
  //   })
  
  selectServerClick = (e, { name }) => {

    if (name === "BackupServerMini") {
      this.setState({
        activeServer: name,
        // url: "===> First URL"
      })
      this.forceUpdate()
    } else if (name === "MunkiServer") {
      this.setState({
        activeServer: name,
        // url: second
      })
      this.forceUpdate()
    } else if (name === "MockAPI") {
      this.setState({
        activeServer: name,
        // url: "===> Third URL"
      })
      // this.forceUpdate()
    }
  }

  refreshData() {
  }

  getServerNames() {
  }
  
  render() {

    console.log("1. Dashboard: activeServer", this.state.activeServer)
    // console.log("1. Dashboard: url", this.state.url)

    return (
      <section className="dashboardv2">
        <div className="dashboardv2__container">

          <div className="header">
            {/* <Menu>
              <Menu.Item>
                <Button primary>Sign up</Button>
              </Menu.Item>
              <Menu.Item>
                <Button>Log-in</Button>
              </Menu.Item>
            </Menu> */}
          </div>

          <div className="dashboardv2__sidebar-container">
            <Sidebar className="sidebar"/>          
          </div>

          {/* <Sidebar /> */}
          <Tabs
            activeServer={this.state.activeServer}
            selectServerClick={this.selectServerClick}
          />


          {/* <Segment attached='bottom'>
              <Client
                server={this.state.activeServer}
                // selectServerClick={this.selectServerClick}
          />
          </Segment> */}

          {/* <Segment attached='bottom'>
              <Client
                server={this.state.activeServer}
                // selectServerClick={this.selectServerClick}
          />
          </Segment> */}

          {/* <Client className="dashboard__client"/> 
          <Divider/> */}
          
        </div>
      </section>
    )
  }
}

export default Dashboard


    // const TabExampleDefaultActiveIndex = () => ( <Tab panes={panes} defaultActiveIndex={2} />)
    // export default TabExampleDefaultActiveIndex
    // Controlling Tab pane re-renders
    // renderActiveOnly (default) Only the active pane is rendered. Switching tabs unmounts the current pane and mounts the new pane.
    // renderActiveOnly={false} All panes are rendered on Tab mount. Switching tabs hides the current pane and shows the new pane, without unmounting panes.
    // https://react.semantic-ui.com/modules/tab/#types-basic
    // https://stackoverflow.com/questions/49538086/how-can-i-make-sematic-ui-react-tab-responsive
    // Expandable Table https://codesandbox.io/s/expandable-table-in-semantic-ui-react-hu6yt

          // <Tab panes={panes} defaultActiveIndex={0} renderActiveOnly={false} />
          //   <Tab.Pane>Tab 1 Content</Tab.Pane>
          //   <Tab.Pane> <SrvInfo className="dashboardv2__srvinfo"/></Tab.Pane>
          // <Tab/> 
          // <Menu
          //   items={[
          //     { key: '1', name: 'Backup-Server-Mini', content: 'Backup Server Mini' },
          //     { key: '2', name: 'Munki-Server', content: 'Munki Server' },
          //     { key: '3', name: 'Mock-API', content: 'Mock API' },
          //   ]}
          //   pointing
          //   tabular
          // />
            
          // <Menu className=""
          //   items={[
          //     { key: '1', name: 'Backup-Server-Mini', content: 'Backup Server Mini' },
          //     { key: '2', name: 'Munki-Server',       content: 'Munki Server' },
          //     { key: '3', name: 'Mock-API',           content: 'Mock API' },
          //   ]}
          //   pointing
          // />

          // <MenuHeading />


            //           <Sidebar className="sidebarMaybe"
            //   as={Menu}
            //   icon='labeled'
            //   vertical
            //   visible
            //   width='thin'
            //   >
            //   <Menu.Item as='a'>
            //     <Icon name='home' /> Home
            //   </Menu.Item>
            //   <Menu.Item as='a'>
            //     <Icon name='gamepad' /> Games
            //   </Menu.Item>
            //   <Menu.Item as='a'>
            //     <Icon name='camera' /> Channels
            //   </Menu.Item>
            // </Sidebar >
              


