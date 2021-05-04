// @material-ui/icons
import { Dashboard, FindReplace } from "@material-ui/icons";
import DashboardPage from "views/Dashboard/Dashboard.js";
import FindTweet from "views/FindTweet";

const dashboardRoutes = [
	{
		name: "Dashboard",
		icon: Dashboard,
		component: DashboardPage,
		layout: "/dashboard",
		exact: true,
	},
	{
		name: "Search Tweet",
		icon: FindReplace,
		component: FindTweet,
		layout: "/search-tweet",
		exact: true,
	},
];

export default dashboardRoutes;
