import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/UploadControlStyle";
import {Box, Typography, Button, Popover, MenuList, MenuItem} from "@mui/material";
import { ReactComponent as DueDateIcon } from '../../../common/images/DueDateIcon.svg';
import { ReactComponent as FileTextIcon } from '../../../common/images/FileTextIcon.svg';
import clsx from "clsx";
import UploadDialog from "./dialog/UploadDialog";
import PeriodPopover from "../calendar/PeriodPopover";
import CommonDialog from "../../dialog/CommonDialog";
import {inject, observer} from "mobx-react";
import WorkersAssignmentUpload from "./dialog/WorkersAssignmentUpload";
import dayjs from "dayjs";

class UploadControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationAnchorEl: null,
            periodAnchorEl: null,
            dialogOpen: false,
            workerDialogOpen: false,
        }
    }
    componentDidMount() {
        this.props.deadlineStore.getDeadline(this.props.workStore.selectedWorkTemplateStep);
    }

    handleClickRegistration = event => {
        this.setState({
            registrationAnchorEl: event.currentTarget,
        });
    };

    handleClickPeriod = event => {
        this.setState({
            periodAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            registrationAnchorEl: null,
            periodAnchorEl: null,
        });
    };

    handleClickDialog = () => {
        this.setState({
            dialogOpen: true,
            registrationAnchorEl: null,
        });
    };

    handleClickWorkerDialog = () => {
        const {selectedWork} = this.props.workStore;
        this.props.workUploadUserStore.getWorkUploadUsers(selectedWork.work.id);
        this.setState({workerDialogOpen: true});
    };

    handleCloseDialog = () => {
        this.setState({dialogOpen: false, workerDialogOpen: false});
    };


    saveWorkUploadUsers = () => {
        const { selectedWork } = this.props.workStore;
        this.props.workUploadUserStore.createWorkUploadUsers(selectedWork.work.id);
        this.handleCloseDialog();
    };

    render() {
        const { classes } = this.props;
        const { registrationAnchorEl, periodAnchorEl } = this.state;
        const { createdCount, completedCount} = this.props.jobStepStore;
        const { deadline } = this.props.deadlineStore;
        const { selectedWork } = this.props.workStore;
        const { loginUser } = this.props.authStore;

        const registrationOpen = Boolean(registrationAnchorEl);
        const periodOpen = Boolean(periodAnchorEl);

        //getDeadline
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        //console.log(dayjs(deadline.deadlineDatetime).year());
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




                        <PeriodPopover open={periodOpen} anchorEl={periodAnchorEl} onClose={this.handleClosePopover} stepName={'업로드'}/>
                    </Box>

                    <Box className={classes.displayFlex}>
                        <Typography className={classes.textStyle}>
                            진행 중 / 진행 완료
                            <span className={classes.numberText}> <span>{createdCount}</span> / {completedCount}</span>
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.displayFlex}>
                    {selectedWork && selectedWork.work && selectedWork.work.userId === loginUser.id &&
                        <Button className={classes.buttonStyle} onClick={this.handleClickWorkerDialog} disableRipple>작업자 배정</Button>
                    }


                    <Button className={clsx(classes.buttonStyle, classes.buttonStyle2)} onClick={this.handleClickRegistration} disableRipple>일감 등록</Button>

                    <Popover
                        id="simple-popper"
                        open={registrationOpen}
                        anchorEl={registrationAnchorEl}
                        onClose={this.handleClosePopover}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        className={classes.popoverBox}
                    >
                        <Box>
                            <MenuList>
                                <MenuItem onClick={this.handleClickDialog} disableRipple>
                                    <FileTextIcon/>
                                    <span>파일 단위로 등록</span>
                                </MenuItem>
                            </MenuList>

                            <Box className={classes.buttonBox}>
                                <Button className={classes.popoverButton} disableRipple>등록 양식 받기</Button>
                            </Box>
                        </Box>
                    </Popover>
                </Box>


                {/* 일감 등록 dialog */}
                <UploadDialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}/>

                {/* 작업자 배정 dialog */}
                <CommonDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>업로드</b> 단계 작업자 배정</span>}
                    submitText={'배정하기'}
                    onClick={this.saveWorkUploadUsers}
                    children={<WorkersAssignmentUpload/>}
                />
            </div>
        );
    }
}

export default withStyles(styles) (
    inject('authStore', 'workStore', 'workUploadUserStore', 'jobStepStore','deadlineStore') (
        observer(UploadControlComponent)
    )
);