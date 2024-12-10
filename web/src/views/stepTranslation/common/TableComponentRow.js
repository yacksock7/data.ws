import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Typography,
    Button,
    Collapse,
    Stack,
    Avatar,
    Checkbox,
    AvatarGroup, CircularProgress,
} from "@mui/material";
import { ReactComponent as TableRoundUp } from '../../../common/images/TableRoundUp.svg';
import { ReactComponent as TableRoundDown } from '../../../common/images/TableRoundDown.svg';
import { ReactComponent as ArrangeUser } from '../../../common/images/ArrangeUser.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import { ReactComponent as UnCheckedBox } from '../../../common/images/UnCheckedBox.svg';
import { ReactComponent as CheckedBox } from '../../../common/images/CheckedBox.svg';
import clsx from "clsx";
import {inject, observer} from "mobx-react";
import {JobTaskStatus, State} from "../../../stores/JobStepStore";
import dayjs from "dayjs";
import TableComponentRowDetail from "./TableComponentRowDetail";
import {TemplateStepType} from "../../../stores/TemplateStore";
import CommonDialog from "../../dialog/CommonDialog";
import WorkSheet from "./WorkSheet/WorkSheet";
import PreWorkResultSheet from "./WorkSheet/PreWorkResultSheet";
import 'react-virtualized/styles.css';
import {WindowScroller, List,ScrollSync} from "react-virtualized";
import {  FixedSizeList,VariableSizeList } from 'react-window';



class TableComponentRow extends Component {
    constructor(props) {
        super(props);
        this.tableHeaderRef = React.createRef();
        this.listRef=React.createRef();
        this.state = {
            page: 2,
            rowsPerPage: 10,
            selected: false,
            open: false,
            detailOpen: false,
            openRows: {},
            openTable : false,
            allChecked: false,
            checked: [true, false],
            approvalBtn: false,
            statusByJobStepTask : '',
            headerWidth:0,
            itemSize : 50,
            preViewingTemplateStepNums : 0
        }
    }
    componentDidMount() {
        if (this.tableHeaderRef.current) {
            const headerWidth = this.tableHeaderRef.current.offsetWidth;
            console.log('headerWidth : ' + headerWidth);
            this.setState({ headerWidth : headerWidth });
        }
    }
    componentWillUnmount() {
        this.props.jobStepStore.changeSelectedJobStepTransfer();
        this.props.jobStepTaskResultStore.changeSelectedJobStepTask(null);
        this.props.jobStepTaskResultStore.initCheckedList();
        this.props.jobStepTaskResultStore.initCheckedJobStepTaskList();
        this.props.jobStepTaskResultStore.changePreJobResult([]);
        this.props.jobStepTaskResultStore.changeSelectedJobStepTaskIndex(null);
        this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
    }

