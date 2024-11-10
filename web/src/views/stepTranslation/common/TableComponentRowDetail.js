import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    TableCell,
    TableRow,
    IconButton,
    Typography,
    Button,
    Stack,
    Avatar,
    TextField, FormControl, Select, MenuItem, Checkbox
} from "@mui/material";
import { ReactComponent as ArrangeUser } from '../../../common/images/ArrangeUser.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import {inject, observer} from "mobx-react";
import PreviewWorkComponent from "./PreviewWorkComponent";
import {TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";
import WorkSheet from "./WorkSheet/WorkSheet";
import {StatusTypeColor} from "../../../stores/JobStepTaskStore";
import {ReactComponent as RemoveFile} from "../../../common/images/RemoveFile.svg";
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as RejectTooltipIcon} from "../../../common/images/RejectTooltipIcon.svg";
import {ReactComponent as TooltipCloseIconBlack} from "../../../common/images/TooltipCloseIconBlack.svg";
import { ReactComponent as UnCheckedBox } from '../../../common/images/UnCheckedBox.svg';
import { ReactComponent as CheckedBox } from '../../../common/images/CheckedBox.svg';
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";
import dayjs from "dayjs";
import clsx from "clsx";
import {ReactComponent as TimeHistoryIcon} from "../../../common/images/TimeHistoryIcon.svg";
import PreWorkResultSheet from "./WorkSheet/PreWorkResultSheet";
import ResultComponent from "./ResultComponent";
import CommonDialog from "../../dialog/CommonDialog";
import WorkersAssignment from "../../../components/WorkersAssignment";


