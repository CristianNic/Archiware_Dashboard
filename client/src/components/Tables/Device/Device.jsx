import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../../../utils/Auth';
import { Icon, Table } from 'semantic-ui-react';

class DeviceTable extends Component {

  state = {
    deviceNameInfo: [["awst0", "awst1"], ["true", "false"]],
    deviceNameInfo2: [{ device: "awst0", cleaning: true },
                      { device: "awst1", cleaning: false }],
    DeviceNames: [],
    DeviceInfo: [],
    DeviceNamesInfo: []
  }

  componentDidMount() {
    this.getDeviceNamesInfo()
  }

  getDeviceNamesInfo() {
    axios.get(`${API_URL}/general/devices`, auth)
      .then((response) => {
        const devices = response.data.map(dev => dev.devices[0].ID)
        const promises = []
        devices.forEach((device) => {
          promises.push(axios.get(`${API_URL}/general/devices/${device}`, auth))
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

  getDeviceNames() {  
    axios
      .get(`${API_URL}/general/devices`, )
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

  getDeviceInfo(deviceID) {
    // Better if it loops through the drives, makes a call for each, populating an array, see getDeviceNamesInfo()
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

  render() {
      
    return (
      <section className="device">
        <h3 className="device__heading">P5 Device Check</h3>
        {/* <h3 className="devices__hostname">Hostname: {SrvInfo.hostname}</h3> */}
        <div className="device__table-wrapper">
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
              {this.state.DeviceNamesInfo.map(device =>
                <Table.Row>
                  <Table.Cell>{device.device}</Table.Cell>                 
                  {device.cleaning === true ?
                    (<Table.Cell positive><Icon name='checkmark' />{device.cleaning.toString()}</Table.Cell>)
                  : (<Table.Cell negative><Icon name='close'/>{device.cleaning.toString()}</Table.Cell>)}
                </Table.Row>                  
              )}
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default DeviceTable





