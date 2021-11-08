import React, { Component } from "react";
import axios from 'axios';
import {
  Button, Divider, Table,
} from 'semantic-ui-react';
// import Timer from '../components/Timer/Timer'
// import CountDownTimer from '../components/CountDownTimer/CountDownTimer'
// const hoursMinSecs = { hours: 0, minutes: 0, seconds: 7 }
import Refresh from "../components/Refresh/Refresh";
import SrvInfoTable from "../components/Tables/SrvInfo/SrvInfo";
import DeviceTable from "../components/Tables/Device/Device";

const API_URL = "http://localhost:8080"

class Dashboard extends Component {
  
  state = {
    HomePage: [],
    SrvInfo: [],
    LicenseResourceNames: [],
    ArchivePlanNames: [],
    ArchiveIndexNames: [],
    DeviceNames: [], 
    DeviceInfo: [],
    DeviceNamesInfo: [],
    ClientNames: [],  
    ClientInfo: [],
    isLoaded: true,
    workingArray: []
  }

  componentDidMount() {
    this.getServerInfo()
    this.getLicenseResourceNames()
    this.getArchivePlanNames()
    this.getArchiveIndexNames()
    // this.getDeviceNames()
    this.getClientNames()

    this.getDeviceNamesInfo()
  }
  
  componentDidUpdate() {
    this.formDeviceNamesInfo() 
  }

  getHomePage() {  
    axios
      .get(`${API_URL}/`)
      .then((response) => {
        // console.log(response)
        this.setState({
          HomePage: response.data.HomePage,
        })
      })
  }  

  getServerInfo() {
    axios
      .get(`${API_URL}/general/srvinfo`)
      .then((response) => {
        // console.log(response)
        this.setState({
          SrvInfo: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getLicenseResourceNames() {  
    axios
      .get(`${API_URL}/license/resources`)
      .then((response) => {
        // console.log(response)
        this.setState({
          LicenseResourceNames: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
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

  getDeviceNames() {  
    axios
      .get(`${API_URL}/general/devices`)
      .then((response) => {
        // console.log("response:", response.data)
        const devices = response.data.map(dev => dev.devices[0].ID)
        // const id = devices.map(dev => dev.devices)
        this.setState({
          DeviceNames: devices,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getDeviceNamesInfo() {
    axios.get(`${API_URL}/general/devices`)
      .then((response) => {
        const devices = response.data.map(dev => dev.devices[0].ID)
        const promises = []
        devices.forEach((device) => {
          promises.push(axios.get(`${API_URL}/general/devices/${device}`))
        })
        return Promise.all(promises).then((response) => {
          const info = response.map(deviceInfo => deviceInfo.data.cleaning)
          const devicesInfoArray = []
          for (let i = 0; i < devices.length; i++) {
            const obj = {
              device: devices[i],
              cleaning: info[i]
            }
            devicesInfoArray.push(obj)
          }
          this.setState({
            DeviceNamesInfo: devicesInfoArray
          })
        });
      })
  }

  getDeviceInfo(deviceID) {
    // Better if it loops through the drives, makes a call for each, populating an array
    axios
      .get(`${API_URL}/general/devices/${deviceID}`) // awst0 or awst1
      .then((response) => {
      console.log(response)
        this.setState({
          DeviceInfo: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  formDeviceNamesInfo(getDeviceInfo) {
    // const devices = this.state.DeviceNames
    // console.log("devices", devices)
    // devices.forEach(device => console.log(device))
  //  devices.forEach(deviceID => getDeviceInfo(deviceID))
    // getDeviceInfo("awst0")
    // console.log("devices:", devices)
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
    this.getServerInfo()
    this.getLicenseResourceNames()
    this.getArchivePlanNames()
    this.getArchiveIndexNames()
    this.getDeviceNames()
    this.getClientNames()
  }
  
  render() {

    // console.log("this.state.DeviceInfo",  this.state.DeviceInfo)
    // console.log("this.state.DeviceNames",  this.state.DeviceNames)
    // console.log("this.state.DeviceNamesInfo",  this.state.DeviceNamesInfo)

    // console.log("Async Get Devices", this.getDevices())
    // console.log("HomePage:",              this.state.HomePage)
    // console.log("SrvInfo:",               this.state.SrvInfo)
    // console.log("LicenseResourceNames:",  this.state.LicenseResourceNames)
    // console.log("ClientNames:",           this.state.LicenseResourceNames.resources)
    // console.log("ArchivePlanNames:",      this.state.ArchivePlanNames)
    // console.log("ArchiveIndexNames:",     this.state.ArchiveIndexNames)
    // console.log("DeviceNames:",           this.state.DeviceNames)
    // // this.getDeviceInfo("awst0")
    // // this.getDeviceInfo("awst1")
    // console.log("DeviceInfo - 'awst1':",  this.state.DeviceInfo)
    // console.log("ClientNames:",           this.state.ClientNames)
    // // this.getClientInfo("jellyfish")
    // console.log("ClientInfo 'jellyfish':", this.state.ClientInfo)

    return (
      <section className="dashboard">
        <div className="dashboard__container">    
          {/* <Refresh
            className="dashboard__refresh"
            refreshData={this.refreshData}/> */}
          <Divider/>
          
          <SrvInfoTable
            className="dashboard__srvinfo"
            SrvInfo={this.state.SrvInfo} />
          <Divider/>

          <DeviceTable
            className="dashboard__devices"
            SrvInfo={this.state.SrvInfo}
            DeviceNames={this.state.DeviceNames}
            DeviceInfo={this.state.DeviceInfo}
            DeviceNamesInfo={this.state.DeviceNamesInfo}/>
          <Divider/>
        </div>
      </section>
    )
  }
}

export default Dashboard