// import clsx from "clsx";
class TableComponentRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            historyAnchorEl: null,
            selected: 'false',
            open: false,
            detailOpen: false,
            openRows: {},
            openTable : false,
            allChecked: false,
            checked: [true, false],

            workerDialogOpen: false,
        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleOpenRejectDialog = () => {
        if(this.props.jobStepTaskTransfer.status === JobTaskStatus.Rejected)
            return;
        const { jobId, jobStepNum, jobStepTaskNum, userId } = this.props.jobStepTaskTransfer;
        const { rejectTarget } = this.props.jobRejectStore;
        const { selectedWork } = this.props.workStore;

        if (rejectTarget
            && rejectTarget.jobId === jobId
            && rejectTarget.jobStepNum === jobStepNum
            && rejectTarget.jobStepTaskNum === jobStepTaskNum) {
            this.props.jobRejectStore.initRejectTarget();
        } else {
            this.props.jobRejectStore.setRejectTarget(jobId, jobStepNum, jobStepTaskNum, userId);
            this.props.jobRejectStore.getRejectPoint(selectedWork.work.workTemplateId);
        }

    };

    handleChangeRejectTargetStepNum = (e) => {
        const workTemplateStepNum = e.target.value;
        this.props.jobRejectStore.changeRejectTargetStepNum(workTemplateStepNum);
    }

    handleChangeRejectTargetRejectComment = (e) => {
        const rejectComment = e.target.value;
        this.props.jobRejectStore.changeRejectTargetRejectComment(rejectComment);
    }

    saveJobReject = async () => {
        const { rejectTarget } = this.props.jobRejectStore;
        const {jobId, jobStepNum} = this.props.jobStepTaskTransfer;
        const {loginUser} = this.props.authStore;
        // if(this.props.jobStepTaskTransfer.workers && (this.props.jobStepTaskTransfer.workers[0].userId !== loginUser.id)){
        //     alert('할당된 사용자가 아닙니다.');
        //     return;
        // }
        if (rejectTarget.jobId === 0 || rejectTarget.targetStepNum === 0 || rejectTarget.rejectComment === "") {
            return;
        } else {
            await this.props.jobRejectStore.saveJobReject(loginUser.id);
            this.props.jobRejectStore.initRejectTarget();
            this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        }
    }


    handleClickDetailOpen = async () => {
        const { selectedWorkTemplateStep } = this.props.workStore;
        const { jobStepTaskTransfer } = this.props;
        const detailOpen = !this.state.detailOpen;
        //this.setState({ detailOpen: detailOpen });
        this.handleToggleDetailOpen();
        if(this.props.jobStepTaskResultStore.selectedJobStepTaskIndex === this.props.listIndex){
            this.props.jobStepTaskResultStore.changePreJobResult([]);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTask(null);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTaskIndex(null);
            this.props.onClickEvent(false);
            return;
        }
        else if (detailOpen
            && selectedWorkTemplateStep.type !== TemplateStepType.Upload
            && jobStepTaskTransfer.status !== JobTaskStatus.Created) {
            await this.props.jobStepTaskResultStore.getJobResults(jobStepTaskTransfer.jobId, jobStepTaskTransfer.jobStepNum, jobStepTaskTransfer.jobStepTaskNum);
            await this.props.jobStepTaskResultStore.getPreJobResults(jobStepTaskTransfer.jobId, jobStepTaskTransfer.jobStepNum, jobStepTaskTransfer.jobStepTaskNum);

            this.props.jobStepTaskResultStore.setNewJobStepTaskText(jobStepTaskTransfer);
            if (selectedWorkTemplateStep.type === TemplateStepType.Editing || selectedWorkTemplateStep.type === TemplateStepType.Refine) {
                this.setCorrection();
            }
            this.props.jobStepTaskResultStore.changeSelectedJobStepTaskIndex(this.props.listIndex);
        } else {
            this.props.jobStepTaskResultStore.changePreJobResult([]);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTask(null);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTaskIndex(null);
        }
        this.props.onClickEvent(detailOpen);
    };
    handleToggleDetailOpen = () =>{
        this.setState(prevState => ({
            detailOpen: !prevState.detailOpen
        }));
    }
    setCorrection = () => {
        const {jobStepTaskTransfer} = this.props;
        const {preJobResults} = this.props.jobStepTaskResultStore;

        const jobStepTaskResults =
            jobStepTaskTransfer.jobStepTaskResults
            && jobStepTaskTransfer.jobStepTaskResults.length > 0
                ? jobStepTaskTransfer.jobStepTaskResults : null;

        const preJobStepTaskResult =
            jobStepTaskTransfer.preJobStepTaskResult
                ? jobStepTaskTransfer.preJobStepTaskResult : null;

        const jobStepTaskText = jobStepTaskResults ? jobStepTaskResults[0].jobStepTaskText.text : preJobStepTaskResult.jobStepTaskText.text

        this.props.jobStepTaskResultStore.changeNewJobStepTaskText(jobStepTaskText);
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    setOpenTable = () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        const {loginUser} = this.props.authStore;
        this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        // this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
    }

    handleOpenStatusTooltip = () => {
        const { jobStepTaskTransfer } = this.props;
        this.props.handleOpenStatusTooltip(jobStepTaskTransfer);
    }

    handleClickCheckBox = (checked) => {
        if(checked){
            this.props.jobStepTaskResultStore.delCheckedJobList(this.props.jobStepTaskTransfer.jobId);
            this.props.jobStepTaskResultStore.delCheckedJobStepTaskList(this.props.jobStepTaskTransfer.jobStepTaskNum);
        }
        else{
            this.props.jobStepTaskResultStore.addCheckedJobStepTaskList(this.props.jobStepTaskTransfer.jobStepTaskNum);
        }
    }

    handleOpenDialog = () => {
        console.log("tset")

        const { workerDialogOpen } = this.state;
        this.setState({ workerDialogOpen: !workerDialogOpen });
    };

    // saveJobStepTaskWorkers = async () => {
    //     this.handleOpenDialog();
    // };

    removeSelectedWorkers = (userId) => {
        this.props.jobStepTaskWorkerStore.removeSelectedWorkers(userId);
    }

    render() {
        const { classes, jobStepTaskTransfer, statusByJobStepTask, handleOpenStatusTooltip} = this.props;
        const {selectedWork, selectedWorkTemplateStep} = this.props.workStore;
        const { rejectPoints, rejectTarget } = this.props.jobRejectStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);

        const workers = jobStepTaskTransfer.workers;

        const rejectOpen = rejectTarget
            && rejectTarget.jobId === jobStepTaskTransfer.jobId
            && rejectTarget.jobStepNum === jobStepTaskTransfer.jobStepNum
            && rejectTarget.jobStepTaskNum === jobStepTaskTransfer.jobStepTaskNum

        const statusOpen = statusByJobStepTask
            && statusByJobStepTask.jobId === jobStepTaskTransfer.jobId
            && statusByJobStepTask.jobStepNum === jobStepTaskTransfer.jobStepNum
            && statusByJobStepTask.jobStepTaskNum === jobStepTaskTransfer.jobStepTaskNum

        const checked = this.props.jobStepTaskResultStore.checkedJobStepTaskList.indexOf(jobStepTaskTransfer.jobStepTaskNum) !== -1;
        return (
            <React.Fragment>
                <TableRow style={jobStepTaskTransfer.status === JobTaskStatus.Rejected ? {cursor:'pointer', background: 'rgba(50, 50, 50, 0.5)'} : {cursor:'pointer',  background: 'rgba(221, 236, 255, 0.5)'}}>
                    <TableCell align='center' style={{width: 60,boxSizing: 'border-box', padding: '2px 0px'}}>
                        {selectedWorkTemplateStep.type === TemplateStepType.Export ? (
                            <Checkbox
                                onClick={e => this.handleClickCheckBox(checked)}
                                checked={checked}
                                icon={<UnCheckedBox />}
                                checkedIcon={<CheckedBox />}
                                disableRipple/>) : null }
                        #{jobStepTaskTransfer.jobStepTaskNum}
                    </TableCell>
                    <TableCell align='center' style={{width: 67, boxSizing: 'border-box', padding: '2.5px 5px'}}>
                        {options.sourceLang}
                    </TableCell>
                    <TableCell style={{width: this.props.headerWidth,boxSizing: 'border-box',padding: '2.5px 5px'}}>
                        <Box  display='flex' justifyContent='space-between' alignItems='center'>
                            <ResultComponent classes={classes}
                                             jobStepTaskTransfer={jobStepTaskTransfer}
                                             handleClickDetailOpen={this.handleClickDetailOpen}/>

                            {/* TODO 이전 작업 보기. 업로드는 숨기기 with selectedWorkTemplateStep*/}
                            {selectedWorkTemplateStep.type !== TemplateStepType.Upload &&
                                <Box display='flex'
                                     alignItems='center'>
                                    <PreviewWorkComponent/>

                                    <Box className={classes.lineStyle}/>
                                    <Box className={classes.stateBox} style={{overflow:'hidden',background : StatusTypeColor[jobStepTaskTransfer.status]}}>

                                        <Button
                                                id={1}
                                                onClick={this.handleOpenStatusTooltip}
                                                disableRipple/>
                                        {/*툴팁 전체*/}
                                        {statusOpen &&
                                            <Box className={classes.tooltipBox}>
                                                <Box className={classes.tooltipArrow}>
                                                    <TooltipArrow/>
                                                </Box>
                                                {/*툴팁 내용*/}
                                                <Box className={classes.tooltipBoxIn}>
                                                    <Box className={classes.tooltipTitleBox}
                                                         display='flex'
                                                         justifyContent='space-between'
                                                         alignItems='center'>
                                                        <Typography display='flex'
                                                                    justifyContent='space-between'
                                                                    alignItems='center'>
                                                            <TimeHistoryIcon style={{marginRight: 5}}/> 진행 상태
                                                        </Typography>
                                                        <IconButton className={classes.iconButton}
                                                                    style={{background: '#fff', marginRight: 0}}
                                                                    onClick={handleOpenStatusTooltip}
                                                                    disableRipple>
                                                            <TooltipCloseIconBlack/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box className={clsx(classes.completed, classes.uncompleted)}
                                                         style={{background: StatusTypeColor[jobStepTaskTransfer.status]}}>
                                                        <Typography>
                                                            {JobTaskStatusLabel[jobStepTaskTransfer.status]}
                                                        </Typography>
                                                    </Box>
                                                    <Box display='flex'
                                                         alignItems='end'
                                                         justifyContent='space-between'
                                                         style={{marginTop: 20}}>
                                                        <Box>
                                                            <Typography style={{color: '#777', fontSize: '12px'}}>
                                                                {dayjs(jobStepTaskTransfer.updatedDatetime).format("YYYY-MM-DD hh:mm")}
                                                            </Typography>
                                                        </Box>
                                                        <Box>
                                                            <Button style={{background: '#323232', width: 68, height: 32, borderRadius: 3, marginRight: 0}}
                                                                    onClick={handleOpenStatusTooltip}
                                                                    disableRipple>
                                                                <Typography style={{color: '#fff'}}> 확인</Typography>
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }
                                    </Box>






                                    {workers && workers.length > 0 ? (
                                        <>
                                            <Stack className={classes.avatarBox}
                                                   onClick={this.handleOpenDialog}>

                                                {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                                {/*{historyRow.AdminAvatar ? <img src={historyRow.AdminAvatar} /> : <TableUserAvatar />}*/}
                                                <Avatar>
                                                    <TableUserAvatar />
                                                </Avatar>
                                            </Stack>
                                            <Box className={classes.rejectFile} style={{position: 'relative'}}>
                                                {selectedWorkTemplateStep.type === TemplateStepType.Inspection &&
                                                    <Button id={'2'}
                                                            onClick={this.handleOpenRejectDialog}
                                                            disableRipple>
                                                        <RemoveFile id={'2'}/>
                                                    </Button>
                                                }



                                                {/*툴팁 전체 반려함*/}
                                                {rejectOpen && jobStepTaskTransfer.status === JobTaskStatus.RejectWaiting &&
                                                    <Box className={classes.tooltipBox}>
                                                        <Box className={classes.tooltipArrow}>
                                                            <TooltipArrow/>
                                                        </Box>
                                                        {/*툴팁 내용*/}
                                                        <Box className={classes.tooltipBoxIn}>
                                                            <Box className={classes.tooltipTitleBox} display='flex'
                                                                 justifyContent='space-between' alignItems='center'>
                                                                <Typography display='flex'
                                                                            justifyContent='space-between'
                                                                            alignItems='center'>
                                                                    <RejectTooltipIcon style={{marginRight: 5}}/> 반려함
                                                                </Typography>
                                                                <IconButton className={classes.iconButton}
                                                                            style={{background: '#fff', marginRight: 0,}}
                                                                            onClick={this.handleOpenRejectDialog}
                                                                            disableRipple>
                                                                    <TooltipCloseIconBlack/>
                                                                </IconButton>
                                                            </Box>
                                                            <Typography style={{color: '#323232', letterSpacing: '-0.4px', fontSize: '14px'}}>
                                                                {jobStepTaskTransfer.rejectComment}
                                                            </Typography>
                                                            <Box display='flex'
                                                                 justifyContent='space-between'
                                                                 alignItems='end' style={{marginTop: 20}}>
                                                                <Box>
                                                                    <Typography style={{color: '#777', fontSize: '12px'}}>
                                                                        {dayjs(jobStepTaskTransfer.updatedDatetime).format("YYYY-MM-DD hh:mm")}

                                                                    </Typography>
                                                                </Box>
                                                                <Box>
                                                                    <Button style={{background: '#323232', width: 68, height: 32, borderRadius: 3, marginRight: 0,}}
                                                                            onClick={this.handleOpenRejectDialog}
                                                                            disableRipple>
                                                                        <Typography style={{color: '#fff'}}>
                                                                            확인
                                                                        </Typography>
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }

                                                {rejectOpen && jobStepTaskTransfer.status !== JobTaskStatus.RejectWaiting &&
                                                    <Box className={classes.tooltipBox}>
                                                        <Box className={classes.tooltipArrow}>
                                                            <TooltipArrow/>
                                                        </Box>
                                                        {/*툴팁 내용 반료사유*/}
                                                        <Box className={classes.tooltipBoxIn}>
                                                            <Box className={classes.tooltipTitleBox} display='flex'
                                                                 justifyContent='space-between' alignItems='center'>
                                                                <Typography display='flex' justifyContent='space-between'
                                                                            alignItems='center'>
                                                                    <RejectTooltipIcon style={{marginRight: 5}}/> 반려사유
                                                                </Typography>
                                                                <IconButton className={classes.iconButton}
                                                                            style={{background: '#fff', marginRight: 0,}}
                                                                            onClick={this.handleOpenRejectDialog}
                                                                            disableRipple>
                                                                    <TooltipCloseIconBlack/>
                                                                </IconButton>
                                                            </Box>
                                                            <TextField
                                                                style={{width: '100%'}}
                                                                multiline
                                                                rows={1}
                                                                value={rejectTarget.rejectComment}
                                                                onChange={this.handleChangeRejectTargetRejectComment}
                                                                placeholder={'반려사유를 입력해주세요.(최대 200자)'}/>

                                                            <Box style={{marginTop: 14,}}>
                                                                <FormControl variant="outlined"
                                                                             className={classes.formControlLanguage}>
                                                                    <Select
                                                                        style={{width: '100%'}}
                                                                        displayEmpty
                                                                        inputProps={{'aria-label': 'Without label'}}
                                                                        value={rejectTarget.targetStepNum}
                                                                        onChange={this.handleChangeRejectTargetStepNum}
                                                                    >

                                                                        {rejectPoints && rejectPoints.map(rejectPoint => (
                                                                            <MenuItem key={`MenuItem-${rejectPoint.workTemplateId}-${rejectPoint.workTemplateStepNum}`} value={rejectPoint.workTemplateStepNum}>
                                                                                {rejectPoint.name}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>

                                                            <Box display='flex' justifyContent='right' alignItems='center'
                                                                 style={{marginTop: 20}}>
                                                                <Box>
                                                                    <Button onClick={this.handleOpenRejectDialog}
                                                                            style={{color: '#323232', fontWeight: 700}} disableRipple>취소</Button>
                                                                    <Button onClick={this.saveJobReject}
                                                                            style={{background: '#d91e50', width: 68, height: 32, borderRadius: 3, marginRight: 0}}
                                                                            disableRipple>
                                                                        <Typography style={{color: '#fff'}}>반려</Typography>
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }
                                            </Box>

                                        </>
                                    ) : (
                                        <>
                                            <Box className={classes.ArrangeUserBtn}>
                                                {/*TODO*/}
                                                {/*<Button disableRipple>*/}
                                                {/*    <ArrangeUser/>*/}
                                                {/*    <Typography>배정</Typography>*/}
                                                {/*</Button>*/}
                                            </Box>
                                        </>
                                    )}
                                </Box>
                            }
                        </Box>
                    </TableCell>
                </TableRow>

                {/*작업자 배정 dialog*/}
                <CommonDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleOpenDialog}
                    title={<span><b>{TemplateStepTypeLabel[selectedWorkTemplateStep.type]}</b> 단계 작업자</span>}
                    onClick={this.handleOpenDialog}
                    children={
                    <WorkersAssignment selectedWorkers={workers}
                                       removeSelectedWorkers={this.removeSelectedWorkers}
                                       isShowSelectedBar={false}/>
                    }
                />

            </React.Fragment>
        );
    }
}

export default withStyles(styles)(
    inject('jobStepTaskWorkerStore', 'jobRejectStore', 'jobStepTaskStore', 'jobStepTaskResultStore', 'jobStepStore', 'workStore', 'authStore')(
        observer(TableComponentRow)
    )
);

