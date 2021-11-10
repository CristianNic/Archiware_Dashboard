import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Redirect
import Dashboard from "./pages/Dashboard";
// import Controls_Sandbox from "./components/Controls_Sandbox/Controls_Sandbox";
import Settings from "./components/Settings/Settings";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/base64auth" component={Settings} />
					{/* <Route exact path="/controls_sandbox" component={Controls_Sandbox} /> */}
				</Switch>
			</Router>
		);
	}
}

export default App;
