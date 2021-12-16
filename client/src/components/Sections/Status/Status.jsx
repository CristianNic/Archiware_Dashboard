import React, { Component } from "react";
import SrvInfo from "../../Tables/SrvInfo/SrvInfo";
import Client from "../../Tables/Client/Client";
import Jobs from "../../Tables/Jobs/Jobs";
import Devices from "../../Tables/Devices/Devices";
import Jukebox from "../../Tables/Jukebox/Jukebox";
  
class Status extends Component {
  
  state = { }

  render() {
    
    const { activeServer, refresh, sidebar } = this.props

    return (
      <section className={`layout__container ${sidebar === true ? "" : "margin"}`}>
        <div className="layout__row1">
          <div className="layout__row1-col1">
            <SrvInfo
              activeServer={activeServer}
            />
            <Client activeServer={activeServer} />
            <Jobs
              activeServer={activeServer}
            />
          </div>
          <div className="layout__row1-col2">
            <Devices
              activeServer={activeServer}
              refresh={refresh}
            />
            <Jukebox
              activeServer={activeServer}
              refresh={refresh}
            />
          </div>
        </div>
      </section>
    )      
  }
}

export default Status
