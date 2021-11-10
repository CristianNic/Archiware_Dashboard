import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../utils/Auth';
import { Divider } from 'semantic-ui-react';
// import Timer from '../components/Timer/Timer'
// import CountDownTimer from '../components/CountDownTimer/CountDownTimer'
// const hoursMinSecs = { hours: 0, minutes: 0, seconds: 7 }
// import Refresh from "../components/Refresh/Refresh";
import SrvInfoTable from "../components/Tables/SrvInfo/SrvInfo";
import DeviceTable from "../components/Tables/Device/Device";
import LicenseResourceTable from "../components/Tables/LicenseResource/LicenseResource";

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
    this.getHomePage()
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

    console.log("Dashboard - API_URL", API_URL)
    
    return (
      <section className="dashboard">
        <div className="dashboard__container">    
          {/* <Refresh
            className="dashboard__refresh"
            refreshData={this.refreshData}/> */}
          <Divider/>
          <SrvInfoTable
            className="dashboard__srvinfo"
            SrvInfo={this.state.SrvInfo}
          />
          <Divider/>
          <DeviceTable
            className="dashboard__devices"
            DeviceNames={this.state.DeviceNames}
            DeviceInfo={this.state.DeviceInfo}
          />
          <Divider/>
          <LicenseResourceTable
            className="dashboard__devices" />
          <Divider/>
          
        </div>
      </section>
    )
  }
}

export default Dashboard