import React, { useState, useEffect } from "react";
// import moment from "moment";
import _ from "lodash";

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
import { NavigateBeforeSharp } from "@material-ui/icons";
// core components

export default function TweetsSelectCards({ dataSource, cityArray, classes }) {
    const [city, setCity] = useState("");
    const [isURL, setURLState] = useState("")

    const handleChange = (e) => {
        setCity(e.target.value);
    };

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
                            // console.log("key", key, val);
                            var urlsText = _.get(val, "Urls");
                            var hasURl = urlsText!=null && _.get(val, "Urls").length >0;

                            var urls = null;
                            if(hasURl) {
                                _.get(val, "Urls").split(",");
                            }

                            var isTweet = _.get(val, "tweet_type") == "twitter" ? true : false;

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
                                            {hasURl && <span style={{ display: "flex" }} className="pt-4" >
                                                <Typography variant="subtitle2" className="mr-2">
                                                    You can also go to:
                                                </Typography>{" "}

                                                {

                                                urls && urls.length > 0 &&
                                                urls.map(url =>
                                                        <div><a href={url} target ="_blank" className={classes.block}>link</a> , </div>)
                                                }

                                            </span> }
                                            { isTweet && <span
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
                                            </span>}


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