    handleToggle = () => {
        console.log('handleToggle : ', this.state.selected);
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleClickApprovalBtn = () => {
        this.setState({ approvalBtn: !this.state.approvalBtn });
    };

    handleClickDetailOpen = () => {
        this.setState({
            detailOpen: !this.state.detailOpen
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    setOpenTable = async () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        const {loginUser} = this.props.authStore;
        const {selectedJobStepTransfer} = this.props.jobStepStore;
        const {jobStepTaskTransfers} = this.props.jobStepTaskStore;
        const {checkedJobList} = this.props.jobStepTaskResultStore;

        await this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
        this.props.jobStepTaskStore.initJobStepTaskTransfers();

        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobId
            && selectedJobStepTransfer.jobStepNum === jobStepNum;
        if(!openTable) {
            this.props.jobStepTaskStore.changeJobStepTasksCount(0);
            await this.props.jobStepTaskStore.getJobStepTasksCount(jobId,jobStepNum,loginUser.id);
            this.props.jobStepTaskResultStore.changeCheckedJobId(jobId);

            if (checkedJobList.indexOf(jobId) !== -1) {
                this.props.jobStepTaskResultStore.initCheckedJobStepTaskList();
                jobStepTaskTransfers.map(jobStepTaskTransfer => {
                    this.props.jobStepTaskResultStore.addCheckedJobStepTaskList(jobStepTaskTransfer.jobStepTaskNum);
                });
            }

            if (this.tableHeaderRef.current) {
                const headerWidth = this.tableHeaderRef.current.offsetWidth;
                this.setState({ headerWidth : 0 });
                this.setState({ headerWidth : headerWidth });
            }

            this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
            this.props.jobStepTaskStore.changeGetJobStepTaskState(State.Pending);
            this.props.jobStepTaskStore.changeGetRequestFlag(true);
        } else {
            this.props.jobStepTaskResultStore.initCheckedJobId();
            this.props.jobStepTaskResultStore.initCheckedJobStepTaskList();
            this.props.jobStepTaskResultStore.changePreJobResult([]);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTask(null);
            this.props.jobStepTaskResultStore.changeSelectedJobStepTaskIndex(null);
            this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
            this.props.jobStepTaskStore.changeGetRequestFlag(false);
            this.props.jobStepTaskStore.changeJobStepTasksCount(0);
        }
    }

    inspectAllJobStepTask = async () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        const {loginUser} = this.props.authStore;

        await this.props.jobStepTaskResultStore.inspectAllJobStepTask(jobId, jobStepNum,loginUser.id);
        await this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        this.handleClickApprovalBtn();
    }
    handleOpenStatusTooltip = (jobStepTask) => {
        this.setState({statusByJobStepTask : jobStepTask});
    }

    handleClickCheckBox = (checked) =>{
        const openTable =
            this.props.jobStepStore.selectedJobStepTransfer
            && this.props.jobStepStore.selectedJobStepTransfer.jobId === this.props.jobStepTransfer.jobId
            && this.props.jobStepStore.selectedJobStepTransfer.jobStepNum === this.props.jobStepTransfer.jobStepNum;
        if(checked){
            this.props.jobStepTaskResultStore.delCheckedJobList(this.props.jobStepTransfer.jobId);
            if(openTable) {
                this.props.jobStepTaskResultStore.initCheckedJobStepTaskList();
            }
        }
        else{
            this.props.jobStepTaskResultStore.addCheckedJobList(this.props.jobStepTransfer.jobId);
            if(openTable) {
                this.props.jobStepTaskStore.jobStepTaskTransfers.map(jobStepTaskTransfer => {
                    this.props.jobStepTaskResultStore.addCheckedJobStepTaskList(jobStepTaskTransfer.jobStepTaskNum);
                })
            }
        }
    }

    handleScrollToItem = (itemNum) =>
    {
        if(this.listRef.current){
            this.listRef.current.scrollToItem(itemNum,'start');
            this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
        }
    }
    handleResetItemSize = (openFlag) =>{
        if(this.props.jobStepTaskResultStore.preSelectedJobStepTaskIndex !== null)
            this.listRef.current.resetAfterIndex(this.props.jobStepTaskResultStore.preSelectedJobStepTaskIndex);
        if(this.props.jobStepTaskResultStore.selectedJobStepTaskIndex !== null) {
            this.listRef.current.resetAfterIndex(this.props.jobStepTaskResultStore.selectedJobStepTaskIndex);
            this.handleScrollToItem(this.props.jobStepTaskResultStore.selectedJobStepTaskIndex);
            this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
        }
        this.setState({selected : openFlag});
    }
    getItemSize = (index) =>{
        if(this.props.jobStepTaskStore.jobStepTaskTransfers.length === 0) {
            return 50;
        }
        const jobStepTaskTransfer = this.props.jobStepTaskStore.jobStepTaskTransfers[index];
        const selectedWorkTemplateStep = this.props.workStore.selectedWorkTemplateStep;
        const { preJobResults, selectedJobStepTask,jobStepTaskResults } = this.props.jobStepTaskResultStore;
        const open = selectedJobStepTask && jobStepTaskTransfer
            && jobStepTaskTransfer.jobId === selectedJobStepTask.jobId
            && jobStepTaskTransfer.jobStepNum === selectedJobStepTask.jobStepNum
            && jobStepTaskTransfer.jobStepTaskNum === selectedJobStepTask.jobStepTaskNum;
        const { workTemplateStepViewingRoles } = this.props.workTemplateStore;
        const viewingTemplateStepNums = workTemplateStepViewingRoles.map(e => e.viewingTemplateStepNum);
        if(open){
            let itemSize = 50;
            if(preJobResults && preJobResults.length > 0){
                //itemSize = itemSize + preJobResults.length * 48;
                itemSize = itemSize + (viewingTemplateStepNums.length-1 )* 48;
            }
            if((selectedWorkTemplateStep.type === TemplateStepType.Editing
                    || selectedWorkTemplateStep.type === TemplateStepType.Refine)
                && (jobStepTaskTransfer.status === JobTaskStatus.Assigned
                    || jobStepTaskTransfer.status === JobTaskStatus.Rejected)){
                itemSize = itemSize + 342;
            }
            if(jobStepTaskResults && jobStepTaskResults.length>0){
                itemSize = itemSize + (jobStepTaskResults.length * 50)
            }
            console.log('getitemSize', preJobResults, jobStepTaskResults);
            this.setState({itemSize:itemSize});
            return itemSize;
        }
        else {
            return 50;
        }
    }

    renderRow = ({index,style,isScrolling}) => {
        console.log('rowRender : ', index, isScrolling)
        const {jobStepTransfer} = this.props;
        const { selectedJobStepTransfer } = this.props.jobStepStore;
        const { workTemplateStepViewingRoles, viewingTemplateStepNums } = this.props.workTemplateStore;
        const nowViewingTemplateStepNums = workTemplateStepViewingRoles.map(e => e.viewingTemplateStepNum);

        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobStepTransfer.jobId
            && selectedJobStepTransfer.jobStepNum === jobStepTransfer.jobStepNum;

        if (isScrolling) {
            this.props.jobStepTaskStore.initGetListJobStepTaskTransfers();
            this.props.jobStepTaskStore.changeGetRequestFlag(true);
            this.props.jobStepTaskStore.changeGetJobStepTaskState(State.Pending);
        } else {
            this.props.jobStepTaskStore.pushGetListJobStepTaskTransfers(index);
            if(this.props.jobStepTaskStore.getListJobStepTaskTransfers &&
                (this.props.jobStepStore.rowsPerPage <= this.props.jobStepTaskStore.getListJobStepTaskTransfers.length || this.props.jobStepStore.rowsPerPage > this.props.jobStepTaskStore.jobStepTasksCount)
                && this.props.jobStepTaskStore.getRequestFlag && openTable){
                //getJobStepTaskTransfer
                this.props.jobStepTaskStore.setIntervalForGetJobStepTaskTransfers(jobStepTransfer.jobId,jobStepTransfer.jobStepNum, this.props.authStore.loginUser.id,this.props.jobStepStore.rowsPerPage);
                this.props.jobStepTaskStore.changeGetRequestFlag(false);
            }
        }
        const jobStepTaskTransfer = this.props.jobStepTaskStore.jobStepTaskTransfers[index];
        let selectedWorkTemplateStep = this.props.workStore.selectedWorkTemplateStep;

        if(!(isScrolling || this.props.jobStepTaskStore.getJobStepTaskState !== State.Success || index - this.props.jobStepTaskStore.getListStartNum < 0)
            && !jobStepTaskTransfer){
            this.props.jobStepTaskStore.changeGetRequestFlag(true);
            this.props.jobStepTaskStore.changeGetJobStepTaskState(State.Pending);
        }
        if(openTable && viewingTemplateStepNums.length !== nowViewingTemplateStepNums.length){
            this.handleResetItemSize(this.state.selected);
            this.props.workTemplateStore.changeViewingTemplateStepNums(nowViewingTemplateStepNums);
        }
        return (
            <div className={`ListItem${index}`} style={style}>
                {(jobStepTaskTransfer === undefined || index - this.props.jobStepTaskStore.getListStartNum < 0)?
                    (
                        <TableRow style={{cursor: 'pointer', background: 'rgba(221, 236, 255, 0.5)'}}>
                            <TableCell align='center' style={{
                                width: 60,
                                height : 48,

                                boxSizing: 'border-box',
                                padding: '2px 2px'
                            }}>
                                #{index+1}
                            </TableCell>
                            <TableCell style={{
                                width: this.state.headerWidth-41,

                                boxSizing: 'border-box',
                                padding: '2.5px 5px',
                                textAlign: "center"
                            }}>
                                <CircularProgress/>
                            </TableCell>
                        </TableRow>
                    ) : (
                        <div>
                            {selectedWorkTemplateStep.type !== TemplateStepType.Upload && jobStepTaskTransfer &&
                                <PreWorkResultSheet jobStepTaskTransfer={jobStepTaskTransfer}
                                                    key={'preWorkResultSheet' + jobStepTaskTransfer.jobStepTaskNum}
                                                    headerWidth={this.state.headerWidth}/>
                            }
                            {jobStepTaskTransfer &&
                                <TableComponentRowDetail
                                    //key={'rowDetail' + jobStepTaskTransfer.jobStepTaskNum}
                                    key={'rowDetail' + index}
                                    jobStepTaskTransfer={this.props.jobStepTaskStore.jobStepTaskTransfers[index]}
                                    //andleClickDetailOpen={this.handleClickDetailOpen}
                                    handleOpenStatusTooltip={this.handleOpenStatusTooltip}
                                    statusByJobStepTask={this.state.statusByJobStepTask}
                                    isScrolling={isScrolling}
                                    listIndex={index}
                                    onClickEvent={this.handleResetItemSize}
                                    headerWidth={this.state.headerWidth}/>}

                            {selectedWorkTemplateStep.type !== TemplateStepType.Upload

                                && jobStepTaskTransfer &&
                                <WorkSheet jobStepTaskTransfer={jobStepTaskTransfer}
                                           handleClickDetailOpen={this.handleClickDetailOpen}
                                           onClickEvent={this.handleResetItemSize}
                                           key={'workSheet' + jobStepTaskTransfer.jobStepTaskNum}
                                           headerWidth={this.state.headerWidth}/>
                            }

                        </div>
                    )
                }
            </div>)
    };
//

    render() {
        const { classes, jobStepTransfer, handleOpenDialog } = this.props;
        const { approvalBtn, statusByJobStepTask } = this.state;
        const { jobStepTaskTransfers, jobStepTaskState } = this.props.jobStepTaskStore;
        const { selectedJobStepTransfer } = this.props.jobStepStore;
        const { selectedWorkTemplateStep } = this.props.workStore;

        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobStepTransfer.jobId
            && selectedJobStepTransfer.jobStepNum === jobStepTransfer.jobStepNum;

        const workers = jobStepTaskTransfers.reduce((workers, jobStepTaskTransfer) => {
            if(jobStepTaskTransfer && workers){
                const workerIds = workers.map(e => e.userId);
                const newWorkers =
                    jobStepTaskTransfer.jobStepTaskResults
                        .map(result => result.worker)
                        .filter(result => !workerIds.includes(result.userId));
                return [...workers, ...newWorkers];
            }
            else{
                return null;
            }
        }, []);
        const checked = this.props.jobStepTaskResultStore.checkedJobList.indexOf(jobStepTransfer.jobId) !== -1;
        const createdDatetime = dayjs(jobStepTransfer.createdDatetime).format("YYYY-MM-DD hh:mm");

        const { workTemplateStepViewingRoles } = this.props.workTemplateStore;
        const viewingTemplateStepNums = workTemplateStepViewingRoles.map(e => e.viewingTemplateStepNum);

        return (
            <React.Fragment>
                <TableRow className={clsx(classes.tableList, classes.tableHover)} style={openTable ? {background: '#d6e7fd'} : {}} ref={this.tableHeaderRef}>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>
                        <Box  className={classes.CheckboxStyle}>
                            {selectedWorkTemplateStep.type === TemplateStepType.Export && (
                                <Checkbox onClick={e => this.handleClickCheckBox(checked)}
                                          checked={checked}
                                          icon={<UnCheckedBox />}
                                          checkedIcon={<CheckedBox />}
                                          disableRipple/>
                            )}
                            <Typography>{jobStepTransfer.jobId}</Typography>
                        </Box>
                    </TableCell>

                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.titleWrap}>
                        <IconButton aria-label="expand row"
                                    size="small"
                                    onClick={this.setOpenTable}
                                    disableRipple>

                            {openTable ? <TableRoundDown /> : <TableRoundUp />}
                            <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", textAlign: "left",}}>
                                {jobStepTransfer.job.name}
                            </Typography>
                        </IconButton>
                    </TableCell>

                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.tableDueDate}>
                        <Typography>{createdDatetime}</Typography>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                        <Box display='flex' alignItems='center'>
                        {(jobStepTransfer.status === JobTaskStatus.Assigned
                            || jobStepTransfer.status === JobTaskStatus.Created) && (
                                <Box className={classes.uncompleted}>
                                    <Typography>미완료</Typography>
                                </Box>
                        )}
                        {jobStepTransfer.status === JobTaskStatus.Completed && (
                            <Box className={clsx(classes.completed, classes.uncompleted)}><Typography>완료</Typography></Box>
                        )}
                        {jobStepTransfer.status === JobTaskStatus.Rejected &&  (
                            <Box className={clsx(classes.rejectTag, classes.uncompleted)}><Typography>반려</Typography></Box>
                        )}

                        {selectedWorkTemplateStep && selectedWorkTemplateStep.type === TemplateStepType.Inspection &&
                            <Button onClick={this.handleClickApprovalBtn} className={classes.buttonStyle2}
                                    disableRipple>
                                일괄 승인
                            </Button>
                        }
                        </Box>
                        {/*{row.currentStatus === '마감' && (*/}
                        {/*    <>*/}
                        {/*        <Box className={clsx(classes.extension, classes.uncompleted)} style={{marginTop: '-4px'}}><Typography>{row.currentStatus}</Typography></Box>*/}
                        {/*        <Box className={classes.extensionDueDate}><Button disableRipple style={{marginLeft: '3px'}}>+ 기한 연장</Button></Box>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </TableCell>
                    <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                        {jobStepTransfer.status === JobTaskStatus.Created ? (
                            selectedWorkTemplateStep.type !== TemplateStepType.Export &&
                            <Box className={classes.ArrangeUserBtn}>
                                <Button onClick={() => handleOpenDialog(jobStepTransfer)}
                                        disableRipple>
                                    <ArrangeUser /> <Typography>배정</Typography>
                                </Button>
                            </Box>

                        ) : (
                            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                {jobStepTransfer.workers.length > 1 ? (
                                    <AvatarGroup total={jobStepTransfer.workers.length}
                                                 max={5}
                                                 sx={{ flexDirection: 'row' }}
                                                 onClick={() => handleOpenDialog(jobStepTransfer)}
                                                 className={classes.avatarBox}>

                                        {jobStepTransfer.workers.map((e, i) => {
                                            // if (i <= 3) {
                                                return (
                                                    <Avatar>
                                                        <TableUserAvatar key={`avatar_${i}`} />
                                                    </Avatar>
                                                );
                                            // }
                                        })}
                                    </AvatarGroup>
                                ) : (
                                    <Stack className={classes.avatarBox}
                                           onClick={() => handleOpenDialog(jobStepTransfer)}>
                                        <Avatar>
                                            {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                            {/*{AdminAvatar ? <img src={AdminAvatar} /> : <TableUserAvatar />}*/}
                                            <TableUserAvatar />
                                        </Avatar>
                                    </Stack>
                                )}
                            </Box>
                        )}
                    </TableCell>
                </TableRow>





                <TableRow>
                    <TableCell style={{ padding: 0 }} colSpan={9} className={clsx(classes.toggleTable, classes.toggleTable2)}>
                        <Collapse in={openTable} timeout="auto" unmountOnExit>

                            <Box>
                                {<Table size="small" aria-label="purchases">
                                        <TableHead >
                                            <TableRow>
                                                <TableCell align='center' style={{width: 60}}>
                                                </TableCell>
                                                <TableCell align='center' style={{width: 67, boxSizing: 'border-box', padding: '11px 5px'}}>
                                                    출발어
                                                </TableCell>
                                                <TableCell align='left' style={{width: 'calc(100% - 127px)', padding: '11px 11px 11px 160px', boxSizing: 'border-box'}}>
                                                    문장 ({jobStepTaskTransfers.length})
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={3} style={{ padding: 0}}>
                                                    <VariableSizeList
                                                        useIsScrolling
                                                        className="List"
                                                        ref={this.listRef}
                                                        height={this.state.selected ?
                                                            this.props.jobStepTaskStore.jobStepTasksCount < this.props.jobStepStore.rowsPerPage ? (this.props.jobStepTaskStore.jobStepTasksCount-1) * 50 + this.state.itemSize : ((this.props.jobStepStore.rowsPerPage-1) * 50 + this.state.itemSize ) :
                                                            this.props.jobStepTaskStore.jobStepTasksCount < this.props.jobStepStore.rowsPerPage ? this.props.jobStepTaskStore.jobStepTasksCount * 50 : (this.props.jobStepStore.rowsPerPage) * 50}
                                                        itemCount={this.props.jobStepTaskStore.jobStepTasksCount}
                                                        itemSize={this.getItemSize}
                                                        overscanCount={2}
                                                        width={this.state.headerWidth}
                                                        statePending={this.props.jobStepTaskStore.getJobStepTaskState}
                                                    >
                                                        {this.renderRow}
                                                    </VariableSizeList>
                                                </TableCell>
                                            </TableRow>

                                            {/*/!* 2023.5.15 수정된 테이블*!/*/}
                                            {/*{jobStepTaskTransfers.map(jobStepTaskTransfer => (*/}
                                            {/*    <>*/}
                                            {/*        {selectedWorkTemplateStep.type !== TemplateStepType.Upload &&*/}
                                            {/*            <PreWorkResultSheet jobStepTaskTransfer={jobStepTaskTransfer}*/}
                                            {/*                                key={'preWorkResultSheet' + jobStepTaskTransfer.jobStepTaskNum}/>*/}
                                            {/*        }*/}

                                            {/*        <TableComponentRowDetail*/}
                                            {/*            key={'rowDetail' + jobStepTaskTransfer.jobStepTaskNum}*/}
                                            {/*            jobStepTaskTransfer={jobStepTaskTransfer}*/}
                                            {/*            handleClickDetailOpen={this.handleClickDetailOpen}*/}
                                            {/*            handleOpenStatusTooltip={this.handleOpenStatusTooltip}*/}
                                            {/*            statusByJobStepTask={statusByJobStepTask}/>*/}

                                            {/*        {selectedWorkTemplateStep.type !== TemplateStepType.Upload*/}
                                            {/*            && selectedWorkTemplateStep.type !== TemplateStepType.Inspection*/}
                                            {/*            &&*/}
                                            {/*            <WorkSheet jobStepTaskTransfer={jobStepTaskTransfer}*/}
                                            {/*                       handleClickDetailOpen={this.handleClickDetailOpen}*/}
                                            {/*                       key={'workSheet' + jobStepTaskTransfer.jobStepTaskNum}/>*/}
                                            {/*        }*/}
                                            {/*    </>*/}
                                            {/*))}*/}


                                        </TableBody>
                                    </Table>
                                }
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
                <CommonDialog
                    open={approvalBtn}
                    onClose={this.handleClickApprovalBtn}
                    onClick={this.inspectAllJobStepTask}
                    title={"일괄 승인"}
                    submitText={'승인'}
                    color={'#7500fa'}
                    hoverColor={'#9d4bfb'}
                    children={"완료된 작업과 반려되지 않은 작업을 일괄 승인하시겠습니까?"}
                />
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskResultStore', 'jobStepTaskWorkerStore', 'jobStepTaskStore', 'jobStepStore', 'workStore', 'authStore','workTemplateStore')(
        observer(TableComponentRow)
    )
);

