import axios from "axios";
import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import { API_URL, auth } from '../../../utils/Auth';

class LicenseResources extends Component {

  state = {    
    // LicenseResourceNamesInfoMockUp: [{ resourceID: "ArchivePlan" }, { licenses: -1 },
    //                                  { resourceID: "BackupPlan" }, { licenses: 0 },
    //                                  { resourceID: "SyncPlan" }, { licenses: 5 }],
    ResourceLicenses: [],
    // LicenseResourceNames: [],
    LicenseResourceInfo: [],
  }

  componentDidMount() {
    this.getLicenseResourceNamesInfo()
    // this.getLicenseResourceNames()
    // this.getLicenseResourceInfo()
  }

  // LicenseResourceInfo - Returns the number of free licenses available:
  // "-1" for unlimited free licenses, "0" if there are no free licenses 
  // or a positive number of free licenses

  getLicenseResourceNamesInfo() {
    axios
      .get(`${API_URL}/license/resources`, auth)
      .then(async (response) => {
        // console.log("getLicenseResourceName", response)
        const resources = response.data.resources.map(resource => resource.ID)
        // console.log("resources", resources)
        const promises = []
        resources.forEach((resource) => {
          promises.push(axios.get(`${API_URL}/license/resources/${resource}`, auth))
        })
        return Promise.all(promises).then((response) => {
          // console.log("Promises.all response", response)
          const info = response.map(resourceInfo => resourceInfo.data.licenses)
          // console.log('info:', info)
          const infoFormatted = []
          info.forEach((license) => {
            if (license === -1) { 
              infoFormatted.push(`unlimited`) // \u221e // -1
            } else if (license === 0) {
              infoFormatted.push(`${license}`)  
            } else if (license !== isNaN) {
              infoFormatted.push(`${license}`)
            } else {
              infoFormatted.push("fail")
            }
          })
          // console.log("infoFormatted", infoFormatted)
          const resourceLicenses = []  // resources infoFormatted
          for (let i = 0; i < resources.length; i++) {
            const obj = {
              resourceID: resources[i],
              licenses: infoFormatted[i]
            }
            resourceLicenses.push(obj)
          }
          this.setState({
            ResourceLicenses: resourceLicenses
          })
        })
      })
  }
  
  getLicenseResourceNames() {
    axios
      .get(`${API_URL}/license/resources`, auth)
      .then((response) => {
        // console.log(response.data.resources) // names listed 
        this.setState({
        LicenseResourceNames: response.data.resources
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      })
  }

  getLicenseResourceInfo() {
    axios
      .get(`${API_URL}/license/resources/ArchivePlan`, auth)
      .then((response) => {
        console.log(response.data.licenses) // random number 
        this.setState({
        LicenseResourceInfo: response.data.resources
        })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      }) 
  }

  render() {

    const { ResourceLicenses } = this.state
    // console.log('ResourceLicenses:', ResourceLicenses)

    return (
      <section className="licenseResources">
        {/* <h3 className="licenseResource__heading">P5 License Resource Info</h3> */}
        <h3 className="licenseResources__heading">License Resource Info</h3>
        <div className="licenseResources__table-wrapper">
          <Table compact>
            <Table.Header>
              {ResourceLicenses.map(resource => 
                <Table.HeaderCell>{resource.resourceID}</Table.HeaderCell>
              )}
            </Table.Header>
            <Table.Body>  
              {ResourceLicenses.map(resource => 
                <Table.Cell textAlign='center'>{resource.licenses}</Table.Cell>
              )}
            </Table.Body>
          </Table>
          {/* <h4 className="licenseResource__heading">*Need official response format from server to extract info</h4> */}
        </div>
      </section>
    )
  }
}

export default LicenseResources





