import axios from "axios";
import React, { Component } from "react";
import { Tab, Table } from 'semantic-ui-react'; // Rating
import { API_URL, auth } from '../../../utils/Auth';

// 1. make data table structure
// 2. map over data displaying table
// 3. figure out calls you will need
// 4. make calls
// 5. form data object

const JobTable = [
  { jobID: "10017", status: "running", result: "failure", report: "words words words" },
  { jobID: "10035", status: "completed", result: "success", report: "words words words" },
  { jobID: "10086", status: "completed", result: "warning", report: "words words words" },
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

    // Sort Data => failed, warning, success
    
  }


  render() {
    
    const { Jobs } = this.state

    return (
      <section className="jobs">
        <h3 className="jobs__heading">Jobs Info</h3>
        <div className="jobs__table-wrapper">

          {/* Table with only one Cell colored  */}
          <Table compact>
            <Table.Header>
              <Table.HeaderCell>Job ID</Table.HeaderCell>  
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Report</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {Object.keys(Jobs).length === 0 ?
                (<Table.Row>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                </Table.Row>)
                :
                (Jobs.map(job =>
                  <Table.Row>
                      <Table.Cell>{job.jobID}</Table.Cell>
                      <Table.Cell>{job.status}</Table.Cell>
                      {/* <Table.Cell>{job.result}</Table.Cell> */}
                      {job.result === 'success' ?
                        (<Table.Cell positive>{job.result}</Table.Cell>)
                      :job.result === 'warning' ?
                        (<Table.Cell warning>{job.result}</Table.Cell>)
                      : (<Table.Cell negative>{job.result}</Table.Cell>)}
                      <Table.Cell>{job.report}</Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>

          
          <Table compact>
            <Table.Header>
              <Table.HeaderCell>Job ID</Table.HeaderCell>  
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Report</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {Object.keys(Jobs).length === 0 ?
                (<Table.Row>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                </Table.Row>)
                :
                (Jobs.map(job =>
                  job.result === 'success' ?
                    ( <Table.Row positive>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>)
                  : job.result === 'warning' ?
                    ( <Table.Row warning>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>)
                        :
                    ( <Table.Row negative>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>
                    )
                ))
              }
            </Table.Body>
          </Table>

          
          {/* <Table compact>
            <Table.Header>
              <Table.HeaderCell>Job ID</Table.HeaderCell>  
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Report</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {Object.keys(Jobs).length === 0 ?
                (<Table.Row>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                </Table.Row>)
                :
                (Jobs.result === 'success' ?
                  (Jobs.map(job => 
                    <Table.Row positive>
                      <Table.Cell>{job.jobID}</Table.Cell>
                      <Table.Cell>{job.status}</Table.Cell>
                      <Table.Cell>{job.result}</Table.Cell>
                      <Table.Cell>{job.report}</Table.Cell>
                    </Table.Row>
                  ))
                  :
                  (Jobs.map(job => 
                    <Table.Row>
                      <Table.Cell>{job.jobID}</Table.Cell>
                      <Table.Cell>{job.status}</Table.Cell>
                      <Table.Cell>{job.result}</Table.Cell>
                      <Table.Cell>{job.report}</Table.Cell>
                    </Table.Row>
                  ))
                )
              }
            </Table.Body>
          </Table> */}

          
          {/* <Table compact>
            <Table.Header>
              <Table.HeaderCell>Job ID</Table.HeaderCell>  
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Report</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              {Object.keys(Jobs).length === 0 ?
                (<Table.Row>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                  <Table.Cell>connection down</Table.Cell>
                </Table.Row>)
                :
                (Jobs.map(job =>
                  { job.result === "success" ?
                    (<Table.Row>
                      <Table.Cell>{job.jobID}</Table.Cell>
                      <Table.Cell>{job.status}</Table.Cell>
                      <Table.Cell>{job.result}</Table.Cell>
                      <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>)
                    :
                    (<Table.Row>
                      <Table.Cell>{job.jobID}</Table.Cell>
                      <Table.Cell>{job.status}</Table.Cell>
                      <Table.Cell>{job.result}</Table.Cell>
                      <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>)
                  }
                ))
              }
            </Table.Body>
          </Table> */}

          
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



