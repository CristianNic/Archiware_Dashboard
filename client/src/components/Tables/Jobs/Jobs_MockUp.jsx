import axios from "axios";
import React, { Component } from "react";
import { Table } from 'semantic-ui-react'; // Rating
import { API_URL, auth } from '../../../utils/Auth';

// 1. make data table structure
// 2. map over data displaying table
// 3. figure out calls you will need
// 4. make calls
// 5. form data object

const JobTable = [
  { jobID: "10017", status: "running", result: "failure", jobReport: "words words words" },
  { jobID: "10035", status: "completed", result: "success", jobReport: "words words words" },
]
// what does a job with a warning look like? 

class Jobs extends Component {

  state = {    
    Jobs: JobTable,
  }

  componentDidMount() {
    this.getJobs()
  }

  async getJobs() {
    // GET JobName
    // GET JobInfo
    // GET Job Report 
    
    console.log("HEllo Jobs!")
  }


  render() {
    
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


        </div>
      </section>
    )
  }
}

export default Jobs

    // <Table.Footer>
    //   <Table.Row>
    //     <Table.HeaderCell>3 People</Table.HeaderCell>
    //     <Table.HeaderCell>2 Approved</Table.HeaderCell>
    //     <Table.HeaderCell />
    //   </Table.Row>
    // </Table.Footer >
      
  // Column where you can mark what you're watching - Binocular icon =) each has a back end number 
  // then - can be sortable - place to top < Rating size = "huge" />



