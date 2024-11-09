import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardStyle";
import DashboardControl from "./DashboardControl";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerCloseWidth, totalDrawerOpenWidth} from "../../App";
import {inject, observer} from "mobx-react";
import DashboardStepper from "./DashboardStepper";
import DashboardChart from "./DashboardChart";
import DashboardTable from "./DashboardTable";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            stepper: [1, 2, 3, 4, 5],
            stepper2: [1, 2, 3, 4, 5, 6, 7, 8],
        }
    }

    handleChangeTab = (event, tabIndex) => {
        this.setState({tabIndex});
    };

    handleClickStepper = (event, stepper) => this.setState({ stepper });
    handleClickStepper2 = (event, stepper2) => this.setState({ stepper2 });

    render() {
        const { classes} = this.props;
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
                <DashboardControl handleChangeTab={this.handleChangeTab} tabIndex={this.state.tabIndex} />
                <DashboardStepper
                    stepper={this.state.stepper}
                    stepper2={this.state.stepper2}
                    handleClickStepper={this.handleClickStepper}
                    handleClickStepper2={this.handleClickStepper2}
                    tabIndex={this.state.tabIndex}
                />
                {this.state.tabIndex === 0 &&
                    <DashboardChart/>
                }

                {this.state.tabIndex === 1 &&
                    <DashboardTable />
                }

            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(Dashboard)
    )
);