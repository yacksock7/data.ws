import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DownloadControlStyle";
import {Box, Typography, Button} from "@mui/material";
import { ReactComponent as DueDateIcon } from '../../../common/images/DueDateIcon.svg';
import PeriodPopover from "../calendar/PeriodPopover";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";

class DownloadControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodAnchorEl: null,
        }
    }
    componentDidMount() {
        this.props.deadlineStore.getDeadline(this.props.workStore.selectedWorkTemplateStep);
    }

    handleClickPeriod = event => {
        this.setState({
            periodAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            periodAnchorEl: null,
        });
    };

    render() {
        const { classes } = this.props;
        const { periodAnchorEl } = this.state;
        const periodOpen = Boolean(periodAnchorEl);
        const {deadline} = this.props.deadlineStore;
        //getDeadline
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className={classes.root}>
                <Box className={classes.leftBox}>
                    <Box className={classes.displayFlex}>
                        <Typography className={classes.buttonTextStyle}>다운로드 가능일 :</Typography>
                        <Button className={classes.dateButton} onClick={this.handleClickPeriod} disableRipple>
                            { isNaN(dayjs(deadline.deadlineDatetime).year()) === false && dayjs(deadline.deadlineDatetime).year() !== 9999 ?
                                <span>{dayjs(deadline.deadlineDatetime).format("~YYYY-MM-DD")} ({dayOfWeek[dayjs(deadline.deadlineDatetime).day()]})</span>
                                : <>
                                    <DueDateIcon/>
                                    <span>기한 지정</span>
                                </>}
                        </Button>

                        <PeriodPopover open={periodOpen} anchorEl={periodAnchorEl} onClose={this.handleClosePopover} stepName={'추출'}/>
                    </Box>

                    <Box className={classes.displayFlex}>
                        <Typography className={classes.textStyle}>
                            진행 중 / 진행 완료
                            <span className={classes.numberText}> <span>5</span> / 0</span>
                        </Typography>
                    </Box>
                </Box>

                <Button className={classes.buttonStyle} disableRipple>다운로드</Button>
            </div>
        );
    }
};
export default withStyles(styles) (
    inject('jobStepStore','workStore','deadlineStore') (
        observer(DownloadControlComponent)
    )
);