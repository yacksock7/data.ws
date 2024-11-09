import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardDetailStyle";
import {inject, observer} from "mobx-react";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerCloseWidth, totalDrawerOpenWidth} from "../../../App";
import DashboardDetailControl from "./DashboardDetailControl";
import {Typography} from "@mui/material";
import DashboardDetailInfoTable from "./DashboardDetailInfoTable";
import DashboardDetailTable from "./DashboardDetailTable";

class DashboardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail:true
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

                <DashboardDetailControl/>
                <Typography className={classes.textStyle}>회원정보</Typography>
                <DashboardDetailInfoTable/>
                <Typography className={classes.textStyle}><strong>이작업</strong> 님,<br/>작업 상세내역</Typography>
                <DashboardDetailTable detail={this.state.detail}/>
            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(DashboardDetail)
    )
);