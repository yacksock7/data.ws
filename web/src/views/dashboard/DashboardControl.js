import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardControlStyle";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import clsx from "clsx";
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import DatePickerComponent from "./DatePickerComponent";
import DateToggleComponent from "./DateToggleComponent";

class DashboardControl extends Component {
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
        const { classes, tabIndex, handleChangeTab} = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.topBox} >
                    <Tabs value={tabIndex}
                          onChange={handleChangeTab}
                          className={classes.trigger}>
                        <Tab value={0} label={'단계별 작업량'} disableRipple/>
                        <Tab value={1} label={'작업자별 통계'} disableRipple/>
                    </Tabs>

                    <Box>
                        <DateToggleComponent/>
                        {tabIndex === 0 &&
                            <Box display='flex' justifyContent='flex-end'>
                                <Typography className={classes.dateText}>2023. 01. 02 (화) ~ 2023. 05. 08 (월)</Typography>
                            </Box>
                        }

                    </Box>
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
                                <MenuItem value={0}>작업1</MenuItem>
                                <MenuItem value={1}>작업2</MenuItem>
                                <MenuItem value={2}>작업3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {tabIndex === 0 &&
                        <Box display='flex' alignItems='center'>
                            <Typography className={classes.textStyle}>진척 상태</Typography>
                            <Box display='flex' alignItems='center' className={classes.chipBox}>
                                <Typography>완료</Typography>
                            </Box>
                            <Box display='flex' alignItems='center' className={clsx(classes.chipBox, classes.chipBoxIncomplete)}>
                                <Typography>미완료</Typography>
                            </Box>
                            <Box display='flex' alignItems='center' className={clsx(classes.chipBox, classes.chipBoxCreated)}>
                                <Typography>진행전</Typography>
                            </Box>
                            <Box display='flex' alignItems='center' className={clsx(classes.chipBox, classes.chipBoxRejected)}>
                                <Typography>반려</Typography>
                            </Box>
                        </Box>
                    }

                    {tabIndex === 1 &&
                        <DatePickerComponent/>
                    }
                </Box>
            </div>
        );
    }
};

export default withStyles(styles)(DashboardControl);