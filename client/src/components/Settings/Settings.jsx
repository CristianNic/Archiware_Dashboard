import React, { Component } from "react";
import axios from 'axios';
import { API_URL, auth } from '../../utils/Auth';

class Settings extends Component {

  state = {
    Welcome: [],
    HomePage: []
  }

  componentDidMount() {
    this.getWithBase64()
    this.getHomePage()
  }
  
  getWithBase64() {
    axios
      .get(`${API_URL}/base64auth`, auth)
      .then((response) => {
        console.log("Base64",response)
        console.log("Base64",response.data)
        console.log("Base64 - headers", response.headers)
        this.setState({
          Welcome: response.data.Welcome,
        })
      })
      .catch((error) => {
        console.log('error:', error);
        console.log('error:', error.message);
        // console.log('error:', error.response.status);
        console.log('error:', error.response);
      })
  }

  getHomePage() {
    console.log("getHomePage() called")
    axios
      .get(`${API_URL}/`, auth)
      .then((response) => {
        console.log("getHomePage", response)
        this.setState({
          HomePage: response.data.HomePage,
        })
      })
  }
  
  
  render() {

    console.log("Settings - API_URL", API_URL)
    
    return (
      <section className="settings">
        <h3 className="settings__heading">Settings</h3>
        <h3 className="settings__heading">{this.state.Welcome}</h3>
        {/* <h3 className="settings__hostname">Hostname: {SrvInfo.hostname}</h3>
        <h3 className="settings__ip">Address: {SrvInfo.address}</h3> */}
        <h3 className="settings__ip">Connected Server URL: {API_URL}</h3>
        {/* Display username + password, checkmark box to show/hide
        add note "for dev version, change password and username can be changed from .env" */}
        
      </section>
    )
  }
}

export default Settings
