import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../../../utils/Auth';
import { Table, Button } from 'semantic-ui-react';

// const options = {
//   headers: { Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=" }
// }
  
class Client extends Component {

  state = {
    SrvInfo: [],
    Uptime: []
  }

  componentDidMount() {
    this.getServerInfo()
    // this.getServerInfoHeaders()
  }

  getServerInfo() {
    // axios({headers: { Authorization: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k=" }})
    axios
      // .get(`${API_URL}/general/srvinfo`, { headers: { Authentication: "Basic Y3Jpc3RpYW46bXVua2lyZXBvcnQgbXVua2k="} }  )
      .get(`${API_URL}/general/srvinfo`, auth)
      .then((response) => {
        // console.log("SrvInfo", response)
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
  
  render() {

    const { SrvInfo, Uptime } = this.state
      
    return (
      <section className="client">
        {/* <h3 className="srvinfo__heading">P5 Server Info</h3> */}
        <h3 className="client__heading">Client Info</h3>
        <div className="client__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* <Table.Row>
                <Table.HeaderCell colSpan='8'>/general/srvinfo</Table.HeaderCell>
              </Table.Row> */}
            </Table.Header>
            <Table.Header>
              <Table.Row>
                {/* GET ClientNames */}
                <Table.HeaderCell>Client</Table.HeaderCell>
                {/* Get Client Info */}
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Hostname</Table.HeaderCell>
                <Table.HeaderCell>Port</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>IsThin</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Synology</Table.Cell>
                <Table.Cell>empty</Table.Cell>
                <Table.Cell>192.168.234.142</Table.Cell>
                <Table.Cell>8060</Table.Cell>
                <Table.Cell>P5_user</Table.Cell>
                <Table.Cell>false</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>localhost</Table.Cell>
                <Table.Cell>something</Table.Cell>
                <Table.Cell>192.168.234.143</Table.Cell>
                <Table.Cell>8080</Table.Cell>
                <Table.Cell>A_user</Table.Cell>
                <Table.Cell>true</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          {/* <br /> */}
          
          {/* <div className="client__buttons">
            <Button className="client__button">Update Client Password</Button>
            <Button className="client__button">Ping Client</Button>
          </div> */}

        </div>
      </section>
    )
  }
}

export default Client
