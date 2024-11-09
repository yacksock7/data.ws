import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import { makeStyles } from '@mui/styles';
import {
    Box,
    Paper,
    TablePagination,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Menu,
    Checkbox,
    Typography,
    Button,
    Collapse,
    Stack, Avatar,
    FormControlLabel,
    AvatarGroup, FormControl, Select, Popover
} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as TableDotIcon } from '../../../common/images/TableDotIcon.svg';
import { ReactComponent as TableRoundUp } from '../../../common/images/TableRoundUp.svg';
import { ReactComponent as TableRoundDown } from '../../../common/images/TableRoundDown.svg';
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import { ReactComponent as ArrangeUser } from '../../../common/images/ArrangeUser.svg';
import { ReactComponent as UnCheckedBox } from '../../../common/images/UnCheckedBox.svg';
import { ReactComponent as CheckedBox } from '../../../common/images/CheckedBox.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import { ReactComponent as RemoveFile } from '../../../common/images/RemoveFile.svg';
import { ReactComponent as ExtensionDateIcon } from '../../../common/images/ExtensionDateIcon.svg';
import { ReactComponent as MoreTextClose } from '../../../common/images/MoreTextClose.svg';
import { ReactComponent as PageRight } from '../../../common/images/PageRight.svg';
import { ReactComponent as PageLeft } from '../../../common/images/PageLeft.svg';
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import AdminAvatar2 from "../../../common/images/AdminAvatar2.png";
import TableComponentInspectionRowDetail from "./TableComponentInspectionRowDetail";
import {inject, observer} from "mobx-react";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import TableComponentModifyRowDetail from "../correction/TableComponentModifyRowDetail";
import dayjs from "dayjs";
import {ReactComponent as SmallRecIcon} from "../../../common/images/SmallRecIcon.svg";
import {ReactComponent as SmallMachineIcon} from "../../../common/images/SmallMachineIcon.svg";
import {ReactComponent as SmallLabelingIcon} from "../../../common/images/SmallLabelingIcon.svg";
import {ReactComponent as SmallCorrectionIcon} from "../../../common/images/SmallCorrectionIcon.svg";
import {ReactComponent as SmallSwapIcon} from "../../../common/images/SmallSwapIcon.svg";


// import clsx from "clsx";
class TableComponentInspectionRow_Back extends Component {
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
            approvalBtn: false
        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleClickApprovalBtn = () => {
        this.setState({
            approvalBtn: !this.state.approvalBtn
        });
    };

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClickHistoryAnchorEl = (event) => {
        event.stopPropagation();
        this.setState({
            historyAnchorEl: event.currentTarget
        });
    };

    handleClose = (event) => {
        event.stopPropagation();
        this.setState({
            anchorEl: null,
            historyAnchorEl: null,
        });
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

    setOpenTable = () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        const {loginUser} = this.props.authStore;
        this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
    }

