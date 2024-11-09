import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkListStyle";
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
import WorkTableRow from "./WorkTableRow";
// import GroupListRow from "./GroupListRow";
// import ListTableRow from "./ListTableRow";


class WorkTable extends Component {
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
                    groupName: '작업그룹1',
                    name: '작업1',
                    text: '저녁식사 메뉴 고르기 일상생활 20',
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
                    groupName: '작업그룹2',
                    name: '작업1',
                    text: '저녁식사 메뉴 고르기 일상생활 20',
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
                    groupName: '작업그룹3',
                    name: '작업1',
                    text: '저녁식사 메뉴 고르기 일상생활 20',
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
                    groupName: '작업그룹4',
                    name: '작업1',
                    text: '저녁식사 메뉴 고르기 일상생활 20',
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
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead className={this.state.detailOpen ? classes.borderStyle : ''}>
                            <TableRow>
                                <TableCell align='center' width='5%'>번호</TableCell>
                                <TableCell width='8%'>작업 그룹명</TableCell>
                                <TableCell width='8%'>작업명</TableCell>
                                <TableCell width='22%'>일감명</TableCell>
                                <TableCell align='center' width='9%'>작업 단계</TableCell>
                                <TableCell align='center' width='9%'>반려 건수</TableCell>
                                <TableCell  width='18%'>작업 상태<span> (완료 건수/할당 건수)</span></TableCell>
                                <TableCell align='left' width='11%'>최근 작업상태</TableCell>
                                <TableCell width='20%' colSpan={2}>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>최근 작업일</Typography>
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
                            {detail ?
                                this.state.tableListDetail.map((list, i) => (
                                    <WorkTableRow key={i} list={list}/>
                                ))
                                :
                                this.state.tableList.map((list, i) => (
                                    <WorkTableRow key={i} list={list}/>
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

export default withStyles(styles)(WorkTable);