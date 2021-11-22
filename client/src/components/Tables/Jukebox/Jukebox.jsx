import axios from "axios";
import React, { Component } from "react";
import { Table, TableCell, TableRow, Button, Icon } from 'semantic-ui-react';
import { API_URL, auth } from '../../../utils/Auth';

// const USERNAME = process.env.REACT_APP_USERNAME;
// const PASSWORD = process.env.REACT_APP_PASSWORD;
// {"\u2002"} empty space 
const JukeboxNameSlotcount = [
  { name: "awjb0", slotcount: "24" },
  { name: "", slotcount: "" },
  { name: "", slotcount: "" },
  { name: "", slotcount: "" },
  { name: "", slotcount: "" },
]
// console.log('JukeboxNameSlotcount:', JukeboxNameSlotcount)

const JukeboxVolumes = [
  { slot: "1", volume: "10841" },
  { slot: "2", volume: "10432" },
  { slot: "3", volume: "10123" },
  { slot: "4", volume: "10478" },
  { slot: "5", volume: "10623" },
]
// console.log('JukeboxVolumes:', JukeboxVolumes)

const JukeboxCombined = [
  { name: "awjb0",  slotcount: "24",     slot: "1", volume: "10841" },
  { name: "\u2002", slotcount: "\u2002", slot: "2", volume: "10432" },
  { name: "\u2002", slotcount: "\u2002", slot: "3", volume: "10123" },
  { name: "\u2002", slotcount: "\u2002", slot: "4", volume: "10478" },
  { name: "\u2002", slotcount: "\u2002", slot: "5", volume: "10623" },
]
// console.log('JukeboxCombined:', JukeboxCombined)
const JukeboxCombinedEmpty = []

// 1. make data table structure
// 2. map over data displaying table
// 3. figure out calls you will need
// 4. make calls
// 5. form data object

class Jukebox extends Component {

  state = {    
    JukeboxNames: [],
    JukeboxInfo: [],
    JukeboxVolumes: [],
    JukeboxNamesInfoVolumes: [],
    JukeboxNamesInfoVolumesMock: [
      { id: "awjb0", slotcount: "24", volumeIDs: ["10441", "10421", "10478"] }],
    JukeboxSlotsVolumeIDs: []
  }

  componentDidMount() {
    // this.getJukeboxNames()
    // this.getJukeboxInfo()
    // this.getJukeboxVolumes()
    // this.getJukeboxVolumesPerSlot()
    this.getJukeboxes()
  }

