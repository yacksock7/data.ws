import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/InspectionControlStyle";
import {Box, Button, Typography} from "@mui/material";
import TranslationBar from "../translationBar/TranslationBar";
import {ReactComponent as DueDateIcon} from "../../../common/images/DueDateIcon.svg";
import PeriodPopover from "../calendar/PeriodPopover";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";

class InspectionControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodAnchorEl: null,
        }
    }
    componentDidMount() {
        const { selectedWorkTemplateStep } = this.props.workStore;
        this.props.deadlineStore.getDeadline(selectedWorkTemplateStep);
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
        const { createdCount, completedCount} = this.props.jobStepStore;
        const periodOpen = Boolean(periodAnchorEl);
        const {deadline} = this.props.deadlineStore;
        //getDeadline
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        return (
            <div className={classes.root}>
                <Box className={classes.leftBox}>
                    <Box className={classes.displayFlex}>
                        <Typography className={classes.buttonTextStyle}>완료일 :</Typography>
                        <Button className={classes.dateButton} onClick={this.handleClickPeriod} disableRipple>
                            { isNaN(dayjs(deadline.deadlineDatetime).year()) === false && dayjs(deadline.deadlineDatetime).year() !== 9999 ?
                                <span>{dayjs(deadline.deadlineDatetime).format("~YYYY-MM-DD")} ({dayOfWeek[dayjs(deadline.deadlineDatetime).day()]})</span>
                                : <>
                                    <DueDateIcon/>
                                    <span>기한 지정</span>
                                </>}
                        </Button>

                        <PeriodPopover open={periodOpen} anchorEl={periodAnchorEl} onClose={this.handleClosePopover}stepName={'검수'}/>
                    </Box>

                    <Box className={classes.displayFlex}>
                        <Typography className={classes.textStyle}>
                            진행 중 / 진행 완료
                            <span className={classes.numberText}> <span>{createdCount}</span> / {completedCount}</span>
                        </Typography>
                    </Box>
                </Box>
                <TranslationBar/>
            </div>
        );
    }
};
export default withStyles(styles) (
    inject('jobStepStore','workStore', 'deadlineStore') (
        observer(InspectionControlComponent)
    )
);