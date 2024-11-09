import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../detail/styles/DashboardDetailStyle";
import {inject, observer} from "mobx-react";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerCloseWidth, totalDrawerOpenWidth} from "../../../App";
import {Typography} from "@mui/material";
import DashboardDetailTable from "../detail/DashboardDetailTable";
import DashboardMyWorkStatisticeControl from "./DashboardMyWorkStatisticsControl";

class DashboardMyWorkStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        const { open, menuValue,  sideBar } = this.props.navigateStore;

        return (
            <div className={classes.root}
                 style={
                     open ?
                         menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                         :
                         menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}
                 }
            >

                <DashboardMyWorkStatisticeControl/>
                <Typography className={classes.textStyle}><strong>이작업</strong> 님,<br/>작업 상세내역</Typography>
                <DashboardDetailTable/>
            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(DashboardMyWorkStatistics)
    )
);