    handleCheck = () => {
        const { jobId, jobStepNum } = this.props.jobStepTransfer;
        this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum);
    };


    render() {
        const { classes, jobStepTransfer, handleOpenDialog } = this.props;
        const { historyAnchorEl } = this.state;
        const historyOpen = Boolean(historyAnchorEl);
        const { jobStepTaskTransfers } = this.props.jobStepTaskStore;
        const { checkedJobStepIds, selectedWorkers } = this.props.jobStepTaskWorkerStore;
        const { selectedJobStepTransfer } = this.props.jobStepStore;

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
        const createdDatetime = dayjs(jobStepTransfer.createdDatetime).format("YYYY-MM-DD hh:mm");

        return (
            <React.Fragment>
                <TableRow className={clsx(classes.tableList, classes.tableHover)} style={openTable ? {background: '#d6e7fd'} : {}}>
                    <TableCell
                        align="left"
                        style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}
                    >
                        <Box  className={classes.CheckboxStyle}>
                            <Checkbox
                                onClick={this.handleCheck}
                                checked={!!isChecked}
                                icon={<UnCheckedBox />}
                                checkedIcon={<CheckedBox />}
                                disableRipple
                            />
                            <Typography>{jobStepTransfer.jobId}</Typography>
                        </Box>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.titleWrap}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={this.setOpenTable}
                            disableRipple
                        >
                            {openTable ? <TableRoundDown /> : <TableRoundUp />}
                            <Typography
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    textAlign: "left",
                                }}
                            >
                                {jobStepTransfer.job.name}
                            </Typography>
                        </IconButton>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.tableDueDate}>
                        <Typography>{createdDatetime}</Typography>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                        {(jobStepTransfer.status === JobTaskStatus.Assigned
                            || jobStepTransfer.status === JobTaskStatus.Created) && (
                                <Box display='flex' alignItems='center'>
                                    <Box className={classes.uncompleted}>
                                        <Typography>미완료</Typography>
                                    </Box>
                                    <Button onClick={this.handleClickApprovalBtn} className={classes.buttonStyle2} disableRipple>
                                        {this.state.approvalBtn ?
                                            '일괄 취소'
                                            :
                                            '일괄 승인'
                                        }

                                    </Button>
                                </Box>

                        )}
                        {jobStepTransfer.status === JobTaskStatus.Completed && (
                            <Box className={clsx(classes.completed, classes.uncompleted)}><Typography>완료</Typography></Box>
                        )}
                        {jobStepTransfer.status === JobTaskStatus.Rejected &&  (
                            <Box className={clsx(classes.rejectTag, classes.uncompleted)}><Typography>반려</Typography></Box>
                        )}
                        {/*{row.currentStatus === '마감' && (*/}
                        {/*    <>*/}
                        {/*        <Box className={clsx(classes.extension, classes.uncompleted)} style={{marginTop: '-4px'}}><Typography>{row.currentStatus}</Typography></Box>*/}
                        {/*        <Box className={classes.extensionDueDate}><Button disableRipple style={{marginLeft: '3px'}}>+ 기한 연장</Button></Box>*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </TableCell>
                    <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                        {jobStepTransfer.status === JobTaskStatus.Created ? (
                            <Box className={classes.ArrangeUserBtn}>
                                <Button onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Completed)}
                                        disableRipple>
                                    <ArrangeUser /> <Typography>배정</Typography>
                                </Button>
                            </Box>
                        ) : (
                            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                {workers.length > 1 ? (
                                    <AvatarGroup total={workers.length-1}
                                                 max={5}
                                                 sx={{ flexDirection: 'row' }}
                                                 onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Assigned)}
                                                 className={classes.avatarBox}>
                                        <Avatar>{workers.length}</Avatar>
                                        {workers.map((e, i) => (
                                            i < 3 && <TableUserAvatar />
                                        ))}
                                    </AvatarGroup>
                                ) : (
                                    <Stack className={classes.avatarBox}
                                           onClick={() => handleOpenDialog(jobStepTransfer, JobTaskStatus.Assigned)}>
                                        <Avatar>
                                            {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                            {/*{AdminAvatar ? <img src={AdminAvatar} /> : <TableUserAvatar />}*/}
                                            <TableUserAvatar />
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
                    <TableCell style={{ padding: 0 }} colSpan={9} className={clsx(classes.toggleTable, classes.toggleTable2)}>
                        <Collapse in={openTable} timeout="auto" unmountOnExit>
                            <Box>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' style={{width: 41, boxSizing: 'border-box', padding: '11px 5px'}}></TableCell>
                                            <TableCell align='center' style={{width: 67, boxSizing: 'border-box', padding: '11px 5px'}}>출발어</TableCell>
                                            <TableCell align='left' style={{width: 'calc(100% - 108px)', padding: '11px 11px 11px 160px', boxSizing: 'border-box'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* 2023.5.15 수정된 테이블*/}
                                        <TableRow onClick={this.handleClickDetailOpen} style={{cursor:'pointer', background: 'rgba(221, 236, 255, 0.5)'}}>
                                            <TableCell align='center' style={{width: 41, boxSizing: 'border-box', padding: '2.5px 5px'}}>
                                                #1
                                            </TableCell>
                                            <TableCell align='center' style={{width: 67, boxSizing: 'border-box', padding: '2.5px 5px'}}>
                                                KO
                                            </TableCell>
                                            <TableCell style={{width: 'calc(100% - 108px)', padding: '2.5px 5px', boxSizing: 'border-box'}}>
                                                <Box display='flex' justifyContent='space-between' alignItems='center'>
                                                    <Typography>
                                                        그럼 저녁메뉴는 김치볶음밥으로 하자. 냉동실에 치즈 남은거 있어?
                                                    </Typography>
                                                    <Box display='flex' alignItems='center'>
                                                        <Button onClick={this.handleClickHistoryAnchorEl} className={classes.historyButton} disableRipple>
                                                            {historyOpen ?
                                                                <ArrowDownIcon style={{transform: 'scaleY(-1)'}}/>
                                                                :
                                                                <ArrowDownIcon />
                                                            }

                                                            <Typography>이전 작업 이력 보기</Typography>
                                                        </Button>
                                                        <Box className={classes.lineStyle}/>
                                                        <Box className={classes.stateBox}/>
                                                        <Box className={classes.ArrangeUserBtn}>
                                                            <Button disableRipple>
                                                                <ArrangeUser />
                                                                <Typography>배정</Typography>
                                                            </Button>
                                                        </Box>

                                                        <Popover
                                                            id="simple-popper"
                                                            open={historyOpen}
                                                            anchorEl={historyAnchorEl}
                                                            onClose={this.handleClose}
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
                                                                <Typography>이전 작업 이력 보기</Typography>
                                                                <Box display='flex' alignItems='center'>
                                                                    <SmallRecIcon/>
                                                                    <SmallMachineIcon/>
                                                                    <SmallLabelingIcon/>
                                                                    <SmallCorrectionIcon/>
                                                                    <SmallSwapIcon/>
                                                                </Box>
                                                            </Box>
                                                        </Popover>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableComponentInspectionRowDetail open={this.state.detailOpen}/>
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
        observer(TableComponentInspectionRow_Back)
    )
);

