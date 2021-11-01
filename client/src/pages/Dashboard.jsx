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
    ClientNames: [],  
    ClientInfo: [],   
    isLoaded: true
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

  // async getDevices() {
  //   console.log("2. getDevices called:")
  //   const response = await axios(`${API_URL}/general/devices`)
  //   const devices = response.data.map(dev => dev.devices[0].ID)
  //   console.log("async getDevices", devices) // ['awst0', 'awst1']
  //   // return this.devices = (devices.data) 
  //   // return this.devices = (devices)
  //   return devices
  // }

  // async getForOneDeviceInfo(deviceID) {
  //   console.log("3. getForOneDeviceInfo called:")
  //   console.log(`Fetching ${deviceID}`)
  //   const DeviceInfoPromise = axios(API_URL + '/general/devices/' + deviceID)
  //   return Promise.all([DeviceInfoPromise]).then((values) => {
  //     // console.log(values[0].data.cleaning);
  //     console.log(`${deviceID}`, values[0].data.cleaning);
  //     return values[0].data.cleaning
  //   })
  // }

  // async getDeviceNamesInfo() {
  //   console.log("1. getDeviceNamesInfo called")
  //   try {
  //     const devices = await this.getDevices()
  //     console.log("getDeviceNamesInfo - devices", devices) // ['awst0', 'awst1']

  //     const promises = []
  //     devices.forEach((device) => {
  //       console.log(`const promises - inside getDeviceNamesInfo ${device}`)

  //       const result = this.getForOneDeviceInfo(device).then((value) => {
  //     // console.log(values[0].data.cleaning);
          
  //         const cool = []
  //         cool.push(value)
  //         console.log("cool", cool)
          
  //         console.log("result ->", `${device}: ${value}`);
  //         console.log("value", value)
  //         promises.push(value)
  //         console.log("promises inside result", promises)
  //         console.log("devices inside result", devices)

  //         const obj = {}
  //         devices.forEach((devices, i) => obj[devices] = promises[i])
  //         console.log("obj", obj)

  //         const obj2 = []
  //         devices.forEach((devices, i) => obj2[devices] = promises[i])
  //         console.log("obj2", obj2)

  //         this.setState({
  //           DeviceNamesInfo: obj
  //         })
  //         // glue them 
  //         // return value
  //         // return result
  //       })   

  //       // promises.push(result)
  //       // console.log("promises", promises)

  //       //promises.push(this.getForOneDeviceInfo(device)) // runs API Promise.all and returns 
  //     })

  //     console.log("getDeviceNamesInfo - promises:", promises)

  //     // Promise.resolve(promises).then((response) => {
  //     //   console.log("response", response.data)
  //     // })

  //     // const allResults = Promise.all(promises).then((response) => response.data)
  //     // console.log("getDeviceNamesInfo - allResults:", allResults)

  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  getDeviceNamesInfo() {
    axios.get(`${API_URL}/general/devices`)
      .then((response) => {
        console.log("1st call, devices", response)
        const devices = response.data.map(dev => dev.devices[0].ID)
        console.log("=> devices, 1st call", devices)   // ['awst0', 'awst1']
        const promises = []
        devices.forEach((device) => {
          promises.push(axios.get(`${API_URL}/general/devices/${device}`)) // "http://localhost:8080/general/devices/awst0"
        })
        return Promise.all(promises).then((response) => {
          console.log("=> Promises - from Promise.all", response); // full response
          const info = response.map(deviceInfo => deviceInfo.data.cleaning.toString())
          console.log('info:', info)
          this.setState({
            DeviceNames: devices,
            DeviceInfo: info,
          })
        });
      })
  }


  // formDeviceObj() {  
  //   axios
  //     .get(`${API_URL}/general/devices`)
  //     .then((response) => {
  //       console.log("response:", response.data)
  //       const devices = response.data.map(dev => dev.devices[0].ID)
  //       // const id = devices.map(dev => dev.devices)

  //       devices.forEach(deviceID => 
  //         axios
  //           .get(`${API_URL}/general/devices/${deviceID}`)
  //           .then(response = {
  //             return response.data
  //           })
  //       )

// async function printMovieTitlesWithAxios(url) {
//   try{
//   const response = await axios.get(url);
//   response.data.forEach(film => console.log(film.title));    
//   } catch(err) {console.error(err.message)}
// }

  //       this.setState({
  //         DeviceNames: devices,
  //       })
  //     })
  //     .catch((error) => {
  //       console.log('error:', error.response.data);
  //     })
  // }

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

    console.log("this.state.DeviceInfo",  this.state.DeviceInfo)
    console.log("this.state.DeviceNames",  this.state.DeviceNames)

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
            DeviceInfo={this.state.DeviceInfo}/>
          <Divider/>
    
        </div>
      </section>
    )
  }
}

export default Dashboard