import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardDetailControlStyle";
import {
    Box,
    FormControl, IconButton,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from "../../../common/images/ArrowDownIcon.svg";
import {ReactComponent as CalendarArrowIcon} from "../../../common/images/CalendarArrowIcon.svg";
import DatePickerComponent from "../DatePickerComponent";
import DateToggleComponent from "../DateToggleComponent";
import clsx from "clsx";
import {Link} from "react-router-dom";

class DashboardDetailControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
        }
    }

    handleChange = event => {
        this.setState({select: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.topBox} >
                    <Box display='flex' alignItems='center'>
                        <Link to="/dashboard" className={classes.underline}>
                            <IconButton className={clsx(classes.iconButton, classes.iconSize)} disableRipple>
                                <CalendarArrowIcon/>
                            </IconButton>
                        </Link>
                        <Typography className={classes.textStyle}>대시보드</Typography>
                        <Box className={classes.lineStyle}/>
                        <Typography className={classes.textStyle}>작업자별 통계 목록</Typography>
                        <Typography className={classes.nameText}>이작업</Typography>
                    </Box>

                    <DateToggleComponent/>
                </Box>

                <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
                    <Box>
                        <FormControl variant="outlined"
                                     className={classes.formControl }>
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
                                <MenuItem value={1}>작업2</MenuItem>
                                <MenuItem value={2}>작업3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <DatePickerComponent/>
                </Box>
            </div>
        );
    }
};

export default withStyles(styles)(DashboardDetailControl);