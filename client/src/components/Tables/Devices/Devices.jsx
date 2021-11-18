import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../../../utils/Auth';
import { Icon, Table } from 'semantic-ui-react';

class Devices extends Component {

  state = {
    deviceNameInfo: [["awst0", "awst1"], ["true", "false"]],
    deviceNameInfo2: [{ device: "awst0", cleaning: true },
                      { device: "awst1", cleaning: false }],
    DeviceNamesInfo: [],
    // DeviceNames: [],
    // DeviceInfo: [],
  }

  componentDidMount() {
    this.getDeviceNamesInfo()
    this.getDeviceNames()
    // this.getDeviceInfo()
  }

  getDeviceNamesInfo() {
    axios
      .get(`${API_URL}/general/devices`, auth)
      .then(async (response) => {
        // console.log("DeviceNames response", response)
        // const devices = response.data.map(dev => dev.devices[0].ID)
        const devices = response.data.devices.map(device => device.ID)
        // console.log('devices:', devices)
        const promises = []
        devices.forEach((device) => {
          promises.push(axios.get(`${API_URL}/general/devices/${device}`, auth))
        })
        return Promise.all(promises).then((response) => {
          // console.log("response", response)
          const info = response.map(deviceInfo => deviceInfo.data.cleaning)
          const devicesInfoArray = []
          for (let i = 0; i < devices.length; i++) {
            const obj = {
              device: devices[i],
              cleaning: info[i]
            }
            devicesInfoArray.push(obj)
          }
          // console.log('devicesInfoArray:', devicesInfoArray)
          this.setState({
            DeviceNamesInfo: devicesInfoArray
          })
        });
      })
  }

  getDeviceNames() {  
  axios
    .get(`${API_URL}/general/devices`, auth)
    // .get(`http://localhost:8080/general/devices`, auth)
    .then((response) => {
      // console.log("response:", response)
      // console.log("response:", response.data.devices)
      const devices = response.data.devices.map(device => device.ID)
      // console.log('devices:', devices)
      this.setState({
        DeviceNames: devices,
      })
    })
    .catch((error) => {
      console.log('error:', error);
    })
  }

  getDeviceInfo() {
    // console.log("getDeviceInfo()")
    axios
      .get(`${API_URL}/general/devices/awst0`, auth) // awst0 or awst1
      .then((response) => {
      // console.log("response", response)
        this.setState({
          DeviceInfo: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  render() {
      
    const { DeviceNamesInfo } = this.state
    // console.log('DeviceNamesInfo:', DeviceNamesInfo)

    return (
      <section className="devices">
        {/* <h3 className="device__heading">P5 Device Check</h3> */}
        <h3 className="devices__heading">Device Check</h3>
        {/* <h3 className="devices__hostname">Hostname: {SrvInfo.hostname}</h3> */}
        <div className="devices__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* <Table.Row>
                <Table.HeaderCell colSpan='2'>Host: {SrvInfo.hostname}</Table.HeaderCell>
              </Table.Row> */}
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Device</Table.HeaderCell>
                {/* <Table.HeaderCell>Needs Cleaning</Table.HeaderCell> */}
                <Table.HeaderCell>Cleaning Required</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {this.state.DeviceNamesInfo.map(device =>
                <Table.Row>
                  <Table.Cell>{device.device}</Table.Cell>                 
                  {device.cleaning === true ?
                    (<Table.Cell positive><Icon name='checkmark' />{device.cleaning.toString()}</Table.Cell>)
                  : (<Table.Cell negative><Icon name='close'/>{device.cleaning.toString()}</Table.Cell>)}
                </Table.Row>                  
              )} */}

              {Object.keys(DeviceNamesInfo).length === 0 ?
                (<Table.Row>
                  <Table.Cell>Null</Table.Cell>
                  <Table.Cell>Null</Table.Cell>
                </Table.Row>)
              :
                (DeviceNamesInfo.map(device =>
                  <Table.Row>
                    <Table.Cell>{device.device}</Table.Cell>                 
                    {device.cleaning === true ?
                      (<Table.Cell positive><Icon name='checkmark' />{device.cleaning.toString()}</Table.Cell>)
                    : (<Table.Cell negative><Icon name='close'/>{device.cleaning.toString()}</Table.Cell>)}
                  </Table.Row>                  
                ))
              }
              
              {/* {Object.keys(DeviceNamesInfo).length === 0 ?
                (<Table.Row>
                  <Table.Cell>Null</Table.Cell>
                  <Table.Cell>Null</Table.Cell>
                </Table.Row>)
              :
                (DeviceNamesInfo.map(device =>
                  <Table.Row>
                    <Table.Cell>{device.device}</Table.Cell>                 
                    {device.cleaning === true ?
                      (<Table.Cell negative><Icon name='close' />Yes</Table.Cell>)
                    : (<Table.Cell positive><Icon name='checkmark'/>No</Table.Cell>)}  
                  </Table.Row>                  
                ))
              }  */}
            </Table.Body>
          </Table>

          
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Device</Table.HeaderCell>
                <Table.HeaderCell>Cleaning Required</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            
            <Table.Body>
              <Table.Row>
                <Table.Cell>demo0</Table.Cell>
                <Table.Cell positive><Icon name='checkmark' />No</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>demo1</Table.Cell>
                <Table.Cell negative><Icon name='close'/>Yes</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <h3 className="devices__heading">Which table looks better?</h3>

        </div>
      </section>
    )
  }
}

export default Devices





