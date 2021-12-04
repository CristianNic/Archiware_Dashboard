import React, { Component } from "react";
import Header from "../components/Header/Header"
import ServerMenu from "../components/ServerMenu/ServerMenu"
import Sidebar from "../components/Sidebar/Sidebar"
import Layout from "../components/Layout/Layout"

class Dashboard extends Component {
  
  state = { 
    activeServer: 'BackupServerMini',
    activePage: 'status',              
    updateIntervalMin: 20, 
    refresh: true,                     
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
  
  selectServerClick = (name) => {
    if (name === "BackupServerMini") {
      this.setState({
        activeServer: name
      })
    } else if (name === "MunkiServer") {
      this.setState({
        activeServer: name
      })
    } else if (name === "MockAPI") {
      this.setState({
        activeServer: name
      })
    }
  }

  selectPageClick = (name) => {
    if (name === "status") {
      this.setState({
        activePage: name
      })
    } else if (name === "archiveIndex") {
      this.setState({
        activePage: name
      })
    } else if (name === "graphs") {
      this.setState({
        activePage: name
      })
    } else if (name === "alerts") {
      this.setState({
        activePage: name
      })
    } else if (name === "settings") {
      this.setState({
        activePage: name
      })
    }
  }
  
  render() {
    
    const { activeServer, activePage, refresh } = this.state
    
    return (
      <section className="dash">
        <div className="dash__container">
          <Header />
          <ServerMenu
            activeServer={activeServer} 
            selectServerClick={this.selectServerClick}
          />
          <div className="dash__main">
            <Sidebar
              activeServer={activeServer}
              activePage={activePage}  
              selectPageClick={this.selectPageClick} />
            <Layout
              activeServer={activeServer}
              refresh={refresh}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default Dashboard