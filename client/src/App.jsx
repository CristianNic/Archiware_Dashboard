import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Redirect
import MainPage from "./pages/MainPage";

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
          <Route exact path="/" component={MainPage} />
				</Switch>
			</Router>
		);
	}
}

export default App;
