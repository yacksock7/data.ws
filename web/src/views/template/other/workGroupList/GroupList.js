import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkGroupStyle";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Tab,
    Button,
    IconButton,
    Tabs, ToggleButton, ToggleButtonGroup,
    Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, LinearProgress, TablePagination
} from "@mui/material";
import clsx from "clsx";
import { ReactComponent as ArrowUpIcon } from '../../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as TableArrowUp } from '../../../../common/images/TableArrowUp.svg';
import DashboardDetailTableRow from "../../../dashboard/detail/DashboardDetailTableRow";
import GroupListRow from "./GroupListRow";
// import ListTableRow from "./ListTableRow";


class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrow: false,
            state: '1',
            page: 0,
            rowsPerPage: 5,
            tableListDetail:[
                {
                    number: 10,
                    name: '작업 그룹에 대한 설명',
                    text: '저녁식사 메뉴 고르기 일상생활 20',
                    chip: '라벨링',
                    companion: 1,
                    complete: 6 ,
                    assignment: 7,
                    percent: 90,
                    state: '미완료',
                    date: '2023 02. 27 13:10',
                },
            ],
            tableList:[
                {
                    number: 10,
                    name: '{작업그룹에 대한 설명}',
                    text: '그룹 10',
                    chip: '라벨링',
                    companion: 1,
                    complete: 6 ,
                    assignment: 7,
                    percent: 90,
                    state: '미완료',
                    date: '2023 02. 27 13:10',
                },
                {
                    number: 9,
                    name: '{작업그룹에 대한 설명}',
                    text: '그룹 9',
                    chip: '녹음',
                    companion: 1,
                    complete: 6 ,
                    assignment: 7,
                    percent: 90,
                    state: '반려',
                    date: '2023 02. 27 13:10',
                },
                {
                    number: 8,
                    name: '{작업그룹에 대한 설명}',
                    text: '그룹 8',
                    chip: '검수',
                    companion: 1,
                    complete: 6 ,
                    assignment: 7,
                    percent: 90,
                    state: '진행전',
                    date: '2023 02. 27 13:10',
                },
                {
                    number: 7,
                    name: '{작업그룹에 대한 설명}',
                    text: '그룹 7',
                    chip: '교정',
                    companion: 1,
                    complete: 6 ,
                    assignment: 7,
                    percent: 90,
                    state: '완료',
                    date: '2023 02. 27 13:10',
                },
            ],
        }
    }

    handleClickArrow = () => {
        this.setState({arrow: !this.state.arrow});
    };

    handleChangeState = event => {
        this.setState({ state : event.target.value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    render() {
        const { classes, detail } = this.props;
        const { rowsPerPage, page } = this.state;

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableBox} sx={{marginTop: '15px'}}>
                    <Table aria-label="simple table">
                        <TableHead className={this.state.detailOpen ? classes.borderStyle : ''}>
                            <TableRow>
                                <TableCell align='center' width='5%'>
                                    번호
                                </TableCell>
                                <TableCell width='25%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>그룹 이름</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell align='left' width='25%'>
                                    설명
                                </TableCell>
                                <TableCell align='left' width='12%'>
                                    멤버
                                </TableCell>
                                <TableCell width='20%' colSpan={2}>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>등록일</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*<TableRow sx={{ '&:last-child .MuiTableCell-body': { border: '0px !important' } }}>*/}
                            {/*    <TableCell align='center'>*/}
                            {/*        10*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell>*/}
                            {/*        그룹 10*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell >*/}
                            {/*        작업 그룹에 대한 설명*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell >*/}
                            {/*        26*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell>*/}
                            {/*        2023. 03. 06 13:10*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell>*/}
                            {/*        그룹관리*/}
                            {/*    </TableCell>*/}
                            {/*</TableRow>*/}
                            {detail ?
                                this.state.tableListDetail.map((list, i) => (
                                    <GroupListRow key={i} list={list}/>
                                ))
                                :
                                this.state.tableList.map((list, i) => (
                                    <GroupListRow key={i} list={list}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={this.state.tableList.length}
                    page={page}
                    onPageChange={this.handleChangePage}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={'페이지당 행 수 :'}
                    SelectProps={{
                        IconComponent: ArrowDownIcon,
                        MenuProps: {
                            className:classes.selectPopover
                        }
                    }}
                    labelDisplayedRows={({ count, page }) => {
                        return <span className={classes.displayRow}><span>{page + 1}</span> / {Math.ceil(count / rowsPerPage)}</span>
                    }}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    className={classes.paginationBox}
                />
            </div>
        );
    }
};

export default withStyles(styles)(GroupList);