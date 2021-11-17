import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../utils/Auth';
import { Divider, Tab, Menu } from 'semantic-ui-react';
// import Timer from '../components/Timer/Timer'
// import CountDownTimer from '../components/CountDownTimer/CountDownTimer'
// const hoursMinSecs = { hours: 0, minutes: 0, seconds: 7 }
// import Refresh from "../components/Refresh/Refresh";
import SrvInfo from "../components/Tables/SrvInfo/SrvInfo";
import Devices from "../components/Tables/Devices/Devices";
import LicenseResources from "../components/Tables/LicenseResources/LicenseResources";
import Jukebox from "../components/Tables/Jukebox/Jukebox";
import Pool from "../components/Tables/Pool/Pool";
import Jobs from "../components/Tables/Jobs/Jobs";

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

class Dashboard extends Component {
  
  state = {
    HomePage: [],
    ArchivePlanNames: [],
    ArchiveIndexNames: [],
    ClientNames: [],  
    ClientInfo: [],
    isLoaded: true,
  }

  componentDidMount() {
    // this.getHomePage()
  }
  
  componentDidUpdate() {
  }

  getHomePage() {  
    axios
      .get(`${API_URL}/`, auth)
      .then((response) => {
        console.log("getHomePage()", response)
        this.setState({
          HomePage: response.data.HomePage,
        })
      })
  }  

  getArchivePlanNames() {  
    axios
      .get(`${API_URL}/archive/plans`)
      .then((response) => {
        // console.log(response)
        this.setState({
          ArchivePlanNames: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getArchiveIndexNames() {  
    axios
      .get(`${API_URL}/archive/indexes`)
      .then((response) => {
        // console.log("response", response.data)
        this.setState({
          ArchiveIndexNames: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getClientNames() {
    axios
      .get(`${API_URL}/general/clients`)
      .then((response) => {
      //  console.log(response)
        this.setState({
          ClientNames: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getClientInfo(clientID) {
    axios
      .get(`${API_URL}/general/clients/${clientID}`)  // jellyfish
      .then((response) => {
      //  console.log(response)
        this.setState({
          ClientInfo: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  // countDown() {
  //   // Remove one second, set state so a re-render happens.
  //   const seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });
    
  //   // Check if we're at zero.
  //   if (seconds == 0) { 
  //     clearInterval(this.timer);
  //   }
  // }

  refreshData() {
    console.log("onClick Button - Refreshed Data")
    // reload page 
  }
  
  render() {

    // console.log("Dashboard - API_URL", API_URL)
    // console.log("Dashboard - USERNAME", USERNAME)
    // console.log("Dashboard - PASSWORD", PASSWORD)
    // console.log("Dashboard - auth", auth)
    
    // const TabExampleDefaultActiveIndex = () => ( <Tab panes={panes} defaultActiveIndex={2} />)
    // export default TabExampleDefaultActiveIndex
    // Controlling Tab pane re-renders
    // renderActiveOnly (default) Only the active pane is rendered. Switching tabs unmounts the current pane and mounts the new pane.
    // renderActiveOnly={false} All panes are rendered on Tab mount. Switching tabs hides the current pane and shows the new pane, without unmounting panes.
    // https://react.semantic-ui.com/modules/tab/#types-basic
    // https://stackoverflow.com/questions/49538086/how-can-i-make-sematic-ui-react-tab-responsive
    // Expandable Table https://codesandbox.io/s/expandable-table-in-semantic-ui-react-hu6yt

    return (
      <section className="dashboard">
        <div className="dashboard__container">

          {/* <Tab panes="panes" defaultActiveIndex={2} />
            <Tab.Pane>Tab 1 Content</Tab.Pane>
            <Tab.Pane>Tab 2 Content</Tab.Pane>
            <Tab.Pane>Tab 3 Content</Tab.Pane>
          <Tab/> */}

          {/* <Menu
            items={[
              { key: '1', name: 'link-1', content: 'Link' },
              { key: '2', name: 'link-2', content: 'Link' },
              { key: '3', name: 'link-3', content: 'Link' },
            ]}
            pointing
            tabular
          /> */}
          {/* <Menu
            items={[
              { key: 'l1', name: 'link-1', content: 'Link' },
              { key: 'l2', name: 'link-2', content: 'Link' },
              { key: 't1', name: 'text-1', content: 'Right text', position: 'right' },
            ]}
            pointing
          /> */}

          {/* <Refresh
            className="dashboard__refresh"
            refreshData={this.refreshData}/> */}
            <Divider/>
          <SrvInfo className="dashboard__srvinfo"/>
            <Divider/>
          <Devices className="dashboard__devices"/>
            <Divider/>
          <LicenseResources className="dashboard__licenseResources" />
            <Divider/>
          <Jukebox className="dashboard__jukebox" />
            <Divider />         
          <Pool className="dashboard__pool" />
            <Divider />
          <Jobs className="dashboard__jobs" />
            <Divider/>
          
        </div>
      </section>
    )
  }
}

export default Dashboard