import axios from "axios";
import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/Auth';
import server from '../../../utils/server';

class LicenseResources extends Component {

  state = {    
    LicenseResourcesTable: []
  }

  componentDidMount() {
    this.getLicenseResources()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
        prevProps.refresh !== this.props.refresh)
    {
      this.getLicenseResources()
    }
  }

  async getLicenseResources() {

    const getLicenseResourceNames = await axios.get(`${API_URL}/license/resources`, server(this.props.activeServer))
    
    const resourceIDs = getLicenseResourceNames.data.resources.map(resource => resource.ID)

    // GET LicenseResourceInfo (for each) - Returns the number of free licenses available: "-1" for unlimited 
    // free licenses, "0" if there are no free licenses or a positive number of free licenses
    const getLicenseResourceInfoPromises = []
    resourceIDs.forEach(resourceID => {
      getLicenseResourceInfoPromises.push(axios.get(`${API_URL}/license/resources/${resourceID}`, server(this.props.activeServer)))
    })
    const licenseInfo = await Promise.all(getLicenseResourceInfoPromises)

    const licenses = licenseInfo.map(license => license.data.resource)

    const infoFormatted = []
    licenses.forEach((license) => {
      if (license === -1) { 
        infoFormatted.push(`unlimited`)   // or empty spaces \u221e // -1 // {"\u221e"}
      } else if (license === 0) {
        infoFormatted.push(`${license}`)  
      } else if (license !== isNaN) {
        infoFormatted.push(`${license}`)
      } else {
        infoFormatted.push("Not Found")
      }
    })
    const licenseResourcesTable = []
    for (let i = 0; i < resourceIDs.length; i++) {
      const obj = {
        resourceID: resourceIDs[i],
        licenses: infoFormatted[i],
      }
      licenseResourcesTable.push(obj)
    }
    this.setState({
      LicenseResourcesTable: licenseResourcesTable
    })
  }

  render() {

    const { LicenseResourcesTable } = this.state

    return (
      <section className="licenseResources">
        <h3 className="table-heading">License Resource Info</h3>
        <div className="licenseResources__table-wrapper">
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ArchivePlan</Table.HeaderCell>  
                <Table.HeaderCell>BackupPlan</Table.HeaderCell>
                <Table.HeaderCell>SyncPlan</Table.HeaderCell>
                <Table.HeaderCell>Backup2Go</Table.HeaderCell>
                <Table.HeaderCell>Client</Table.HeaderCell>
                <Table.HeaderCell>ThinClient</Table.HeaderCell>
                <Table.HeaderCell>VirtClient</Table.HeaderCell>
                <Table.HeaderCell>Device</Table.HeaderCell>
                <Table.HeaderCell>Jukebox</Table.HeaderCell>
                <Table.HeaderCell>DesktopLinks</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(LicenseResourcesTable).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
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
                  {LicenseResourcesTable.map(license =>
                    <Table.Cell>{license.licenses}</Table.Cell>
                  )}
                </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default LicenseResources





