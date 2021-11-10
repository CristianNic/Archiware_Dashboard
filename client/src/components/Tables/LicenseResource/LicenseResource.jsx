import axios from "axios";
import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import { API_URL, auth } from '../../../utils/Auth';


class LicenseResourceTable extends Component {

  state = {
    deviceNameInfo: [["awst0", "awst1"], ["true", "false"]],
    deviceNameInfo2: [{ device: "awst0", cleaning: true },
                      { device: "awst1", cleaning: false }],
    
    LicenseResourceNamesInfo2: [{ resourceID: "ArchivePlan" }, { plans: -1 },
                                { resourceID: "BackupPlan" }, { plans: 0 },
                                { resourceID: "SyncPlan" }, { plans: 5 }],
    
    LicenseResourceNames: [],
    LicenseResourceInfo: [],
  }

  componentDidMount() {
    this.getLicenseResourceNames()
    this.getLicenseResourceInfo()
    // this.getLicenseResourceNamesInfo()
  }

  // LicenseResourceInfo - Returns the number of free licenses available:
  // "-1" for unlimited free licenses, "0" if there are no free licenses 
  // or a positive number of free licenses
  getLicenseResourceNames() {
    axios
      .get(`${API_URL}/license/resources`, auth)
      .then((response) => {
        console.log(response.data.resources)
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
        console.log(response.data.licenses)
        // this.setState({
        // // LicenseResourceNames: licenseResourceNames
        // LicenseResourceInfo: response.data.resources
        // })
      })
      .catch((error) => {
        console.log('error:', error.response.data);
      }) 
  }

  // getLicenseResourceNamesInfo() {
  //   axios
  //     .get(`${API_URL}/license/resources`)
  // }

  render() {

    const { LicenseResourceNames } = this.state

    return (
      <section className="licenseResource">
        <h3 className="licenseResource__heading">P5 License Resource Info</h3>
        <div className="licenseResource__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* <Table.Row>
                <Table.HeaderCell colSpan='10'>Cool</Table.HeaderCell>
              </Table.Row> */}
            </Table.Header>
            <Table.Row>
              {LicenseResourceNames.map(resource =>  
                  <Table.Cell>{resource.ID}</Table.Cell>
              )}
            </Table.Row>
            <Table.Body>
              {/* {DeviceNamesInfo.map(device =>
                <Table.Row>
                  <Table.Cell>{device.device}</Table.Cell>                 
                  {device.cleaning === true ?
                    (<Table.Cell positive><Icon name='checkmark' />{device.cleaning.toString()}</Table.Cell>)
                  : (<Table.Cell negative><Icon name='close'/>{device.cleaning.toString()}</Table.Cell>)}
                </Table.Row>                  
              )} */}
            </Table.Body>
          </Table>
          <h4 className="licenseResource__heading">*Need official response for GET LicenseResourceInfo</h4>
        </div>
      </section>
    )
  }
}

export default LicenseResourceTable





