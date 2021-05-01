import React, { useState } from "react";
import moment from "moment";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
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

	const handleChange = (e) => {
		setCity(e.target.value);
	};

	console.log("City", city, dummyData[city]);

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
					<MenuItem value="bangalore">Bangalore</MenuItem>
					<MenuItem value="indore">Indore</MenuItem>
					<MenuItem value="delhi">Delhi</MenuItem>
				</Select>
			</FormControl>

			<div className="container-fluid" style={{ paddingTop: "20px" }}>
				<div className="row">
					{city &&
						dummyData[city].map((val, key) => {
							console.log("key", key, val);
							return (
								<div className="col-6 pt-4" key={key}>
									<Card>
										<CardContent>
											<Typography>{val.tweet}</Typography>
											<Typography>{val.timestamp}</Typography>
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
