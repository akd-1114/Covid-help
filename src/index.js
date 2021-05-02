import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "./global.scss";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/health">
				<h3>Hey There!!! The App is Healthy</h3>
			</Route>
			<Route path="/" component={Admin} />
			{/* <Route path="/rtl" component={RTL} /> */}
			{/* <Redirect from="/" to="/dashboard" /> */}
		</Switch>
	</Router>,
	document.getElementById("root")
);
