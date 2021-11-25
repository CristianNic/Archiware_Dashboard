import React, { Component } from "react";
import axios from 'axios';
import { API_URL } from '../../../utils/Auth';
import { Table } from 'semantic-ui-react';
  
class Client extends Component {

  state = {
    clientTable: []
  }

  componentDidMount() {
    this.getClientNamesInfo()
  }

  async getClientNamesInfo() {

    const getClientNames = await axios.get(`${API_URL}/general/clients`)

    const clientNames = getClientNames.data.clients.map(client => client.ID) // ['Synology', 'localhost', ...]

    const getClientInfoPromises = []
    clientNames.forEach(clientID => {
      getClientInfoPromises.push(axios.get(`${API_URL}/general/clients/${clientID}`))
    })
    const clientInfo = await Promise.all(getClientInfoPromises)

    const description = clientInfo.map(desc => desc.data.description)
    const hostname = clientInfo.map(hostname => hostname.data.hostname)
    const port = clientInfo.map(port => port.data.port)
    const username = clientInfo.map(username => username.data.username)
    const isThin = clientInfo.map(thin => thin.data.isthin)
    // Returns true in case the client is of type Workstation (as opposed to type Server)
    const isThinFormatted = []
    isThin.forEach(station => {
      if (station === true) {
        isThinFormatted.push("Workstation")
      } else {
        isThinFormatted.push("Server")
      }
    })

    // ===> Form DataTable Array 
    const clientTable = []
    for (let i = 0; i < clientInfo.length; i++) {
      const obj = {
        clientID: clientNames[i],
        description: description[i],
        hostname: hostname[i],
        isThin: isThinFormatted[i],
        port: port[i],
        username: username[i]
      }
      clientTable.push(obj)
    }
    // console.log('ClientTable:', clientTable)

    this.setState({
      clientTable: clientTable
    })
  }

  render() {

    const { clientTable } = this.state
    
    return (
      <section className="client">
        <h3 className="client__heading">Client Info</h3>
        <div className="client__table-wrapper">
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Client</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Hostname</Table.HeaderCell>
                <Table.HeaderCell>Port</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(clientTable).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (clientTable.map(client => 
                  <Table.Row>
                    <Table.Cell>{client.clientID}</Table.Cell>
                    <Table.Cell>{client.description}</Table.Cell>
                    <Table.Cell>{client.hostname}</Table.Cell>
                    <Table.Cell>{client.port}</Table.Cell>
                    <Table.Cell>{client.isThin}</Table.Cell>
                    <Table.Cell>{client.username}</Table.Cell>
                  </Table.Row>)
                )   
              }
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
