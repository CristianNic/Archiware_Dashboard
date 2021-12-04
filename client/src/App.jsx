import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Redirect
import StatusMainPage from "./pages/Dashboard";
// import Archive from "./pages/ArchivePage/ArchivePage"
// import Graphs from "./pages/GraphsPage/GraphsPage"
// import Alerts from "./pages/AlertsPage/AlertsPage"
import Settings from "./pages/SettingsPage/SettingsPage";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
          <Route exact path="/status" component={StatusMainPage} />
					{/* <Route exact path="/archive" component={Archive} /> */}
					{/* <Route exact path="/graphs" component={Graphs} /> */}
					{/* <Route exact path="/alerts" component={Alerts} /> */}
					<Route exact path="/settings" component={Settings} />
				</Switch>
			</Router>
		);
	}
}

export default App;
