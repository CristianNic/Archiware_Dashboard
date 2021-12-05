import React, { Component } from "react";
// import axios from 'axios';
// import { API_URL, auth } from '../../utils/Auth';
import Header from "../../components/Header/Header"
import ServerMenu from "../../components/ServerMenu/ServerMenu"
import Sidebar from "../../components/Sidebar/Sidebar";


class Settings extends Component {

  state = {
    activeServer: 'BackupServerMini',
  }

  componentDidMount() {
    window.location.reload(false); // test
  }
  
  render(props) {

    const { activePage, activeServer } = this.props.location.aboutProps
    console.log("SettingsPage - activeServer:", activeServer)
    console.log("SettingsPage - activePage:", activePage)
    
    return (
      <section className="settingsPage">
        <Header />
        <ServerMenu />

        <h3 className="table-heading">Server: {activeServer}</h3>
        <h3 className="table-heading">Page: {activePage}</h3>

        <Sidebar />
      </section>
    )
  }
}

export default Settings
