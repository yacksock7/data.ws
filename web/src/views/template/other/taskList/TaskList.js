import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TaskListStyle";
import {
    Box,
    FormControl, IconButton,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Button,
    Typography
} from "@mui/material";
import clsx from "clsx";
// import WorkStepBox from "./WorkStepBox";
// import TabBox from "./TabBox";
// import UserInfo from "./UserInfo";
// import WorkTable from "./WorkTable";

import {ReactComponent as ArrowDownIcon} from "../../../../common/images/ArrowDownIcon.svg";
import {ReactComponent as CalendarArrowIcon} from "../../../../common/images/CalendarArrowIcon.svg";
import {Link} from "react-router-dom";
import WorkStepBox from "../workGroupList/WorkStepBox";
import TabBox from "../workGroupList/TabBox";
import TaskTable from "./TaskTable";

class TaskList extends Component {
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
                <TaskTable/>
            </div>
        );
    }
};

export default withStyles(styles)(TaskList);