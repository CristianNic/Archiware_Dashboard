import React, { Component } from "react";
import Header from "../components/Header/Header"
import ServerMenu from "../components/ServerMenu/ServerMenu"
import Sidebar from "../components/Sidebar/Sidebar"
import Status from "../components/Sections/Status/Status"
import Archive from "../components/Sections/Archive/Archive"
import Graphs from "../components/Sections/Graphs/Graphs"
import Alerts from "../components/Sections/Alerts/Alerts"
import Settings from "../components/Sections/Settings/Settings";

class Dashboard extends Component {
  
  state = { 
    activeServer: 'BackupServerMini',
    activePage: 'status',              
    updateIntervalMin: 20, 
    refresh: true,
    sidebar: true,
  }

  componentDidMount() {
    this.myTimer = setInterval(() => {        
       this.refresh()                    
    }, (this.state.updateIntervalMin * 60000))
  }

  componentWillUnmount() {
    clearInterval(this.myTimer)
  }
  
  refresh() {
    this.setState({ refresh: !this.state.refresh})
  }
  
  selectServerClick = (e, { name }) => {
    if (name === "BackupServerMini") {
      console.log("Server", name)
      this.setState({
        activeServer: name,
      })
    } else if (name === "MunkiServer") {
      console.log("Server", name)
      this.setState({
        activeServer: name
      })
    } else if (name === "MockAPI") {
      console.log("Server", name)
      this.setState({
        activeServer: name
      })
    }
  }

  selectPageClick = (e, { name }) => {
    if (name === "status") {
      console.log("Page:", name)
      this.setState({
        activePage: name
      })
    } else if (name === "archive") {
      console.log("Page:", name)
      this.setState({
        activePage: name
      })
    } else if (name === "graphs") {
      console.log("Page:", name)
      this.setState({
        activePage: name
      })
    } else if (name === "alerts") {
      console.log("Page:", name)
      this.setState({
        activePage: name
      })
    } else if (name === "settings") {
      console.log("Page:", name)
      this.setState({
        activePage: name
      })
    }
  }
  
  selectSidebar = (e, { name }) => {
    if (name === "sidebar") {
      console.log("clicked sidebar")
      this.setState({
        sidebar: !this.state.sidebar
      })
    }
  }
  
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    
    const { activeServer, activePage, refresh, sidebar } = this.state

    return (
      <section className="mainPage">
        <div className="mainPage__container">
          <Header
            selectSidebar={this.selectSidebar}/>
          <ServerMenu
            activeServer={activeServer}
            selectServerClick={this.selectServerClick}
            sidebar={sidebar}
          />
          <div className="mainPage__main">
          {sidebar === true ? (
            <Sidebar
              activeServer={activeServer}
              activePage={activePage}  
              selectPageClick={this.selectPageClick} 
            />
          ) : (
            <div></div>
          )}
          { activePage === "status" ? (
            <Status
              activeServer={activeServer}
              refresh={refresh}
              sidebar={sidebar}
            />
          ) : activePage === "archive" ? (
            <Archive
              activeServer={activeServer}
              activePage={activePage}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          ) : activePage === "graphs" ? (  
            <Graphs
              activeServer={activeServer}
              activePage={activePage}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          ) : activePage === "alerts" ? (   
            <Alerts
              activeServer={activeServer}
              activePage={activePage}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          ) : activePage === "settings" ? (   
            <Settings
              activeServer={activeServer}
              activePage={activePage}
              capitalizeFirstLetter={this.capitalizeFirstLetter}
            />
          ) : (
            <h3>Select Server</h3>
          )}
          </div>
        </div>
      </section>
    )
  }
}

export default Dashboard















