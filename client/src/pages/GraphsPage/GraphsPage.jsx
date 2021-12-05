import React, { Component } from "react";
// import axios from 'axios';
// import { API_URL } from '../../utils/Auth';
import Header from "../../components/Header/Header"
import ServerMenu from "../../components/ServerMenu/ServerMenu"
import Sidebar from "../../components/Sidebar/Sidebar";

class Settings extends Component {

  state = { }

  componentDidMount() {
  }
  
  render() {
    
    return (
      <section className="graphsPage">
        <Header />
        <ServerMenu />

        <h3 className="table-heading">Server: </h3>
        <h3 className="table-heading">Page: </h3>

        <Sidebar />
      </section>
    )
  }
}

export default Settings
