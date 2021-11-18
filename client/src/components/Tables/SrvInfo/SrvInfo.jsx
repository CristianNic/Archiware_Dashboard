import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../../../utils/Auth';
import { Table } from 'semantic-ui-react';

// const options = {
//   headers: { Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=" }
// }
  
class SrvInfo extends Component {

  state = {
    SrvInfo: [],
    Uptime: [],
    ArchiwareServerIP: []
  }

  componentDidMount() {
    this.getServerInfo()
    // this.getServerInfoHeaders()
    this.getIP()
  }

  getServerInfoHeaders() {
    // Manually set Basic Auth Header  
  }

  getServerInfo() {
    // axios({headers: { Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=" }})
    axios
      // .get(`${API_URL}/general/srvinfo`, { headers: { Authentication: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k="} }  )
      .get(`${API_URL}/general/srvinfo`, auth)
      // .get(`http://localhost:8080/getAPIResponseMunki_v1`, auth)
      // .get(`http://localhost:8090/general/srvinfo`, auth)
      .then((response) => {
        // console.log("SrvInfo", response.data)
        // console.log("Uptime", response.data.uptime)
        const uptime = new Date(response.data.uptime * 1000).toISOString().substr(11, 8)
        // console.log("Uptime", uptime)
        this.setState({
          SrvInfo: response.data,
          Uptime: uptime
        })
      })
      .catch((error) => {
        // console.log('error:', error.response.data);
        console.log('error:', error);
      })
  }

  getIP() {
    axios
      .get(`http://localhost:8090/ip`, auth)
      .then((response) => {
        // console.log(response.data)
        this.setState({
          ArchiwareServerIP: response.data
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }
  
  render() {

    const { SrvInfo, Uptime, ArchiwareServerIP } = this.state
      
    return (
      <section className="srvinfo">
        {/* <h3 className="srvinfo__heading">P5 Server Info</h3> */}
        <h3 className="srvinfo__heading">Server Info</h3>
        <div className="srvinfo__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* <Table.Row>
                <Table.HeaderCell colSpan='8'>/general/srvinfo</Table.HeaderCell>
              </Table.Row> */}
            </Table.Header>
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
              <Table.Row>
                <Table.Cell>{ArchiwareServerIP.ArchiwareServerIP}</Table.Cell>
                <Table.Cell>{SrvInfo.home}</Table.Cell>
                <Table.Cell>{SrvInfo.hostid}</Table.Cell>
                <Table.Cell>{SrvInfo.hostname}</Table.Cell>
                <Table.Cell>{SrvInfo.lexxvers}</Table.Cell>
                <Table.Cell>{SrvInfo.platform}</Table.Cell>
                <Table.Cell>{SrvInfo.port}</Table.Cell>
                <Table.Cell>{Uptime}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default SrvInfo
