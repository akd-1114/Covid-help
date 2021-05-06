import React, { useState, useEffect } from "react";
// import moment from "moment";
import _ from "lodash";
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import {
	TextField,
	CircularProgress,
	Button,
	FormControl,
} from "@material-ui/core";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import TweetsSelectCards from "../TweetsSelectCards";

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
	form: {
		width: "100%",
	},
	textField: {
		margin: "10px auto 10px auto",
	},
	button: {
		marginTop: 10,
		float: "right",
		position: "relative",
	},
	progress: {
		position: "absolute",
	},
});

export default function FindTweet() {
	const classes = useStyles();
	// const [city, setCity] = useState("");
	const [cityArray, setCityArray] = useState([]);
	const [dataSource, setDataSource] = useState({});
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const [showSelect, setShowSelect] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);
		console.log("Event", formData);
		if (_.get(formData, "search-tweet")) {
			setShowSelect(false);
			setShowSelect(true);
		}
		setLoading(false);
	};

	useEffect(() => {
		axios
			.get("https://devcovidhelperbackend.dev.cglcloud.in/search",
				{
					params: {
						text: _.get(formData, "search-tweet")
					}
				})
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
	}, [showSelect]);

	const handleChange = (event) => {
		setFormData({
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<form noValidate onSubmit={handleSubmit} className={classes.form}>
					<div className="col-6">
						<TextField
							id="search-tweet"
							name="search-tweet"
							type="text"
							label="Tweets Search..."
							className={classes.textField}
							onChange={handleChange}
							fullWidth
						/>
					</div>
					<div className="col-6">
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.button}
							disabled={loading}
						>
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
							Submit
						</Button>
					</div>
				</form>

				<div className="col-12 pt-4">
					{showSelect && (
						<TweetsSelectCards
							dataSource={dataSource}
							cityArray={cityArray}
							classes={classes}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
