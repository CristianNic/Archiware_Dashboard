import React, { Component } from "react";
// import axios from 'axios';
// import { API_URL } from '../../utils/Auth';

class Graphs extends Component {

  state = { }

  componentDidMount() {
  }
  
  render() {
    
    const { activePage, activeServer, capitalizeFirstLetter } = this.props

    return (
      <section className="graphs">
        <div className="temp__container">
          <h3 className="temp__heading-main">Coming Soon</h3>
          <h3 className="temp__heading">{activeServer}</h3>
          <h3 className="temp__heading">{capitalizeFirstLetter(activePage)}</h3>
        </div>
      </section>
    )
  }
}

export default Graphs
