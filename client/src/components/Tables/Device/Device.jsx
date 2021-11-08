import React, { Component } from "react";
import { Button, Divider, Icon, Table, TransitionablePortal } from 'semantic-ui-react';

// const colors = [ "red", "green" ]

class DeviceTable extends Component {

  state = {
    deviceNameInfo: [["awst0", "awst1"], ["true", "false"]],  // can this be passed 
    deviceNameInfo2: [{ device: "awst0", cleaning: true },
                      { device: "awst1", cleaning: false }]
  }

  // componentDidMount() {
  //   this.formDeviceNamesInfoObj()
  // }

  // formDeviceNamesInfoObj() {
  //   const deviceNamesInfo = []
  //   for (let i = 0; i < this.props.DeviceNames.length; i++) {
  //     const output = {
  //       device: this.props.DeviceNames[i],
  //       cleaning: this.props.DeviceInfo[i]
  //     }
  //     deviceNamesInfo.push(output)
  //   }
  //   // console.log("obj", deviceNamesInfo)
  //   return deviceNamesInfo
  // }

  render() {
    
    const { SrvInfo, DeviceNames, DeviceInfo, DeviceNamesInfo,
      DeviceNamesInfo2, DeviceNamesInfoNew, workingArray } = this.props
    // console.log("DeviceTable Component - DeviceInfo:", DeviceInfo)
    // console.log("DeviceTable Component - DeviceNamesInfo:", DeviceNamesInfo[0])
    
    // console.log("Table - DeviceNamesInfo2Dash", DeviceNamesInfo2Dash)
    // console.log("Table - DeviceNamesInfoNew", DeviceNamesInfoNew)

    // console.log("=>=> obj", this.formDeviceNamesInfoObj())
    // console.log("=> obj-1", this.formDeviceNamesInfoObj().map(device => device[0]))
    // console.log("device 1", this.formDeviceNamesInfoObj()[0])
    // console.log("device 1 - device", this.formDeviceNamesInfoObj().map(devices => devices.device)[0])
    // console.log("device 1 - clean", this.formDeviceNamesInfoObj().map(clean => clean.cleaning))

    // console.log("deviceNameInfo", this.state.deviceNameInfo)
    // console.log("deviceNameInfo", this.state.deviceNameInfo)
    // console.log("NameInfo",this.state.deviceNameInfo.map(deviceNameInfo => deviceNameInfo[0]))  // ['awst0', 'true'] 
    // console.log("=>=>test", this.state.deviceNameInfo.map(deviceNameInfo => deviceNameInfo[0])[0]) // awst0
      
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
              {DeviceNamesInfo.map(device =>
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





