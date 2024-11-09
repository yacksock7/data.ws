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
    AvatarGroup, FormControl, Select
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


// import clsx from "clsx";
class TableComponentInspectionRow extends Component {
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

        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };


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
        const { jobId, jobStepNum } = this.props.jobStepTransfer;
        this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum);
    };


    render() {
        const { classes, jobStepTransfer, handleOpenDialog } = this.props;

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
                <TableRow className={clsx(classes.tableList, classes.tableHover)}>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>
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
                            <Box className={classes.uncompleted}><Typography>미완료</Typography></Box>
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
                    <TableCell style={{ padding: 0 }} colSpan={9} className={classes.toggleTable}>
                        <Collapse in={openTable} timeout="auto" unmountOnExit>
                            <Box>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{width: '3%', textAlign: 'center'}}></TableCell>
                                            <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px'}}>출발어</TableCell>
                                            <TableCell style={{width: '22%', textAlign: 'center'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '2%'}}></TableCell>
                                            <TableCell style={{width: '3%'}}></TableCell>
                                            <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px'}}>도착어</TableCell>
                                            <TableCell style={{width: '25%', textAlign: 'center'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '2%'}} style={{background: '#fff', borderBottom: '0px'}}></TableCell>
                                            <TableCell style={{width: '3%'}} style={{background: '#8059ac', borderBottom: '1px solid #8059ac'}}></TableCell>
                                            <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px', background: '#8059ac', borderBottom: '1px solid #8059ac'}}>교정어</TableCell>
                                            <TableCell style={{width: '28%', textAlign: 'center', background: '#8059ac', borderBottom: '1px solid #8059ac'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '4%', background: '#8059ac', borderBottom: '1px solid #8059ac'}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/*{row.history.map((historyRow, index) => (*/}
                                        {/*    <TableComponentInspectionRowDetail historyRow={historyRow} index={index}/>*/}
                                        {/*))}*/}
                                        {jobStepTaskTransfers.map((jobStepTaskTransfer, index) => (
                                            <TableComponentInspectionRowDetail key={'inspectionRowDetail'+jobStepTaskTransfer.jobStepTaskNum}  jobStepTransfer={jobStepTransfer} jobStepTaskTransfer={jobStepTaskTransfer} index={index} />
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
        observer(TableComponentInspectionRow)
    )
);

