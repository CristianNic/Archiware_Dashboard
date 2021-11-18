import axios from "axios";
import React, { Component } from "react";
import { Table, TableCell, TableRow } from 'semantic-ui-react';
import { API_URL, auth } from '../../../utils/Auth';

const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

class Jukebox extends Component {

  state = {    
    JukeboxNames: [],
    JukeboxInfo: [],
    JukeboxVolumes: [],
    JukeboxNamesInfoVolumes: [],
    JukeboxNamesInfoVolumesMock: [
      { id: "awjb0", slotcount: "24", volumeIDs: ["10441", "10421", "10478"] }],
  }

  componentDidMount() {
    this.getJukeboxNames()
    // this.getJukeboxInfo()
    this.getJukeboxVolumes()
    this.getJukeboxVolumesPerSlot()
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

  getJukeboxNames() {
    axios
      .get(`${API_URL}/general/jukeboxes`, auth)
      .then((response) => {
        // console.log("response:", response)
        // console.log("response:", response.data.jukeboxes)
        const jukeboxes = response.data.jukeboxes.map(device => device.ID)
        // console.log('jukeboxes:', jukeboxes)
        this.setState({
          JukeboxNames: jukeboxes,
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }

  getJukeboxInfo() {
    axios
      .get(`${API_URL}/general/jukeboxes/awjb0`, auth)
      .then((response) => {
        // console.log("response:", response)
        // const jukeboxes = response.data.jukeboxes.map(device => device.ID)
        // console.log('jukeboxes:', jukeboxes)
        this.setState({
          JukeboxInfo: response.data,
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }

  getJukeboxVolumes() {
    axios
      .get(`${API_URL}/general/jukeboxes/awjb0/volumes`, auth)
      .then((response) => {
        // console.log("Jukebox volumes response:", response)
        const jukeboxVolumeIDs = response.data.volumes.map(device => device.ID)
        // console.log('jukeboxes:', jukeboxVolumeIDs)
        this.setState({
          JukeboxVolumes: jukeboxVolumeIDs,
        })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }

  getJukeboxVolumesPerSlot() {
    axios
      .get(`${API_URL}/general/jukeboxes/awjb0/volumes`, {
        // auth: {
        //   username: USERNAME,
        //   password: PASSWORD,
        // },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "origin",
          "slotID": "10", // cannot be 0 
        },
        crossDomain: true,
      })
      .then((response) => {
        console.log("getJukeboxVolumesPerSlot response:", response)
        // const jukeboxVolumeIDs = response.data.volumes.map(device => device.ID)
        // console.log('jukeboxes:', jukeboxVolumeIDs)
        // this.setState({
        //   JukeboxVolumes: jukeboxVolumeIDs,
        // })
      })
      .catch((error) => {
        console.log('error:', error);
      })
  }

  render() {

    const { JukeboxNames, JukeboxInfo, JukeboxVolumes, JukeboxNamesInfoVolumes } = this.state
    console.log("JukeboxNames", JukeboxNames)
    console.log('JukeboxInfo:', JukeboxInfo)
    console.log('JukeboxVolumes:', JukeboxVolumes)
    // console.log('JukeboxNamesInfoVolumes:', JukeboxNamesInfoVolumes)

    return (
      <section className="jukebox">
        {/* <h3 className="jukebox__heading">P5 Jukebox Info</h3> */}
        <h3 className="jukebox__heading">Jukebox Info</h3>
        <div className="jukebox__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* GET JukeboxNames */}
                <Table.HeaderCell>Name</Table.HeaderCell>  
              {/* GET JukeboxInfo */}
              <Table.HeaderCell>Slotcount</Table.HeaderCell>
              <Table.HeaderCell>Slot</Table.HeaderCell>
              {/* GET JukeboxVolumes */}
                <Table.HeaderCell>Volumes</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Jelly</Table.Cell>
                <Table.Cell>100</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Jukebox Volume Name</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>Jukebox Volume Name</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>Jukebox Volume Name</Table.Cell>
              </Table.Row>
              {/* <TableRow>
                <Table.Cell>
                  Total
                </Table.Cell>
              </TableRow> */}
            </Table.Body>
          </Table>

          <Table compact>
            <Table.Header>
              {/* GET JukeboxNames */}
                <Table.HeaderCell>Name</Table.HeaderCell>  
              {/* GET JukeboxInfo */}
              <Table.HeaderCell>Slotcount</Table.HeaderCell>
              {/* GET JukeboxVolumes */}
                <Table.HeaderCell>Volumes</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Jelly</Table.Cell>
                <Table.Cell>100</Table.Cell>
                <Table.Cell>
                  Jukebox Volume Name<br/>
                  Jukebox Volume Name<br/>
                  Jukebox Volume Name<br/>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default Jukebox







