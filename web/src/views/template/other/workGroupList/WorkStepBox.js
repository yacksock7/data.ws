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
import {ReactComponent as GroupUsersStep} from "../../../../common/images/GroupUsersStep.svg";
import {ReactComponent as OneUsersStep} from "../../../../common/images/OneUsersStep.svg";
import {ReactComponent as TemMechanical} from "../../../../common/images/TemMechanical.svg";
import {ReactComponent as TemTag} from "../../../../common/images/TemTag.svg";
import {ReactComponent as TemCorrection} from "../../../../common/images/TemCorrection.svg";
import {ReactComponent as TemSwap} from "../../../../common/images/TemSwap.svg";
import {ReactComponent as TemInspection} from "../../../../common/images/TemInspection.svg";
import {ReactComponent as TemDownload} from "../../../../common/images/TemDownload.svg";
// import DatePickerComponent from "./DatePickerComponent";
// import DateToggleComponent from "./DateToggleComponent";

class WorkStepBox extends Component {
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
                <Box className={classes.stepBoxOuter}>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <GroupUsersStep/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>작업그룹</Typography>
                            <Typography className={classes.stepNum}>11</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <OneUsersStep/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>작업자</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                </Box>


            </div>
        );
    }
};

export default withStyles(styles)(WorkStepBox);