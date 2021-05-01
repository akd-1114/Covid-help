import React, { useState, useEffect } from "react";
import moment from "moment";
import _ from "lodash";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import tweetData from "../../dummy/data.json";
// @material-ui/icons
// import Icon from "@material-ui/core/Icon";

import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Card,
	CardContent,
	Typography,
} from "@material-ui/core";
// core components

import { bugs, website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const dummyData = {
	bangalore: [
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
	],
	delhi: [
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
	],
	indore: [
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "it is a tweet",
			timestamp: moment().format("llll"),
		},
		{
			tweet: "which day it is?",
			timestamp: moment().format("llll"),
		},
	],
};

export default function Dashboard() {
	const classes = useStyles();
	const [city, setCity] = useState("");
	const [cityArray, setCityArray] = useState([]);

	const handleChange = (e) => {
		setCity(e.target.value);
	};

	useEffect(() => {
		const temp = Object.keys(tweetData.data).map((val) => val);
		// console.log("Temp", temp);
		setCityArray(temp);
	}, []);

	// useEffect(() => {
	// 	fetch("http://13.234.203.121:5000/", {
	// 		mode: "no-cors",
	// 		// method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	})
	// 		.then((res) => {
	// 			console.log("Result", res);
	// 		})
	// 		.catch((err) => {
	// 			console.log("Error", err);
	// 		});
	// });

	console.log("City", city, dummyData[city], tweetData.data);

	return (
		<div>
			<FormControl style={{ width: "50%" }} className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Select The City</InputLabel>

				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={city}
					onChange={handleChange}
				>
					{cityArray &&
						cityArray.map((name) => {
							return <MenuItem value={name}>{name}</MenuItem>;
						})}
				</Select>
			</FormControl>

			<div className="container-fluid" style={{ paddingTop: "20px" }}>
				<div className="row">
					{city &&
						tweetData.data[city] &&
						tweetData.data[city].tweets &&
						tweetData.data[city].tweets.map((val, key) => {
							console.log("key", key, val);
							return (
								<div className="col-6 pt-4" key={key}>
									<Card>
										<CardContent>
											<span style={{ display: "flex", overflow: "auto" }}>
												<h6 className="mr-2">By:</h6>{" "}
												<Typography>{_.get(val, "name")}</Typography>
											</span>
											<span style={{ display: "flex", overflow: "auto" }}>
												<h6 className="mr-2">Tweet:</h6>{" "}
												<Typography>{_.get(val, "tweet")}</Typography>
											</span>
											<span style={{ display: "flex", overflow: "auto" }}>
												<h6 className="mr-2">Followers:</h6>{" "}
												<Typography>{_.get(val, "followers")}</Typography>
											</span>
											<span style={{ display: "flex", overflow: "auto" }}>
												<h6 className="mr-2">Location:</h6>{" "}
												<Typography>{_.get(val, "location")}</Typography>
											</span>
											<span style={{ display: "flex", overflow: "auto" }}>
												<h6 className="mr-2">Time:</h6>{" "}
												<Typography>{_.get(val, "time")}</Typography>
											</span>
										</CardContent>
									</Card>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
