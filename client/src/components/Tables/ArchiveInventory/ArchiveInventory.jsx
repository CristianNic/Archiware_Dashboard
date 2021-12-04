import React, { Component } from "react";
import axios from 'axios';
import { API_URL } from '../../../utils/Auth';
import { Table } from 'semantic-ui-react';

class ArchiveInventory extends Component {

  state = {
    ArchiveInventory: [],
  }

  componentDidMount() {
    // this.getArchiveInventory()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeServer !== this.props.activeServer ||
      prevProps.refresh !== this.props.refresh)
    {
      this.getArchiveInventory()
    }
  }

  async getArchiveInventory() {

    // axios.get(url[, config])
    // axios.put(url[, data[, config]])

    // GET ArchiveInventoryIndex
    const getArchiveInventory = await axios.put(`${API_URL}/general/jobs`)
    console.log('getArchiveInventory:', getArchiveInventory)

  }

  render() {

    const { ArchiveInventory } = this.state
    
    return (
      <section className="archive-inventory">
        <h3 className="table-heading">Archive Inventory Index</h3>
        <div className="archive-inventory__table-wrapper">
          <Table compact celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Archive Inventory Index</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hello</Table.HeaderCell>
                <Table.HeaderCell>World</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Object.keys(ArchiveInventory).length === 0 ?
                (<Table.Row>
                  <Table.Cell>Loading...</Table.Cell>
                  <Table.Cell>Loading...</Table.Cell>
                </Table.Row>)
                :
                (ArchiveInventory.map(inventory =>
                  <Table.Row>
                    <Table.Cell>{inventory.item1}</Table.Cell>                 
                    <Table.Cell>{inventory.item2}</Table.Cell>                 
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

export default ArchiveInventory





