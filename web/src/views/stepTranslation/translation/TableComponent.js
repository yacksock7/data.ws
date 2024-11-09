import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
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
    FormControl, Select,

} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as PageRight } from '../../../common/images/PageRight.svg';
import { ReactComponent as PageLeft } from '../../../common/images/PageLeft.svg';
import TableComponentRow from "./TableComponentRow";
import {inject, observer} from "mobx-react";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openMenu: null
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



    handleChangePage = (newPage) => {
        const {jobStepTransfers, rowsPerPage} = this.props.jobStepStore;
        const totalPage = (jobStepTransfers.length / rowsPerPage) + 1;
        if (newPage >= 0 && newPage < totalPage) {
            this.props.jobStepStore.changePage(newPage);
        }
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    };
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    handleChangePage = (newPage) => {
        const {jobStepTransfers, rowsPerPage} = this.props.jobStepStore;
        const totalPage = (jobStepTransfers.length / rowsPerPage) + 1;
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



    render() {
        const { classes } = this.props;

        const { anchorEl, selected } = this.state;
        const open = Boolean(anchorEl);
        const {jobStepTransfers, page, rowsPerPage, totalCount} = this.props.jobStepStore;
        const totalPage = Math.floor((totalCount-1) / rowsPerPage) + 1;

        const rows = [
            {
                no : '10',
                title : '일감명 저녁식사 메뉴 고르기 일상생활 10',
                dueDate : '2023. 03. 06 13:10',
                countNo : '2',
                amountNo : '2',
                percent : '100%',
                history: [
                    {
                        no: '#1',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#1',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        currentStatus: '미완료',
                    },
                ],
            },
            {
                no : '9',
                title : '일감명 저녁식사 메뉴 고르기 일상생활 9',
                dueDate : '2023. 03. 06 13:10',
                countNo : '1',
                amountNo : '2',
                percent : '90%',
                history: [
                    {
                        no: '#1',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#1',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        currentStatus: '완료',
                    },
                    {
                        no: '#2',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#2',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer? Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?\n' +
                            'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer? Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        currentStatus: '미완료',
                    },
                ],
            },
        ];

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableWrap}>
                    <Table aria-label="collapsible table">
                        <TableHead className={classes.headTitle}>
                            <TableRow>
                                <TableCell style={{width: '9%', paddingLeft: '23px', paddingRight: 0,}} className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>번호</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '57%'}} align="left">일감명</TableCell>
                                <TableCell style={{width: '14%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton
                                        onClick={this.handleToggle}
                                        disableRipple>
                                        <Typography>완료일</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '20%'}} align="left" className={classes.toggleBtn} colSpan={3}>
                                    <IconButton
                                        onClick={this.handleToggle}
                                        disableRipple>
                                        <Typography>진행상태</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{rows.map((row) => (*/}
                            {/*    <TableComponentRow key={row.name} row={row} />*/}
                            {/*))}*/}
                            {jobStepTransfers.map((jobStepTransfer) => (
                                <TableComponentRow key={'correction'+jobStepTransfer.jobId} jobStepTransfer={jobStepTransfer} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/*Pagination*/}
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: 10,}}>
                    <Box className={classes.rowCount} style={{display: 'flex', alignItems: 'center',}}>
                        <Typography>페이지 당 수:</Typography>
                        <Box sx={{width: 45}}>
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
                            <PageLeft/>
                        </IconButton >
                        <Box className={classes.pagiNumber}>
                            <Typography><span>{page+1}</span> / {totalPage}</Typography>
                        </Box>
                        <IconButton disabled={page+1 === totalPage}
                                    onClick={() => this.handleChangePage(page+1)} disableRipple>
                            <PageRight/>
                        </IconButton>
                    </Box>
                </Box>
                {/*Pagination*/}
            </div>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepStore', 'workStore', 'authStore')(
        observer(TableComponent)
    )
);

