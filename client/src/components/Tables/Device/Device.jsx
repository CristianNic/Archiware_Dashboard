import React, { Component } from "react";
import { Button, Divider, Icon, Table } from 'semantic-ui-react';

// const colors = [ "red", "green" ]

class DeviceTable extends Component {

  state = {
  }

  render() {
    
    const { SrvInfo, DeviceNames, DeviceInfo } = this.props
    console.log("DeviceTable Component - DeviceInfo:", DeviceInfo)
      
    return (
      <section className="devices">
        {/* <h3>Hostname: {SrvInfo.hostname}</h3> */}
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
                <Table.Cell>{DeviceNames[0]}</Table.Cell>
                <Table.Cell positive>
                  <Icon name='checkmark' />
                    {DeviceInfo[0]}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{DeviceNames[1]}</Table.Cell>
                <Table.Cell negative>
                  <Icon name='close' />
                    {DeviceInfo[1]}
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


