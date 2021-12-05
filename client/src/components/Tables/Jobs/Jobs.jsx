import React, { Component } from "react";
import axios from "axios";
import { Table } from 'semantic-ui-react';
import { API_URL } from '../../../utils/auth';
import server from '../../../utils/server';

class Jobs extends Component {

  state = {    
    jobInfoTableSorted: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
        prevProps.refresh !== this.props.refresh)
    {
      this.getJobs()
    }
  }
  
  async getJobs() {
    // communicating with Archiware, currently filters are still being worked on:
    // "completed, failed, pending, running or warning" return "Internal Server Error:"
    const getJobNames = await axios.get(`${API_URL}/general/jobs/`, server(this.props.activeServer))

    const jobIDs = getJobNames.data.jobs.map(job => job.ID) 

    const getJobProtocolPromises = []
    jobIDs.forEach((id) => {
      getJobProtocolPromises.push(axios.get(`${API_URL}/general/jobs/${id}/protocol`, server(this.props.activeServer)))
    })
    const getJobProtocol = await Promise.all(getJobProtocolPromises)

    const result = []  
    const status = [] 
    getJobProtocol.forEach((job) => {
      result.push(job.data.completion)
      status.push(job.data.status)
    })

    const getJobReportPromises = []
    jobIDs.forEach((id) => {
      getJobReportPromises.push(axios.get(`${API_URL}/general/jobs/${id}/report`, server(this.props.activeServer)))
    })
    const getJobReport = await Promise.all(getJobReportPromises)

    const reports = getJobReport.map(report => report.data)

    const formattedReports = []
    reports.forEach((report) => {
      if (report === "<empty>") {
        formattedReports.push("empty") 
      } else {
        formattedReports.push(report)
      }
    }) 
    const jobInfoTable = []
    for (let i = 0; i < jobIDs.length; i++) {
      const obj = {
        jobID: jobIDs[i],
        result: result[i],
        status: status[i],
        report: formattedReports[i]
      }
      jobInfoTable.push(obj)
    }

    const failure = []
    const warning = []
    const success = []
    const rest = []

    jobInfoTable.map((job) => {
      if (job.result === "failure") {
        failure.push(job)
      } else if (job.result === "warning") {
        warning.push(job)
      } else if (job.result === "success") {
        success.push(job)
      } else {
        rest.push(job)
      }
    })
    const jobInfoTableSorted = [...failure, ...warning, ...success, ...rest]

    this.setState({
      jobInfoTableSorted: jobInfoTableSorted
    })
  }  

  render() {
    
    const { jobInfoTableSorted } = this.state

    return (
      <section className="jobs">
        <h3 className="table-heading">Jobs Info</h3>
        <div className="jobs__table-wrapper border">
          <Table compact celled striped className="jobs-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Job{"\u00A0"}ID</Table.HeaderCell>  
                <Table.HeaderCell>Result</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Report</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(jobInfoTableSorted).length === 0 ?
                (<Table.Row>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                  <Table.Cell>loading...</Table.Cell>
                </Table.Row>)
                :
                (jobInfoTableSorted.map(job =>
                  job.result === 'success' ?
                    ( <Table.Row positive>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell className>{job.report}</Table.Cell>
                      </Table.Row>)
                  : job.result === 'warning' ?
                    ( <Table.Row warning>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>)
                  :
                    ( <Table.Row negative>
                        <Table.Cell>{job.jobID}</Table.Cell>
                        <Table.Cell>{job.result}</Table.Cell>
                        <Table.Cell>{job.status}</Table.Cell>
                        <Table.Cell>{job.report}</Table.Cell>
                      </Table.Row>
                    )
                ))
              }
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default Jobs