  getJukeboxNames() {
    axios
      .get(`${API_URL}/general/jukeboxes`, auth)
      .then((response) => {
        // console.log("response:", response)
        // console.log("response:", response.data.jukeboxes)
        const jukeboxes = response.data.jukeboxes.map(device => device.ID)
        console.log('jukeboxes():', jukeboxes)
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
        console.log("getJukeboxInfo():", response.data)
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
        console.log("getJukeboxVolumes()", jukeboxVolumeIDs)
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
      // GET JukeboxNames
      .get(`${API_URL}/general/jukeboxes`)
      .then(async (response) => {
        const jukeboxes = response.data.jukeboxes.map(device => device.ID)
        // console.log("jukeboxNames =>", jukeboxes)
        // GET JukeboxInfo ( slotcount )
        const slotCountPromises = []
        jukeboxes.forEach((jukebox) => {
          slotCountPromises.push(axios.get(`${API_URL}/general/jukeboxes/${jukebox}`))
        })
        // console.log("Promises =>", slotCountPromises)
        return Promise.all(slotCountPromises).then(async (response) => {
          // console.log("response", response)
          const slotcounts = response.map(jukebox => jukebox.data) // <= Try server with multiple Jukeboxes
          // console.log('slotcounts:', slotcounts)

          // console.log("Jukeboxes", jukeboxes)
          // GET JukeboxVolume ( all volumes for each jukebox )
          const allVolumesPromises = []
          jukeboxes.forEach((jukebox) => {
            allVolumesPromises.push(axios.get(`${API_URL}/general/jukeboxes/${jukebox}/volumes`))
          })
          // console.log("allVolumesPromises =>", allVolumesPromises)
          return Promise.all(allVolumesPromises).then((response) => {
            // console.log("allVolumesPromises - Response", response)
            const allVolumes = response.map(volumes => volumes.data.volumes)
            // console.log('allVolumes:', allVolumes)

            // GET JukeboxVolume - get volumes for each slotID 
            const volumesPerSlotIDPromises = []
            const slotcount = slotcounts[0].slotcount // 24 
            // get(`${API_URL}/general/jukeboxes/${jukebox}/volumes`, {
            //   headers: {
            //     "slotID": "10", // cannot be 0 
            //   },
            // })
            // console.log('slotcount:', slotcount) 
            jukeboxes.forEach((jukebox) => {
              volumesPerSlotIDPromises.push(axios.get(`${API_URL}/general/jukeboxes/${jukebox}/1`))
            })
            return Promise.all(volumesPerSlotIDPromises).then((response) => {
              // console.log('volumesPerSlotIDPromises:', response)
            })
          })
        })
      })
    // first call - no header, get a list of all volumes
    // next calls each have a different clot in the header
    // axios
    //   .get(`${API_URL}/general/jukeboxes/awjb0/volumes/24`, { // slotID: "10" // In case a volume is present but unknown, a 0 is returned for that volume.
    //   })
    //   .then((response) => {
    //     const jukeboxVolumeIDs = response.data.volumes.map(device => device.ID)
    //     console.log("getJukeboxVolumesPerSlot() - VolumeIDs", jukeboxVolumeIDs)
    //     this.setState({
    //       JukeboxVolumes: jukeboxVolumeIDs,
    //     })
    //   })
    //   // next calls each have a different clot in the header
    //   .catch((error) => {
    //     console.log('error:', error);
    //   })
  }

  async getJukeboxes() {
    // ===> GET JukeboxNames  ===> [ awjb0, awjb1 ]
    const getJukeboxNames = await axios.get(`${API_URL}/general/jukeboxes`)
    console.log('jukeboxNames:', getJukeboxNames)
    const jukeboxNames = getJukeboxNames.data.jukeboxes.map(device => device.ID) // <--- [ awjb0 ]
    console.log('jukeboxNames:', jukeboxNames) // * Demo <-- 

    // ===> forEach form GET JukeboxInfo request ===> [ /general/jukebox/awjb0, /general/jukebox/awjb1 ]
    const getJukeboxInfoPromises = []
    jukeboxNames.forEach((jukebox) => {
      getJukeboxInfoPromises.push(axios.get(`${API_URL}/general/jukeboxes/${jukebox}`))
    })
    // console.log('getJukeboxInfoPromises:', getJukeboxInfoPromises)

    const getJukeboxInfo = await Promise.all(getJukeboxInfoPromises)
    // console.log('getJukeboxInfo:', getJukeboxInfo)

    const slotcount = [] // <--- [ 24 ]
    getJukeboxInfo.forEach((jukebox) => {
      slotcount.push(jukebox.data.slotcount)
    })
    // console.log("slotcount", slotcount) // * Demo <-- 
  
    // ===> GET JukeboxVolumes (by SlotID) request ===> [ /general/jukebox/awjb0/1, 
    //                                                    /general/jukebox/awjb0/2,  x 24 
    //                                                    ... 
    //                                                    /general/jukebox/awjb1/1
    //                                                    /general/jukebox/awjb1/2 ] x 24 
    // first make jukebox string
    // `${API_URL}/general/jukeboxes/awjb0`
    // `${API_URL}/general/jukeboxes/awjb1`
    // 
    // then for each jukebox set the number of sots string 
    // 

    const jukeboxUrls = []
    jukeboxNames.forEach((jukebox) => {
      jukeboxUrls.push(`${API_URL}/general/jukeboxes/${jukebox}`)
    })
    // console.log("jukeboxUrls", jukeboxUrls) // * Demo <-- 

    const slotStrings = []
    // Convert Slot Number [ 24 ] into a series and strings [ 1, 2, 3, ... 24 ]
    const slots = new Array(slotcount)
    for (let i = 0; i < slotcount; i++) {
      slots[i] = i + 1
      const string = slots[i].toString()
      slotStrings.push(string)
    }
    // console.log("slots:", slots) // [ num ] // * Demo <-- 
    // console.log("slotStrings:", slotStrings) // [ str ]

    // const jukeboxSlotVolumeUrls = []
    const jukeboxSlotVolumePromises = []
    for (let i = 0; i < slotStrings.length; i++) {    
      const url = (`${jukeboxUrls}/volumes/${slotStrings[i]}`)
      // jukeboxSlotVolumeUrls.push(url)
      jukeboxSlotVolumePromises.push(axios.get(url))
    }
    // console.table(jukeboxSlotVolumeUrls) // [ url strings ] // * Demo <-- 

    // ===> GET JukeboxVolume by slot request ===> [ /general/jukebox/awjb0/1, /general/jukebox/awjb02/2, ...]
    const jukeboxSlotVolumeIDs = await Promise.all(jukeboxSlotVolumePromises)
    // console.log("jukeboxSlotVolumeIDs:", jukeboxSlotVolumeIDs)

    //---------------- Server Error ----- GET JukeboxVolume by slot-----------------------
    // ==> slot 4 & 24 return 0 
    // In case a volume is present but unknown, a 0 is returned for that volume
    // ==> slot 5 just brakes the whole call... in P5 server it's labeled 
    // as "Drive 1::5" and the server doesn't know what to do with it - returns "Server Error"

    // const Test = await axios.get('http://localhost:8090/general/jukeboxes/awjb0/volumes/5')  // * Demo <-- 
    // console.log('Test:', Test)                                                                 // * Demo <-- 

    // Catch error for each and print "null" to get resolved promises on the page
    // https://stackoverflow.com/questions/52669596/promise-all-with-axios
    //
    //Resolved by catching error response and modifying output in proxy server         
    //  res.json({ data: { volumes: [{ ID: "Not Found" }] }, })
    //------------------------------------------------------------------------------
    
    const slotVolumeIDs = []
    jukeboxSlotVolumeIDs.forEach((slot) => {
      slotVolumeIDs.push(slot.data.volumes[0].ID)
    })
    // console.log('slotVolumeIDs:', slotVolumeIDs) // [ '10436', '0', '10438', ... ] // <--- Demo

    // Data object variables: 
    // console.log('jukeboxNames:', jukeboxNames)   // [ 'awjb0'] 
    // console.log("slotcount", slotcount)          // [ 24 ]
    // console.log("slotStrings:", slotStrings)     // [ '1', '2', 3' ]
    // console.log("space variable", "\u2002")      // [ ] keeps table cells even, as if full
    // console.log('slotVolumeIDs:', slotVolumeIDs) // [ '10436', '0', '10438', ... ]

    // Fill out two arrays so all will have length 24
    const slotcountString = [slotcount.toString()]
    
    for (let i = 0; i < slotcount - 1; i++) {
      jukeboxNames.push("\u2002")
      slotcountString.push("\u2002")
    }
    // console.log("jukeboxNames", jukeboxNames)       // [ 'awjb0', ' ', ' ', ...]
    // console.log("slotcountString", slotcountString) // [ '24', ' ', ' ', ... ]

    // form data array 
    const jukeboxSlotsVolumeIDs = []
    for (let i = 0; i < slotcount; i++) {
      const obj = {
        name: jukeboxNames[i],
        slotcount: slotcountString[i], 
        slot: slotStrings[i],
        volume: slotVolumeIDs[i]
      }
      jukeboxSlotsVolumeIDs.push(obj)
    }
    // console.log("jukeboxSlotsVolumeIDs:", jukeboxSlotsVolumeIDs) // * Demo <--

    this.setState({
      JukeboxSlotsVolumeIDs: jukeboxSlotsVolumeIDs
    })
  }

  render() {
    // const { JukeboxNames, JukeboxInfo, JukeboxVolumes, JukeboxNamesInfoVolumes } = this.state
    const { JukeboxSlotsVolumeIDs } = this.state
    // console.log("JukeboxSlotsVolumeIDs", JukeboxSlotsVolumeIDs)
    // console.log('JukeboxInfo:', JukeboxInfo)
    // console.log('JukeboxVolumes:', JukeboxVolumes)
    // console.log('JukeboxNamesInfoVolumes:', JukeboxNamesInfoVolumes)

    return (
      <section className="jukebox">
        <h3 className="jukebox__heading">Jukebox Info</h3>
        <div className="jukebox__table-wrapper">
          <Table compact celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='1'>Jukebox</Table.HeaderCell>
                <Table.HeaderCell colSpan='3'>awjb0</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>  
                <Table.HeaderCell>Slotcount</Table.HeaderCell>
                <Table.HeaderCell>Slot</Table.HeaderCell>
                <Table.HeaderCell>Volume</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(JukeboxSlotsVolumeIDs).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (JukeboxSlotsVolumeIDs.map(jukebox =>
                  <Table.Row>
                      <Table.Cell>{jukebox.name}</Table.Cell>
                      <Table.Cell>{jukebox.slotcount}</Table.Cell>
                      <Table.Cell>{jukebox.slot}</Table.Cell>
                    {jukebox.volume === '0' ?
                      (<Table.Cell>present & unknown</Table.Cell>)
                    : (<Table.Cell>{jukebox.volume}</Table.Cell>)}
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







