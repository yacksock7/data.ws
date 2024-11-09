import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Typography,
    FormControl,
    Select,
    CircularProgress
} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as PageRight } from '../../../common/images/PageRight.svg';
import { ReactComponent as PageLeft } from '../../../common/images/PageLeft.svg';
import CommonDialog from "../../dialog/CommonDialog";
import {TemplateStepTypeLabel} from "../../../stores/TemplateStore";
import WorkersAssignment from "../../../components/WorkersAssignment";
import {inject, observer} from "mobx-react";
import {JobTaskStatus, State} from "../../../stores/JobStepStore";
import TableComponentRow from "./TableComponentRow";



// import clsx from "clsx";
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
        this.state = {
            page: 2,
            rowsPerPage: 10,
            selected: 'false',
            open: false,
            openRows: {},
            openTable : false,
            allChecked: false,
            checked: [true, false],
            workerDialogOpen: false,
            count: ''
        }
    }

    handleScrollToBottom = () =>{
        if(this.scrollRef.current){
            this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
        }
    }

    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            workerDialogOpen: false,
            isShowSelectedBar : false
        });
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            count: event.target.value
        });
    }




    saveJobStepTaskWorkers = async () => {
        await this.props.jobStepTaskWorkerStore.createJobStepTaskWorkers();

        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { selectedJobStepTransfer } = this.props.jobStepStore;
        const { loginUser } = this.props.authStore;

        await this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);

        if(selectedJobStepTransfer) {
            this.props.jobStepTaskStore.getJobStepTaskTransfers(selectedJobStepTransfer.jobId, selectedJobStepTransfer.jobStepNum, loginUser.id)
        }
        this.handleCloseDialog();
    };

    handleChangePage = (newPage) => {
        const {totalCount ,rowsPerPage} = this.props.jobStepStore;
        //const totalPage = (jobStepTransfers.length / rowsPerPage) + 1;
        const totalPage = Math.floor((totalCount-1) / rowsPerPage) + 1;
        if (newPage >= 0 && newPage < totalPage) {
            this.props.jobStepStore.changePage(newPage);
        }

        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    };

    handleChangeRowPerPage = (event) => {
        const rowsPerPage = parseInt(event.target.value);
        this.props.jobStepStore.changeRowsPerPage(rowsPerPage);
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    }

    handleOpenDialog = (jobStepTransfer) => {
        const {jobId, jobStepNum} =  jobStepTransfer;
        const isAllAssigned = jobStepTransfer.taskStatusCount.createdCount < 1;
        // if (isAllAssigned) {
            this.props.jobStepTaskWorkerStore.getJobStepTaskWorkers(jobId, jobStepNum);
        // } else {
        //     this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum, true);
        // }
        this.props.jobStepTaskWorkerStore.changeSelectedJobStepTransfer(jobStepTransfer);
        this.setState({workerDialogOpen: true, isShowSelectedBar : !isAllAssigned});

    }

    removeSelectedWorkers = (userId) => {
        this.props.jobStepTaskWorkerStore.removeSelectedWorkers(userId);
    }

    render() {
        const { classes} = this.props;
        const { selected, workerDialogOpen, isShowSelectedBar} = this.state;
        const {jobStepTransfers, page, rowsPerPage, totalCount, jobStepState} = this.props.jobStepStore;
        const { selectedWorkers, selectedJobStepTransfer } = this.props.jobStepTaskWorkerStore;
        const { selectedWorkTemplateStep } = this.props.workStore;
        const totalPage = Math.floor((totalCount-1) / rowsPerPage) + 1;
        console.log("##########",this.props.authStore.loginUser,this.props.userStore.userProfile);
        return (
            <div ref={this.scrollRef}>
                <TableContainer component={Paper} className={classes.tableWrap}>
                    <Table aria-label="collapsible table">
                        <TableHead className={classes.headTitle}>
                            <TableRow className={classes.tableList}>
                                <TableCell style={{width: '9%', paddingLeft: '23px', paddingRight: 0,}} className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>번호</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '60%'}} align="left">일감명</TableCell>
                                <TableCell style={{width: '13%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>최근 작업일</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '9%', maxWidth: 150}} align="left" className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}>
                                        <Typography>진행 상태</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '10%', minWidth: 115}} align="right" className={classes.toggleBtn} colSpan={1}>
                                    <IconButton
                                        style={{marginRight: '30px'}}
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>작업자</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {jobStepState === State.Pending ?
                                <TableRow sx={{height:54*rowsPerPage}}>
                                    <TableCell style={{textAlign:"center"}} colSpan={5}>
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                                :
                                jobStepTransfers.map(jobStepTransfer => (
                                <TableComponentRow key={`TableComponentModifyRow_${jobStepTransfer.jobId}`}
                                                   jobStepTransfer={jobStepTransfer}
                                                   handleOpenDialog={this.handleOpenDialog}
                                                   // handleScrollToBottom={this.handleScrollToBottom}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/*Pagination*/}
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: 10,}}>
                    <Box className={classes.rowCount} style={{display: 'flex', alignItems: 'center',}}>
                        <Typography>페이지 당 수:</Typography>
                        <Box sx={{ width: 45 }}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rowsPerPage}
                                    onChange={this.handleChangeRowPerPage}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.paginationBtn} style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton disabled={page === 0}
                                    onClick={() => this.handleChangePage(page-1)} disableRipple>
                            <PageLeft />
                        </IconButton>
                        <Box className={classes.pagiNumber}>
                            <Typography><span>{page+1}</span> / {totalPage}</Typography>
                        </Box>
                        <IconButton disabled={page+1 === totalPage}
                                    onClick={() => this.handleChangePage(page+1)} disableRipple>
                            <PageRight />
                        </IconButton>
                    </Box>
                </Box>
                {/*Pagination*/}

                {/*작업자 배정 dialog*/}
                <CommonDialog
                    open={workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>{TemplateStepTypeLabel[selectedWorkTemplateStep.type]}</b> 단계 작업자 배정</span>}
                    submitText={isShowSelectedBar ? '배정하기' : null}
                    onClick={this.saveJobStepTaskWorkers}
                    children={
                        <WorkersAssignment selectedWorkers={selectedWorkers}
                                           removeSelectedWorkers={this.removeSelectedWorkers}
                                           isShowSelectedBar={isShowSelectedBar}/>
                    }/>
            </div>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepStore', 'workStore', 'jobStepTaskWorkerStore', 'authStore','jobStepTaskStore','userStore')(
        observer(TableComponent)
    )
);
