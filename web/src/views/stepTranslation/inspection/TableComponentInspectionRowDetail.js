import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    TableCell,
    TableRow,
    IconButton,
    MenuItem,
    Checkbox,
    Typography,
    Button,
    Stack,
    Avatar,
    TextField,
    FormControl,
    Select
} from "@mui/material";
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import { ReactComponent as ArrangeUser } from '../../../common/images/ArrangeUser.svg';
import { ReactComponent as UnCheckedBox } from '../../../common/images/UnCheckedBox.svg';
import { ReactComponent as CheckedBox } from '../../../common/images/CheckedBox.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import { ReactComponent as RemoveFile } from '../../../common/images/RemoveFile.svg';
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as TimeHistoryIcon} from "../../../common/images/TimeHistoryIcon.svg";
import {ReactComponent as TooltipCloseIconBlack} from "../../../common/images/TooltipCloseIconBlack.svg";
import {ReactComponent as RejectTooltipIcon} from "../../../common/images/RejectTooltipIcon.svg";
import clsx from "clsx";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import {inject, observer} from "mobx-react";
import {TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";
import CommonDialog from "../../dialog/CommonDialog";
import WorkersAssignment from "../../../components/WorkersAssignment";
{/*       const {jobId, jobStepNum} =  jobStepTransfer;
        if (state === JobTaskStatus.Assigned) {
            this.props.jobStepTaskWorkerStore.getJobStepTaskWorkers(jobId, jobStepNum);
        } else {
            this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum, true);
        }
        this.props.jobStepTaskWorkerStore.changeSelectedJobStepTransfer(jobStepTransfer);*/}
// import clsx from "clsx";
class TableComponentInspectionRowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openRows: {},
            openTable : false,
            allChecked: false,
            checked: [true, false],
            reasonTooltip : '',
            workerDialogOpen : false
        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleClick = (event) => {
        this.setState({anchorEl: event.target.id});
        const { selectedWork } = this.props.workStore;
        this.props.jobRejectStore.getWorkTemplateStepByRejectPoint(selectedWork.work.workTemplateId);
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
        this.props.jobStepTaskStore.changeRejectTargetStep();
    };


    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeReason = (e) =>
    {
        this.setState({
            reasonTooltip : e.target.value
        })
    }
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    setOpenTableRow = (preJobStepTaskText) => {
        const {jobStepTaskTransfer} = this.props;

        if (jobStepTaskTransfer.status !== JobTaskStatus.Created) {
            const text = preJobStepTaskText? preJobStepTaskText.text : '';
            this.props.jobStepTaskStore.setNewJobStepTaskText(jobStepTaskTransfer, text);
            this.props.jobStepTaskStore.changeSelectedJobStepTaskTransfer(jobStepTaskTransfer);
        }
    }

    handleChangeRejectTargetStep = (e) => {
        const workTemplateStepNum = e.target.value;
        this.props.jobStepTaskStore.changeRejectTargetStep(workTemplateStepNum);
    }

    handleOpenDlg = (jobStepTransfer) => {
        this.props.jobStepTaskWorkerStore.changeSelectedJobStepTransfer(jobStepTransfer);

        this.setState({
            workerDialogOpen : true
        });
    }

    handleCloseDialog = () =>{
        this.setState({
            workerDialogOpen : false
        });
    }

    saveJobStepTaskRowWorkers = async () => {
        await this.props.jobStepTaskWorkerStore.createJobStepTaskRowWorkers(this.props.jobStepTaskTransfer);
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
        this.handleCloseDialog();
    };

    render() {
        const { classes, jobStepTaskTransfer, index, jobStepTransfer } = this.props;
        const { selectedJobStepTaskTransfer, rejectTargetStep } = this.props.jobStepTaskStore;
        const { rejectPoints } = this.props.workTemplateStore;
        const {rowsPerPage} = this.props.jobStepStore;
        const {selectedWork, selectedWorkTemplateStep} = this.props.workStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);
        const { anchorEl} = this.state;

        // const open = Boolean(anchorEl);
        const open = false;
        const prePrePreJobStepTaskText =
            jobStepTaskTransfer.prePrePreWorkers
            && jobStepTaskTransfer.prePrePreWorkers.length > 0
            && jobStepTaskTransfer.prePrePreWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.prePrePreWorkers[0].jobStepTaskText : null;

        const prePreJobStepTaskText =
            jobStepTaskTransfer.prePreWorkers
            && jobStepTaskTransfer.prePreWorkers.length > 0
            && jobStepTaskTransfer.prePreWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.prePreWorkers[0].jobStepTaskText : null;

        const preJobStepTaskText =
            jobStepTaskTransfer.preWorkers
            && jobStepTaskTransfer.preWorkers.length > 0
            && jobStepTaskTransfer.preWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.preWorkers[0].jobStepTaskText : null;

        const jobStepTaskText =
            jobStepTaskTransfer.workers
            && jobStepTaskTransfer.workers.length > 0
            && jobStepTaskTransfer.workers[0].jobStepTaskText ?
                jobStepTaskTransfer.workers[0].jobStepTaskText : null;

        return (
            <React.Fragment>
                <TableRow key={jobStepTaskTransfer.jobStepTaskNum}>
                    <TableCell className={classes.bg50} style={{paddingLeft: '16px'}}>
                        <Box  className={classes.CheckboxStyle}>
                            <Typography>{jobStepTaskTransfer.jobStepTaskNum}</Typography>
                        </Box>
                    </TableCell>
                    <TableCell className={classes.bg50} align="center">{options.sourceLang}</TableCell>
                    <TableCell className={clsx(classes.bg50, classes.limitText)} align="left" style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    textAlign: "left",
                                }}>
                                {prePrePreJobStepTaskText && prePrePreJobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {prePrePreJobStepTaskText && prePrePreJobStepTaskText.text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                    {index === 0 && (
                        <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                            <TableSwichLang/>
                        </TableCell>
                    )}
                    <TableCell className={classes.bg100} style={{paddingLeft: '16px'}}>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                    <TableCell className={classes.bg100} align="center">{options.targetLang}</TableCell>
                    <TableCell className={clsx(classes.bg100, classes.limitText)} align="left" style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    textAlign: "left",
                                }}>
                                {prePreJobStepTaskText && prePreJobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {{prePreJobStepTaskText && prePreJobStepTaskText.text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                    {index === 0 && (
                        <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                            <TableSwichLang/>
                        </TableCell>
                    )}
                    <TableCell className={classes.bgf3e9ff} style={{paddingLeft: '16px'}}>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                    <TableCell className={classes.bgf3e9ff} align="center">{options.targetLang}</TableCell>
                    <TableCell className={clsx(classes.bgf3e9ff, classes.limitText)} align="left" style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    textAlign: "left",
                                }}>
                                {preJobStepTaskText && preJobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {preJobStepTaskText && preJobStepTaskText.text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                    {jobStepTaskTransfer.status === JobTaskStatus.Created ? (
                        <>
                            <TableCell className={classes.bgf3e9ff} align="right">
                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                    <Box className={classes.workTimeStyle}>
                                        <Button disableRipple></Button>
                                    </Box>
                                    <Box className={classes.ArrangeUserBtn} style={{marginRight: '6px'}}>
                                        <Button onClick={e=>this.handleOpenDlg(jobStepTransfer)} disableRipple>
                                            <ArrangeUser /> <Typography> 배정 </Typography>
                                        </Button>
                                    </Box>
                                </Box>
                            </TableCell>
                        </>
                    ) : (
                        <>
                            <TableCell className={classes.bgf3e9ff} align="right">
                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                    <Box className={clsx(classes.workTimeStyle, classes.workTimeBlue)} style={{position: 'relative'}}>
                                        <Button id={'1'} onClick={this.handleClick} disableRipple></Button>
                                        {/*툴팁 전체*/}
                                        {this.state.anchorEl === '1' &&
                                            <Box className={classes.tooltipBox}>
                                                <Box className={classes.tooltipArrow}>
                                                    <TooltipArrow/>
                                                </Box>
                                                {/*툴팁 내용*/}
                                                <Box className={classes.tooltipBoxIn}>
                                                    <Box className={classes.tooltipTitleBox} display='flex' justifyContent='space-between' alignItems='center'>
                                                        <Typography display='flex' justifyContent='space-between' alignItems='center'>
                                                            <TimeHistoryIcon style={{marginRight: 5}}/> 진행 상태
                                                            {/*<RejectTooltipIcon style={{marginRight: 5}}/> 반려함*/}
                                                        </Typography>
                                                        <IconButton className={classes.iconButton} style={{background: '#fff', marginRight: 0,}} onClick={this.handleClose} disableRipple>
                                                            <TooltipCloseIconBlack/>
                                                        </IconButton>
                                                    </Box>
                                                    <Box className={clsx(classes.completed, classes.uncompleted)}><Typography style={{color: '#fff'}}>완료 </Typography></Box>
                                                    <Box display='flex' justifyContent='space-between' alignItems='end' style={{marginTop:20}}>
                                                        <Box><Typography style={{color: '#777', fontSize: '12px'}}>2023.4.3 오후 5:28</Typography></Box>
                                                        <Box>
                                                            <Button style={{background: '#323232', width: 68, height: 32, borderRadius: 3, marginRight: 0,}} onClick={this.handleClose} disableRipple><Typography style={{color: '#fff'}}>확인</Typography></Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }
                                    </Box>
                                    {/*한명일때*/}
                                    <Stack className={classes.avatarBox}>
                                        <Avatar>
                                            {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                            {/*{historyRow.AdminAvatar ? <img src={historyRow.AdminAvatar} /> : <TableUserAvatar />}*/}
                                            <TableUserAvatar />
                                        </Avatar>
                                    </Stack>

                                    {/*2명 이상*/}
                                    {/*<AvatarGroup total={3} max={4} sx={{ flexDirection: 'row' }} className={clsx(classes.avatarBox, classes.InnerTable)}>*/}
                                    {/*    <Avatar>+5</Avatar>*/}
                                    {/*    <Avatar src={AdminAvatar} />*/}
                                    {/*    <Avatar src={AdminAvatar} />*/}
                                    {/*</AvatarGroup>*/}

                                    <Box className={classes.rejectFile} style={{position: 'relative'}}>
                                        <Button id={'2'} onClick={this.handleClick} disableRipple>
                                            <RemoveFile id={'2'} />
                                        </Button>
                                        {/*툴팁 전체 반려함*/}
                                        {/*<Box className={classes.tooltipBox} >*/}
                                        {/*    <Box className={classes.tooltipArrow}>*/}
                                        {/*        <TooltipArrow/>*/}
                                        {/*    </Box>*/}
                                        {/*    /!*툴팁 내용*!/*/}
                                        {/*    <Box className={classes.tooltipBoxIn}>*/}
                                        {/*        <Box className={classes.tooltipTitleBox} display='flex' justifyContent='space-between' alignItems='center'>*/}
                                        {/*            <Typography display='flex' justifyContent='space-between' alignItems='center'>*/}
                                        {/*                <RejectTooltipIcon style={{marginRight: 5}}/> 반려함*/}
                                        {/*            </Typography>*/}
                                        {/*            <IconButton className={classes.iconButton} style={{background: '#fff', marginRight: 0,}} disableRipple>*/}
                                        {/*                <TooltipCloseIconBlack/>*/}
                                        {/*            </IconButton>*/}
                                        {/*        </Box>*/}
                                        {/*        <Typography style={{color: '#323232', letterSpacing: '-0.4px', fontSize: '14px' }}>교정어에 오탈자가 있어 반려합니다.</Typography>*/}
                                        {/*        <Box display='flex' justifyContent='space-between' alignItems='end' style={{marginTop:20}}>*/}
                                        {/*            <Box><Typography style={{color: '#777', fontSize: '12px'}}>2023.4.3 오후 5:28</Typography></Box>*/}
                                        {/*            <Box>*/}
                                        {/*                <Button style={{background: '#323232', width: 68, height: 32, borderRadius: 3, marginRight: 0,}} disableRipple><Typography style={{color: '#fff'}}>확인</Typography></Button>*/}
                                        {/*            </Box>*/}
                                        {/*        </Box>*/}
                                        {/*    </Box>*/}
                                        {/*</Box>*/}
                                        {this.state.anchorEl === '2' &&
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
                                                                    onClick={this.handleClose} disableRipple>
                                                            <TooltipCloseIconBlack/>
                                                        </IconButton>
                                                    </Box>
                                                    <TextField
                                                        style={{width: '100%'}}
                                                        multiline
                                                        rows={1}
                                                        placeholder={'반려사유를 입력해주세요.(최대 200자)'}/>

                                                    <Box style={{marginTop: 14,}}>
                                                        <FormControl variant="outlined"
                                                                     className={classes.formControlLanguage}>
                                                            <Select
                                                                style={{width: '100%'}}
                                                                displayEmpty
                                                                inputProps={{'aria-label': 'Without label'}}
                                                                value={rejectTargetStep}
                                                                onChange={this.handleChangeRejectTargetStep}
                                                            >

                                                                {rejectPoints && rejectPoints.map(rejectPoint => (
                                                                    <MenuItem key={`MenuItem-${rejectPoint.workTemplateId}-${rejectPoint.workTemplateStepNum}`} value={rejectPoint.workTemplateStepNum}>
                                                                        <Checkbox
                                                                            icon={<UnCheckedBox/>}
                                                                            checkedIcon={<CheckedBox/>}
                                                                            checked={rejectTargetStep === rejectPoint.workTemplateStepNum}
                                                                            disableRipple/>
                                                                        {rejectPoint.name}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </Box>

                                                    <Box display='flex' justifyContent='right' alignItems='center'
                                                         style={{marginTop: 20}}>
                                                        <Box>
                                                            <Button style={{color: '#323232', fontWeight: 700,}}
                                                                    onClick={e => this.props.onClose}
                                                                    onClick={this.handleClose} disableRipple>취소</Button>
                                                            <Button style={{
                                                                background: '#d91e50',
                                                                width: 68,
                                                                height: 32,
                                                                borderRadius: 3,
                                                                marginRight: 0,
                                                            }} disableRipple><Typography
                                                                style={{color: '#fff'}}>반려</Typography></Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </TableCell>
                        </>
                    )}
                </TableRow>

                <CommonDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>{TemplateStepTypeLabel[selectedWorkTemplateStep.type]}</b> 단계 작업자 배정</span>}
                    submitText={'배정하기'}
                    onClick={this.saveJobStepTaskRowWorkers}
                    children={<WorkersAssignment/>}
                />

            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobRejectStore', 'jobStepTaskStore', 'workStore','jobStepStore','jobStepTaskWorkerStore', 'authStore', 'workTemplateStore')(
        observer(TableComponentInspectionRowDetail)
    )
);


