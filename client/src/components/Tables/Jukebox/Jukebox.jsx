import React, { Component } from "react";
import axios from "axios";
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/auth';
import server from '../../../utils/server';

class Jukebox extends Component {

  state = {
    JukeboxName: [],
    JukeboxTable: [],
  }

  componentDidMount() {
    this.getJukeboxes()                   
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
        prevProps.refresh !== this.props.refresh)
    {
      this.getJukeboxes()
    }
  }
  
  async getJukeboxes() {
    // TODO: Add code to handle more Jukeboxes and volumes and rearrange table display.
    // Current client has requested this version for now as they only only monitor servers with one Jukebox and one volume. 

    const getJukeboxNames = await axios.get(`${API_URL}/general/jukeboxes`, server(this.props.activeServer))
    const jukeboxName = getJukeboxNames.data.jukeboxes.map(device => device.ID)

    const getJukeboxInfo = await (axios.get(`${API_URL}/general/jukeboxes/${jukeboxName}`, server(this.props.activeServer)))
    const slotcount = getJukeboxInfo.data.slotcount

    const slotStrings = []
    const slots = new Array(slotcount)
    for (let i = 0; i < slotcount; i++) {
      slots[i] = i + 1
      const string = slots[i].toString()
      slotStrings.push(string)
    }
    const getJukeboxVolumePromises = []
    slotStrings.forEach((slot) => {
      getJukeboxVolumePromises.push(axios.get(`${API_URL}/general/jukeboxes/${jukeboxName}/volumes/${slot}`, server(this.props.activeServer)))
    })

    const getJukeboxVolume = await Promise.all(getJukeboxVolumePromises)

    const jukeboxVolumeIDs = getJukeboxVolume.map(volume => volume.data.volumes[0].ID) 

    const getVolumeNamesPromises = []
    jukeboxVolumeIDs.forEach((volumeID) => {
      getVolumeNamesPromises.push(axios.get(`${API_URL}/general/volumes/${volumeID}`, server(this.props.activeServer)))
    })

    const getVolumeNames = await Promise.all(getVolumeNamesPromises) 

    const label = getVolumeNames.map(volume => volume.data.label) 
    const mode = getVolumeNames.map(volume => volume.data.mode) 
    const barcode = getVolumeNames.map(volume => volume.data.barcode)
    
    const jukeboxTable = []
    for (let i = 0; i < jukeboxVolumeIDs.length; i++) {
      const obj = {
        volumeID: jukeboxVolumeIDs[i],
        label: label[i],
        barcode: barcode[i],
        mode: mode[i],
        slot: slotStrings[i]
      }
      jukeboxTable.push(obj)
    }
    this.setState({
      JukeboxName: jukeboxName,
      JukeboxTable: jukeboxTable
    })
  }

  render() {

    const { JukeboxName, JukeboxTable } = this.state

    return (
      <section className="jukebox">
        <h3 className="table-heading">Jukebox Info</h3>
        <div className="jukebox__table-wrapper border">
          <Table compact celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='1'>Jukebox</Table.HeaderCell>
                {Object.keys(JukeboxTable).length === 0 ?
                  (<Table.HeaderCell colSpan='4'>loading...</Table.HeaderCell>)
                : (<Table.HeaderCell colSpan='4'>{JukeboxName}</Table.HeaderCell>)
                }
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Vol ID</Table.HeaderCell>  
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Barcode</Table.HeaderCell>
                <Table.HeaderCell>Mode</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(JukeboxTable).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (JukeboxTable.map(jukebox =>
                  <Table.Row key={jukebox.slot}>
                      <Table.Cell>{jukebox.volumeID}</Table.Cell>
                      <Table.Cell>{jukebox.label}</Table.Cell>
                      <Table.Cell>{jukebox.barcode}</Table.Cell>
                      <Table.Cell>{jukebox.mode}</Table.Cell>
                      <Table.Cell>Slot {jukebox.slot}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default Jukebox







