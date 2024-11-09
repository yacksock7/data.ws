import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkGroupStyle";
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
import WorkStepBox from "./WorkStepBox";
import TabBox from "./TabBox";
import GroupList from "./GroupList";

import {ReactComponent as ArrowDownIcon} from "../../../../common/images/ArrowDownIcon.svg";

class WorkGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
        }
    }



    render() {
        const { classes, tabIndex, handleChangeTab} = this.props;

        return (
            <div>
                <WorkStepBox/>
                <TabBox/>
                <GroupList/>
            </div>
        );
    }
};

export default withStyles(styles)(WorkGroup);