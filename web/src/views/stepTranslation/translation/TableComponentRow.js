import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
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
    Typography,
    Button,
    Collapse,
    Slider, FormControl, Select,

} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as TableDotIcon } from '../../../common/images/TableDotIcon.svg';
import { ReactComponent as TableRoundUp } from '../../../common/images/TableRoundUp.svg';
import { ReactComponent as TableRoundDown } from '../../../common/images/TableRoundDown.svg';
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import { ReactComponent as MoreTextClose } from '../../../common/images/MoreTextClose.svg';
import { ReactComponent as PageRight } from '../../../common/images/PageRight.svg';
import { ReactComponent as PageLeft } from '../../../common/images/PageLeft.svg';
import clsx from "clsx";
import TableComponentRowDetail from "./TableComponentRowDetail";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";



// import clsx from "clsx";
class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openMenu: null,
            openTable : false
        };

    }

    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
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
        const {loginUser} = this.props.authStore
        this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
    }

    calcProgress = (taskStatusCount) => {
        const totalCount = taskStatusCount.totalCount;
        const completedCount = taskStatusCount.completedCount + taskStatusCount.acceptedCount;
        const percent = (completedCount / totalCount) * 100;
        return {totalCount, completedCount, percent}

    }

    render() {
        const { classes, jobStepTransfer } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { jobStepTaskTransfers } = this.props.jobStepTaskStore;
        const { selectedJobStepTransfer } =this.props.jobStepStore;
        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobStepTransfer.jobId
            && selectedJobStepTransfer.jobStepNum === jobStepTransfer.jobStepNum;

        const progress = this.calcProgress(jobStepTransfer.taskStatusCount);
        const updatedDatetime = dayjs(jobStepTransfer.updatedDatetime).format("YYYY-MM-DD hh:mm");
        return (
            <React.Fragment>
                <TableRow className={clsx(classes.tableList, classes.tableHover)}>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>{jobStepTransfer.jobId}</TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.titleWrap}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => this.setOpenTable()}
                            disableRipple>
                            {openTable ? <TableRoundDown /> : <TableRoundUp />}
                            <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                                {jobStepTransfer.job.name}
                            </Typography>
                        </IconButton>
                    </TableCell>
                    <TableCell align="left" className={classes.tableDueDate}>
                        <Typography>{updatedDatetime}</Typography>
                    </TableCell>
                    <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                        <Box className={classes.processBar}>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                        </Box>
                    </TableCell>
                    <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                        <Box className={classes.processNumbertWrap}>
                            <Typography className={classes.processNumber}><span>{progress.completedCount}</span>/{progress.totalCount}</Typography>
                        </Box>
                        <Box className={classes.processPercentWrap}>
                            <Typography>{progress.percent}%</Typography>
                        </Box>
                    </TableCell>
                    <TableCell align="left">
                        <IconButton id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={this.handleClick}
                                    disableRipple>
                            <TableDotIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={this.handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem >번역 다시 실행</MenuItem>
                        </Menu>
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
                                            <TableCell style={{width: '5%', textAlign: 'center', padding: '2.5px 0px'}}>출발어</TableCell>
                                            <TableCell style={{width: '32%', textAlign: 'center'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '3%'}}></TableCell>
                                            <TableCell style={{width: '3%'}}></TableCell>
                                            <TableCell style={{width: '5%', textAlign: 'center', padding: '2.5px 0px'}}>도착어</TableCell>
                                            <TableCell style={{width: '40%', textAlign: 'center'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            <TableCell style={{width: '7%'}}></TableCell>
                                            <TableCell style={{width: '2%'}}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {jobStepTaskTransfers.map((jobStepTaskTransfer, index) => (
                                          <TableComponentRowDetail key={'componentRowDetail'+jobStepTaskTransfer.jobStepTaskNum} jobStepTaskTransfer={jobStepTaskTransfer} index={index}/>
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
    inject('jobStepTaskStore', 'jobStepStore', 'workStore', 'authStore')(
        observer(TableComponent)
    )
);



