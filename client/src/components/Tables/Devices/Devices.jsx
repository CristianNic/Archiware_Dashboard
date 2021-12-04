import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/Auth';
import server from '../../../utils/server';

class Devices extends Component {

  state = {
    DeviceNamesInfo: []
  }

  componentDidMount() {
    this.getDeviceNamesInfo()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
      prevProps.refresh !== this.props.refresh)
    {
      this.getDeviceNamesInfo()
    }
  }

  async getDeviceNamesInfo() {
    const getDeviceNames = await axios.get(`${API_URL}/general/devices`, server(this.props.activeServer))
    
    const devices = getDeviceNames.data.devices.map(device => device.ID)
    
    const getDeviceInfoPromises = []
      devices.forEach((device) => {
        getDeviceInfoPromises.push(axios.get(`${API_URL}/general/devices/${device}`, server(this.props.activeServer)))
    })  
    
    const DeviceInfo = await Promise.all(getDeviceInfoPromises)
    
    const info = DeviceInfo.map(deviceInfo => deviceInfo.data.cleaning)
    
    const devicesInfoTable = []
      for (let i = 0; i < devices.length; i++) {
        const obj = {
          device: devices[i],
          cleaning: info[i]
        }
        devicesInfoTable.push(obj)
      }
    this.setState({
      DeviceNamesInfo: devicesInfoTable
    })
  }

  render() {
      
    const { DeviceNamesInfo } = this.state
    
    return (
      <section className="devices">
        <h3 className="table-heading">Device Check</h3>
        <div className="devices__table-wrapper border">
          <Table compact celled className="devices__table">
            <Table.Header>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Device</Table.HeaderCell>
                <Table.HeaderCell>Clean</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(DeviceNamesInfo).length === 0 ?
                (<Table.Row>
                  <Table.Cell>Loading...</Table.Cell>
                  <Table.Cell>Loading...</Table.Cell>
                </Table.Row>)
                :
                (DeviceNamesInfo.map(device =>
                  <Table.Row>
                    <Table.Cell>{device.device}</Table.Cell>                 
                    {device.cleaning === true ?
                      (<Table.Cell negative>No</Table.Cell>)
                    : (<Table.Cell positive>Yes</Table.Cell>)}
                  </Table.Row>                  
                ))
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default Devices





