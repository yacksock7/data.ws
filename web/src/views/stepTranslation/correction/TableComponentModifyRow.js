import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentModifyStyle";
import {
    Box,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    Checkbox,
    Typography,
    Button,
    Collapse,
    Stack, Avatar,
    AvatarGroup,
} from "@mui/material";
import {ReactComponent as TableRoundUp} from '../../../common/images/TableRoundUp.svg';
import {ReactComponent as TableRoundDown} from '../../../common/images/TableRoundDown.svg';
import {ReactComponent as ArrangeUser} from '../../../common/images/ArrangeUser.svg';
import {ReactComponent as UnCheckedBox} from '../../../common/images/UnCheckedBox.svg';
import {ReactComponent as CheckedBox} from '../../../common/images/CheckedBox.svg';
import {ReactComponent as RejectIconTable} from '../../../common/images/RejectIconTable.svg';
import {ReactComponent as RejectIconClose} from '../../../common/images/RejectIconClose.svg';
import {ReactComponent as TableUserAvatar} from '../../../common/images/TableUserAvatar.svg';
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import {inject, observer} from "mobx-react";
import TableComponentModifyRowDetail from "./TableComponentModifyRowDetail";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import dayjs from "dayjs";


class TableComponentModifyRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openRows: {},
            openTable: false,
            allChecked: false,
            checked: [true, false],
            rejectTooltipOpen: true,
        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleCloseRejectTooltipOpen = () => {
        this.setState({rejectTooltipOpen: false});
    }

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };


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
        this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
    }

    handleCheck = () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum);
    };


    render() {
        const {classes, jobStepTransfer, handleOpenDialog} = this.props;
        const {jobStepTaskTransfers} = this.props.jobStepTaskStore;
        const {checkedJobStepIds, selectedWorkers} = this.props.jobStepTaskWorkerStore;
        const {selectedJobStepTransfer} = this.props.jobStepStore;

        const createdDatetime = dayjs(jobStepTransfer.createdDatetime).format("YYYY-MM-DD hh:mm");

        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobStepTransfer.jobId
            && selectedJobStepTransfer.jobStepNum === jobStepTransfer.jobStepNum;

        const workers = jobStepTaskTransfers.reduce((workers, jobStepTransfer) => {
            const workerIds = workers.map(e => e.userId);
            const newWorkers = jobStepTransfer.workers.filter(e => !workerIds.includes(e.userId));
            return [...workers, ...newWorkers];
        }, []);

        const isChecked = checkedJobStepIds.find(e => e.jobId === jobStepTransfer.jobId && e.jobStepNum === jobStepTransfer.jobStepNum);

        return (
            <React.Fragment>
                <TableRow className={clsx(classes.tableList, classes.tableHover)}>
                    <TableCell align="left"
                               style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>
                        <Box className={classes.CheckboxStyle}>
                            {jobStepTransfer.status === JobTaskStatus.Created &&
                                <Checkbox
                                    onClick={this.handleCheck}
                                    checked={!!isChecked}
                                    icon={<UnCheckedBox/>}
                                    checkedIcon={<CheckedBox/>}
                                    disabled={jobStepTransfer.status !== JobTaskStatus.Created}
                                    disableRipple
                                />
                            }

                            <Typography>{jobStepTransfer.jobId}</Typography>
                        </Box>
                    </TableCell>
                    <TableCell align="left"
                               style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', position: 'relative'}}
                               className={classes.titleWrap}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={this.setOpenTable}
                            disableRipple
                        >
                            {openTable ? <TableRoundDown/> : <TableRoundUp/>}
                            <Typography sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "1",
                                WebkitBoxOrient: "vertical",
                                textAlign: "left"
                            }}>
                                {jobStepTransfer.job.name}
                            </Typography>
                        </IconButton>

                        {/**/}
                        {jobStepTransfer.taskStatusCount.rejectedCount > 0 && this.state.rejectTooltipOpen &&
                            <Box className={classes.rejectBoxPopup} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: 300,
                                height: 60,
                                borderRadius: 4,
                                border: '1px solid red',
                                borderLeft: '14px solid #CE1821',
                                position: 'absolute',
                                background: '#fff',
                                zIndex: 99,
                            }}>
                                <Box style={{marginLeft: 14, paddingTop: 5,}}>
                                    <RejectIconTable/>
                                </Box>
                                <Box style={{textAlign: 'left', width: 215,}}>
                                    <Typography style={{
                                        fontWeight: 700,
                                        color: '#323232',
                                        letterSpacing: '-0.5px'
                                    }}>반려</Typography>
                                    <Typography style={{color: '#777', fontSize: '14px', letterSpacing: '-0.5px'}}>반려가
                                        포함된 문장 {jobStepTransfer.taskStatusCount.rejectedCount}건이 있습니다.</Typography>
                                </Box>
                                <Box style={{marginRight: 14,}}>
                                    <IconButton onClick={this.handleCloseRejectTooltipOpen}
                                                disableRipple>
                                        <RejectIconClose/>
                                    </IconButton>
                                </Box>
                            </Box>
                        }
                        {/**/}
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}
                               className={classes.tableDueDate}>
                        <Typography>{createdDatetime}</Typography>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                        {(jobStepTransfer.status === JobTaskStatus.Assigned
                            || jobStepTransfer.status === JobTaskStatus.Created) && (
                            <Box className={classes.uncompleted}><Typography>미완료</Typography></Box>
                        )}
                        {jobStepTransfer.status === JobTaskStatus.Completed && (
                            <Box
                                className={clsx(classes.completed, classes.uncompleted)}><Typography>완료</Typography></Box>
                        )}
                        {jobStepTransfer.status === JobTaskStatus.Rejected && (
                            <Box
                                className={clsx(classes.rejectTag, classes.uncompleted)}><Typography>반려</Typography></Box>
                        )}
                    </TableCell>
                    <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                        {jobStepTransfer.status === JobTaskStatus.Created ? (
                            <Box className={classes.ArrangeUserBtn}>
                                <Button onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Completed)}
                                        disableRipple>
                                    <ArrangeUser/> <Typography>배정</Typography>
                                </Button>
                            </Box>
                        ) : (
                            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                {workers.length > 1 ? (
                                    <AvatarGroup total={selectedWorkers.length}
                                                 max={5}
                                                 sx={{flexDirection: 'row'}}
                                                 onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Assigned)}
                                                 className={classes.avatarBox}>
                                        <Avatar>{selectedWorkers.length}</Avatar>
                                        {workers.map((e, i) => (
                                            i < 3 && <Avatar src={AdminAvatar}/>
                                        ))}
                                    </AvatarGroup>
                                ) : (
                                    <Stack className={classes.avatarBox}
                                           onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Assigned)}>
                                        <Avatar>
                                            {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                            {/*{AdminAvatar ? <img src={AdminAvatar} /> : <TableUserAvatar />}*/}
                                            <TableUserAvatar/>
                                        </Avatar>
                                    </Stack>
                                )
                                }

                                {/*<IconButton id="basic-button"*/}
                                {/*            aria-controls={open ? 'basic-menu' : undefined}*/}
                                {/*            aria-haspopup="true"*/}
                                {/*            aria-expanded={open ? 'true' : undefined}*/}
                                {/*    //         onClick={() => this.handleClick(historyRow)}*/}
                                {/*            disableRipple>*/}
                                {/*    <TableDotIcon/>*/}
                                {/*</IconButton>*/}
                                {/*<Menu*/}
                                {/*    id="basic-menu"*/}
                                {/*    anchorEl={anchorEl}*/}
                                {/*    open={open}*/}
                                {/*    // onClick={() => this.handleClose}*/}
                                {/*    MenuListProps={{*/}
                                {/*        'aria-labelledby': 'basic-button',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    <MenuItem>번역 다시 실행</MenuItem>*/}
                                {/*</Menu>*/}
                            </Box>
                        )}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{padding: 0}} colSpan={9} className={classes.toggleTable}>
                        <Collapse in={openTable} timeout="auto" unmountOnExit>
                            <Box>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: '3%', textAlign: 'center'}}></TableCell>
                                            <TableCell style={{
                                                width: '5%',
                                                textAlign: 'center',
                                                padding: '2.5px 0px'
                                            }}>출발어</TableCell>
                                            <TableCell style={{width: '32%', textAlign: 'center'}}>문장
                                                ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '3%'}}></TableCell>
                                            <TableCell style={{width: '3%'}}></TableCell>
                                            <TableCell style={{
                                                width: '5%',
                                                textAlign: 'center',
                                                padding: '2.5px 0px'
                                            }}>도착어</TableCell>
                                            <TableCell style={{width: '27%', textAlign: 'center'}}>문장
                                                ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '13%'}}></TableCell>
                                            <TableCell style={{width: '7%'}}></TableCell>
                                            <TableCell style={{width: '2%'}}></TableCell>
                                            <TableCell style={{width: '2%'}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {jobStepTaskTransfers.map((jobStepTaskTransfer, index) => (
                                            <TableComponentModifyRowDetail  key={'modifyRowDetail'+jobStepTaskTransfer.jobStepTaskNum}
                                                                            jobStepTaskTransfer={jobStepTaskTransfer}
                                                                           index={index}/>
                                        ))}
                                    </TableBody>

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskWorkerStore', 'jobStepTaskStore', 'jobStepStore', 'workStore', 'authStore')(
        observer(TableComponentModifyRow)
    )
);

