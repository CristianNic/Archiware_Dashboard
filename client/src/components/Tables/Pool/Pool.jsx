import React, { Component } from "react";
// import axios from "axios";
// import { API_URL } from '../../../utils/auth';
import { Table } from 'semantic-ui-react';

class Pool extends Component {

  state = {    
    PoolTable: [],
  }

  componentDidMount() {
    // this.getPools()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
        prevProps.refresh !== this.props.refresh)
    {
      this.getPools()
    }
  }

  getPools() {

  }

  render() {

    return (
      <section className="pool">
        <h3 className="table-heading">Pool Info</h3>
        <div className="pool__table-wrapper">
          <Table compact>
            <Table.Header>
              {/* GET PoolNames */}
                <Table.HeaderCell>Name</Table.HeaderCell>  
              {/* GET PoolInfo */}
              <Table.HeaderCell>Media Type</Table.HeaderCell>
              <Table.HeaderCell>Usage</Table.HeaderCell>
              <Table.HeaderCell>Used Size</Table.HeaderCell>
              <Table.HeaderCell>Total Size</Table.HeaderCell>
              <Table.HeaderCell>Enabled</Table.HeaderCell>
              <Table.HeaderCell>Drive Count</Table.HeaderCell>
              {/* GET PoolVolumes */}
                <Table.HeaderCell>Volumes</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Dog</Table.Cell>
                <Table.Cell>DISK</Table.Cell>
                <Table.Cell>Archive</Table.Cell>
                <Table.Cell>0</Table.Cell>
                <Table.Cell>107374182400</Table.Cell>
                <Table.Cell>true</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>
                  Pool Volume Name<br/>
                  Pool Volume Name<br/>
                  Pool Volume Name<br/>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </section>
    )
  }
}

export default Pool





