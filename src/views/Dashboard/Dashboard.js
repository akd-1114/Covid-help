import React, { useState, useEffect } from "react";
// import moment from "moment";
import _ from "lodash";
import axios from "axios";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
// import tweetData from "../../dummy/data.json";
// @material-ui/icons
// import Icon from "@material-ui/core/Icon";

import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
	Avatar,
} from "@material-ui/core";
// core components

// import { bugs, website, server } from "variables/general.js";

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
	const [city, setCity] = useState("");
	const [cityArray, setCityArray] = useState([]);
	const [dataSource, setDataSource] = useState({});

	const handleChange = (e) => {
		setCity(e.target.value);
	};

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

	// console.log("City", city, dummyData[city], tweetData.data);

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
							return (
								<MenuItem value={name} key={name}>
									{name}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>

			<div className="container-fluid" style={{ paddingTop: "20px" }}>
				<div className="row">
					{city &&
						dataSource &&
						dataSource[city] &&
						_.get(dataSource[city], "tweets").map((val, key) => {
							console.log("key", key, val);
							return (
								<div className="col-6 pt-4" key={key}>
									<Card className={classes.root}>
										<CardHeader
											avatar={
												<Avatar aria-label="tweet" className={classes.avatar}>
													T
												</Avatar>
											}
											title={_.get(val, "name")}
											subheader={_.get(val, "time")}
										/>

										<CardContent>
											<Typography
												variant="body2"
												color="textSecondary"
												component="p"
											>
												{_.get(val, "tweet")}
											</Typography>
											<span style={{ display: "flex" }} className="pt-4">
												<Typography variant="subtitle2" className="mr-2">
													You can also go to:
												</Typography>{" "}
												<a
													href={_.get(val, "Urls")}
													target="_blank"
													className={classes.block}
												>
													link
												</a>
											</span>

											<span
												style={{
													display: "flex",
													justifyContent: "space-between",
												}}
												className="p-4"
											>
												<Typography>
													{_.get(val, "retweets")} retweets
												</Typography>{" "}
												<Typography>
													{_.get(val, "followers")} followers
												</Typography>
											</span>
										</CardContent>
										{/* <CardActions disableSpacing>
											<IconButton aria-label="add to favorites">
												<FavoriteIcon />
											</IconButton>
											<IconButton aria-label="share">
												<ShareIcon />
											</IconButton>
										</CardActions> */}
									</Card>
									{/* <Card>
										<CardContent>
											<span style={{ display: "flex", overflow: "auto" }}>
												<Typography variant="subtitle2" className="mr-2">
													Tweet:
												</Typography>{" "}
												<Typography variant="body2">
													{_.get(val, "tweet")}
												</Typography>
											</span>

											<span style={{ display: "flex", overflow: "auto" }}>
												<Typography variant="subtitle2" className="mr-2">
													Time:
												</Typography>{" "}
												<Typography variant="body2">
													{_.get(val, "time")}
												</Typography>
											</span>
										</CardContent>
									</Card> */}
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
