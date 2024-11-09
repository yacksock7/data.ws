import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BuildTemplateStyle";
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
import {ReactComponent as TemUpload} from "../../../common/images/TemUpload.svg";
import {ReactComponent as TemRec} from "../../../common/images/TemRec.svg";
import {ReactComponent as TemMechanical} from "../../../common/images/TemMechanical.svg";
import {ReactComponent as TemTag} from "../../../common/images/TemTag.svg";
import {ReactComponent as TemCorrection} from "../../../common/images/TemCorrection.svg";
import {ReactComponent as TemSwap} from "../../../common/images/TemSwap.svg";
import {ReactComponent as TemInspection} from "../../../common/images/TemInspection.svg";
import {ReactComponent as TemDownload} from "../../../common/images/TemDownload.svg";
// import DatePickerComponent from "./DatePickerComponent";
// import DateToggleComponent from "./DateToggleComponent";

class StepBox extends Component {
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
                            <TemUpload/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>업로드</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemRec/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>녹음</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemMechanical/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>기계</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemTag/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>라벨링</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemCorrection/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>교정</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemSwap/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>정제</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemInspection/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>검수</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                    <Box className={classes.boxInner}>
                        <Box className={classes.iconInner}>
                            <TemDownload/>
                        </Box>
                        <Box>
                            <Typography className={classes.stepText}>추출</Typography>
                            <Typography className={classes.stepNum}>178</Typography>
                        </Box>
                    </Box>
                </Box>


            </div>
        );
    }
};

export default withStyles(styles)(StepBox);