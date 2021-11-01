import React, { Component } from "react";
import { Button, Divider, Table } from 'semantic-ui-react';

class Refresh extends Component {

  state = {

  }

  render() {

    // const { SrvInfo } = this.props
      
    return (
      <section className="refresh">
        <Button
          // compact 
          className="refresh__btn" // loading // add isLoaded to state
          // onClick={() => this.refreshData()}>
          onClick={this.props.refreshData}>
          Refresh
          </Button>
        {/* <div className="dashboard__refresh-timer">
          <h3> Next refresh in...  </h3>
          <CountDownTimer
            hoursMinSecs={hoursMinSecs}
            refreshData={this.refreshData}
          />
        </div> */}
      </section>
    )
  }

}


export default Refresh
