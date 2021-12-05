import React, { Component } from "react";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/auth';
import server from '../../../utils/server';

class Client extends Component {

  state = {
    ClientTable: [],
  }

  componentDidMount() {
    this.getClientNamesInfo()
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
        prevProps.refresh !== this.props.refresh)
    {
      this.getClientNamesInfo()
    }
  }

  async getClientNamesInfo() {
    
    const getClientNames = await axios.get(`${API_URL}/general/clients`, server(this.props.activeServer))

    const clientNames = getClientNames.data.clients.map(client => client.ID)

    const getClientInfoPromises = []
    clientNames.forEach(clientID => {
      getClientInfoPromises.push(axios.get(`${API_URL}/general/clients/${clientID}`, server(this.props.activeServer)))
    })
    const clientInfo = await Promise.all(getClientInfoPromises)

    const description = clientInfo.map(desc => desc.data.description)
    const hostname = clientInfo.map(hostname => hostname.data.hostname)
    const port = clientInfo.map(port => port.data.port)
    const username = clientInfo.map(username => username.data.username)
    const isThin = clientInfo.map(thin => thin.data.isthin)

    const isThinFormatted = []
    isThin.forEach(station => {
      if (station === true) {
        isThinFormatted.push("Workstation")
      } else {
        isThinFormatted.push("Server")
      }
    })
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
    this.setState({
      ClientTable: clientTable,
    })
  }

  render() {

    const { ClientTable } = this.state
    
    return (
      <section className="client">
        <h3 className="table-heading">Client Info</h3>
        <div className="client__table-wrapper border">
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
              {Object.keys(ClientTable).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (ClientTable.map(client => 
                  <Table.Row key={client.clientID}>
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
        </div>
      </section>
    )
  }
}

export default Client
