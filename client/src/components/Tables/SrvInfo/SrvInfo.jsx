import React, { Component } from "react";
import { Button, Divider, Table } from 'semantic-ui-react';

class SrvInfoTable extends Component {

  state = {

  }

  render() {

    const { SrvInfo } = this.props
      
    return (
      <section className="srvinfo">
        <h3 className="srvinfo__heading">P5 Server Info</h3>
        <div className="srvinfo__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* <Table.Row>
                <Table.HeaderCell colSpan='8'>/general/srvinfo</Table.HeaderCell>
              </Table.Row> */}
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Home</Table.HeaderCell>
                <Table.HeaderCell>Host ID</Table.HeaderCell>
                <Table.HeaderCell>Hostname</Table.HeaderCell>
                <Table.HeaderCell>Lexxvers</Table.HeaderCell>
                <Table.HeaderCell>Platform</Table.HeaderCell>
                <Table.HeaderCell>Port</Table.HeaderCell>
                <Table.HeaderCell>Uptime</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{SrvInfo.address}</Table.Cell>
                <Table.Cell>{SrvInfo.home}</Table.Cell>
                <Table.Cell>{SrvInfo.hostid}</Table.Cell>
                <Table.Cell>{SrvInfo.hostname}</Table.Cell>
                <Table.Cell>{SrvInfo.lexxvers}</Table.Cell>
                <Table.Cell>{SrvInfo.platform}</Table.Cell>
                <Table.Cell>{SrvInfo.port}</Table.Cell>
                <Table.Cell>{SrvInfo.uptime}</Table.Cell>
              </Table.Row>
            <Table.Row></Table.Row>
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }

}


export default SrvInfoTable
