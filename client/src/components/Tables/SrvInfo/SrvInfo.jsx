import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/auth';
import server from '../../../utils/server';
  
class SrvInfo extends Component {

  state = {
    SrvInfoTable: [],
    Uptime: [],
    ServerIP: []
  }

  componentDidMount() {
    this.getServerInfo()
    this.getServerIP()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer || 
      prevProps.refresh !== this.props.refresh)
    {
      this.getServerInfo()
      this.getServerIP()
    }
  }

  getServerInfo() {
    axios
      .get(`${API_URL}/general/srvinfo`, server(this.props.activeServer))
      .then((response) => {
        const uptime = new Date(response.data.uptime * 1000).toISOString().substr(11, 8)
        this.setState({
          SrvInfoTable: response.data,
          Uptime: uptime
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }

  getServerIP() {
    axios
      .get(`${API_URL}/general/srvinfo/ip`, server(this.props.activeServer))
      .then((response) => {
        this.setState({
          ServerIP: response.data.serverIP
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }
  
  render() {

    const { SrvInfoTable, Uptime, ServerIP } = this.state

    return (
      <section className="srvinfo">
        <h3 className="table-heading">Server Info</h3>
        <div className="srvinfo__table-wrapper border">
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>IP Address</Table.HeaderCell>
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
              {Object.keys(SrvInfoTable).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (<Table.Row>
                  <Table.Cell>{ServerIP}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.home}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.hostid}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.hostname}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.lexxvers}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.platform}</Table.Cell>
                  <Table.Cell>{SrvInfoTable.port}</Table.Cell>
                  <Table.Cell>{Uptime}</Table.Cell>
                </Table.Row>)
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default SrvInfo
