import axios from "axios";
import React, { Component } from "react";
import { Table, Rating } from 'semantic-ui-react';
import { API_URL, auth } from '../../../utils/Auth';

class Jobs extends Component {

  state = {    
    // LicenseResourceNamesInfoMockUp: [{ resourceID: "ArchivePlan" }, { licenses: -1 },
    //                                  { resourceID: "BackupPlan" }, { licenses: 0 },
    //                                  { resourceID: "SyncPlan" }, { licenses: 5 }],
    ResourceLicenses: [],
    // LicenseResourceNames: [],
    LicenseResourceInfo: [],
  }

  componentDidMount() {
    // this.getLicenseResourceNamesInfo()
  }

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
          console.log('resourceLicenses:', resourceLicenses)
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

    // const { ResourceLicenses } = this.state
    // console.log('ResourceLicenses:', ResourceLicenses)

    // https://react.semantic-ui.com/collections/table/#types-definition
    
    return (
      <section className="jobs">
        {/* <h3 className="pool__heading">P5 Pool Info</h3> */}
        <h3 className="jobs__heading">Jobs Info</h3>
        <div className="jobs__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* GET JobNames */}
              <Table.HeaderCell>Job ID</Table.HeaderCell>
              {/* GET JobInfo */}
              <Table.HeaderCell>Label</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Completion</Table.HeaderCell>
              <Table.HeaderCell>Run At</Table.HeaderCell>
              <Table.HeaderCell>Resource Group</Table.HeaderCell>
              <Table.HeaderCell>Resource Name</Table.HeaderCell>
              <Table.HeaderCell>Total Files</Table.HeaderCell>
              <Table.HeaderCell>TotalKbytes</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {/* GET JobNames */}
                <Table.Cell>10017</Table.Cell>
                {/* GET JobInfo */}
                <Table.Cell>Incr backup for localhost</Table.Cell>
                <Table.Cell>(Hard to wrap) Incr backup for localhost (awpure), plan Nightly backup, pool bckdisk </Table.Cell>
                <Table.Cell>running</Table.Cell>
                <Table.Cell>failure</Table.Cell>
                <Table.Cell>2019-11-06T17:21:41.000Z</Table.Cell>
                <Table.Cell>::BackupTask</Table.Cell>
                <Table.Cell>10002</Table.Cell>
                <Table.Cell>420</Table.Cell>
                <Table.Cell>3240080</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table compact>
            <Table.Header>
              {/* GET JobNames */}
              <Table.HeaderCell>Job ID</Table.HeaderCell>
              {/* GET JobProtocol */}
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Start Date </Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>End Time</Table.HeaderCell>
              <Table.HeaderCell>Command</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Report (Messed up formatting - \n\n random mid sentence spaces) </Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {/* GET JobNames */}
                <Table.Cell>10017</Table.Cell>
                {/* GET JobProtocol */}
                <Table.Cell>Incr backup for localhost</Table.Cell>
                <Table.Cell>01.09.2021</Table.Cell>
                <Table.Cell>01.09.2021</Table.Cell>
                <Table.Cell>48503</Table.Cell>
                <Table.Cell>48551</Table.Cell>
                <Table.Cell>JobMgr backup 1001</Table.Cell>
                <Table.Cell>completed</Table.Cell>
                <Table.Cell>success</Table.Cell>
                <Table.Cell>Incremental save of\n /etc/byobu\n /tmp/vmware-root\n to pool Pool-001.\n Auto-stop after: 8 hours.\n
                  Client time: 01-Sep-2021 13:28:25.\n Recycle after 28 days.\n \n Drives\n Name  Files &amp; Folders  Size  Status
                  \n drive_1.1  5 5.00 KB  Finished  \n \n Volumes\n Label Id Location Barcode Drive ConfigBlkNo Rewrites WErrors
                  Recycle  \n Container volume Pool-001  10001  none none drive_1.1  none  0         0
                  \n \n \n \n File lookup summary (approximative): 2 directories with 2 files inspected\n 2 added, 0 relocated,
                  0 modified, 0 changed inode, 0 changed size, 0 other type, 3 forced, 0 marked as deleted\n \n Notice:\n
                  The (last) volume listed contains the latest copy of the configuration database.\n For container volumes also
                  the copy of the backup index(es)."</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Table compact>
            <Table.Header>
              {/* GET JobNames */}
              <Table.HeaderCell>Job ID</Table.HeaderCell>
              {/* GET JobInfo */}
              <Table.HeaderCell>Job Report</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {/* GET JobNames */}
                <Table.Cell>10017</Table.Cell>
                {/* GET JobReport */}
                <Table.Cell>Says "human readable text" Could be the Job Status</Table.Cell>
                {/* if empty '' say No Report */}
              </Table.Row>
            </Table.Body>
          </Table>

          <Table compact>
            <Table.Header>
              {/* GET JobNames */}
              <Table.HeaderCell>Job ID</Table.HeaderCell>
              {/* GET JobInventory */}
              <Table.HeaderCell>Job Inventory</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {/* GET JobNames */}
                <Table.Cell>10017</Table.Cell>
                {/* GET JobInventory */}
                <Table.Cell>Outputs a list of the files saved by the Job into a file. Headers must contain
                  “filename=?client:? path” property, where “client” is the name of the P5 Client where
                  to store the file and “path” is the complete path to the file to hold the output <br />
                  “ppath”, “volumes” , “size” , “handle” , “btime” , “mtime” “ino”           
                </Table.Cell>

              </Table.Row>
            </Table.Body>
          </Table>

          {/* <h4 className="licenseResource__heading">*Need official response format from server to extract info</h4> */}
        </div>
      </section>
    )
  }
}

export default Jobs


  // Column where you can mark what you're watching - Binocular icon =) each has a back end number 
  // then - can be sortable - place to top < Rating size = "huge" />



