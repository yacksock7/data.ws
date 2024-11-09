import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardMyWorkStatisticsControlStyle";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from "../../../common/images/ArrowDownIcon.svg";
import DatePickerComponent from "../DatePickerComponent";
import DateToggleComponent from "../DateToggleComponent";

class DashboardMyWorkStatisticsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            select2: 0,
        }
    }

    handleChange = event => {
        this.setState({select: event.target.value });
    };

    handleChange2 = event => {
        this.setState({select2: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.topBox} >
                    <Typography className={classes.textStyle}>My 작업 통계</Typography>

                    <DateToggleComponent/>
                </Box>

                <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
                    <Box display='flex' alignItems='center'>
                        <FormControl variant="outlined" className={classes.formControl }>
                            <Select
                                id="filter"
                                value={this.state.select}
                                onChange={this.handleChange}
                                IconComponent={(props) => (
                                    <ArrowDownIcon  {...props} />
                                )}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    className: classes.selectPopover,
                                }}
                            >
                                <MenuItem value={0}>전체 작업</MenuItem>
                                <MenuItem value={1}>작업1</MenuItem>
                                <MenuItem value={2}>작업2</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl }>
                            <Select
                                id="filter"
                                value={this.state.select2}
                                onChange={this.handleChange2}
                                IconComponent={(props) => (
                                    <ArrowDownIcon  {...props} />
                                )}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    className: classes.selectPopover,
                                }}
                            >
                                <MenuItem value={0}>전체 단계</MenuItem>
                                <MenuItem value={1}>단계1</MenuItem>
                                <MenuItem value={2}>단계2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <DatePickerComponent/>
                </Box>
            </div>
        );
    }
};

export default withStyles(styles)(DashboardMyWorkStatisticsControl);