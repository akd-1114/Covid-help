import React, { useState, useEffect } from "react";
// import moment from "moment";
import _ from "lodash";
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import TweetsSelectCards from "../TweetsSelectCards";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles({
	...styles,
	root: {
		maxWidth: 345,
		overflow: "auto",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: blue[500],
	},
	followers: {
		float: "right",
	},
});

export default function Dashboard() {
	const classes = useStyles();
	const [cityArray, setCityArray] = useState([]);
	const [dataSource, setDataSource] = useState({});

	useEffect(() => {
		axios
			.get("https://devcovidhelperbackend.dev.cglcloud.in/")
			.then((res) => {
				console.log("Result", res);
				const temp = _.get(res, "data.data");
				setDataSource(temp);
				const tempData = Object.keys(temp).map((val) => val);
				setCityArray(tempData);
			})
			.catch((err) => {
				console.log("Error", err);
			});
	}, []);

	return (
		<div>
			<TweetsSelectCards
				dataSource={dataSource}
				cityArray={cityArray}
				classes={classes}
			/>
		</div>
	);
}
