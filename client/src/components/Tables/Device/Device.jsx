import React, { Component } from "react";
import { Button, Divider, Icon, Table } from 'semantic-ui-react';

// const colors = [ "red", "green" ]

class DeviceTable extends Component {

  state = {
  }

  render() {
    
    const { SrvInfo, DeviceNames, DeviceNamesInfo } = this.props
    // console.log("DeviceTable Component - DeviceNames:", DeviceNamesInfo)
      
    return (
      <section className="devices">
        {/* <h1>Hostname: {SrvInfo.hostname}</h1> */}
        <div className="devices__table-wrapper">
          <Table compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Host: {SrvInfo.hostname}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Device</Table.HeaderCell>
                <Table.HeaderCell>Needs Cleaning</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {/* <Table.Cell>{DeviceNames[0]}</Table.Cell> */}
                <Table.Cell>{Object.keys(DeviceNamesInfo)[0]}</Table.Cell>
                <Table.Cell positive>
                  <Icon name='checkmark' />
                  True {DeviceNamesInfo[0]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{DeviceNames[1]}</Table.Cell>
                <Table.Cell negative>
                  <Icon name='close' />
                  False
                </Table.Cell>
              </Table.Row>
            <Table.Row></Table.Row>
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}


export default DeviceTable



  // handleClick(letter) {
  //   this.setState({ justClicked: letter });
  // }
  // render() {
  //   return (
  //     <div>
  //       Just clicked: {this.state.justClicked}
  //       <ul>
  //         {this.state.letters.map(letter =>
  //           <li key={letter} onClick={() => this.handleClick(letter)}>
  //             {letter}
  //           </li>
  //         )}
  //       </ul>
  //     </div>


