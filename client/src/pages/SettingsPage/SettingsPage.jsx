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
    window.location.reload(false);
  }
  
  render(props) {

    // console.log("Sidebar Props", this.props.location.aboutProps.activePage)

    // console.log(this.props.location.aboutProps.activeServer)
    // console.log(this.props.location.aboutProps.activePage)
    // console.log(this.props.location.activePage)

    const { activePage, activeServer } = this.props.location.aboutProps
    console.log("SettingsPage:", activeServer)
    console.log("SettingsPage:", activePage)
    // console.log("SettingsPage:", activeServer)
    // console.log("SettingsPage:", yes)

    

    return (
      <section className="settings">

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
