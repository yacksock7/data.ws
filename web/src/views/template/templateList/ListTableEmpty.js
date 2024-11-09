import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BuildTemplateStyle";
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
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as EmptySelect } from '../../../common/images/EmptySelect.svg';
import { ReactComponent as EmptyState } from '../../../common/images/EmptyState.svg';
import { ReactComponent as EmptyTag } from '../../../common/images/EmptyTag.svg';
import { ReactComponent as TableArrowUp } from '../../../common/images/TableArrowUp.svg';
import ListTableRow from "./ListTableRow";


class ListTableEmpty extends Component {
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
            ],
            tableList:[
                {
                    number: 10,
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
                    name: '작업2',
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
                    name: '작업3',
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
                    name: '작업4',
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
        const { classes } = this.props;
        const { rowsPerPage, page } = this.state;

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead className={this.state.detailOpen ? classes.borderStyle : ''}>
                            <TableRow>
                                <TableCell align='center' width='5%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>번호</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='26%'>
                                    템플릿 이름
                                </TableCell>
                                <TableCell align='left' width='18%'>
                                    포함된 단계
                                </TableCell>
                                <TableCell align='left' width='12%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>현재 진행상태</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='12%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>최근 수정일</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell align='left' width='12%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>등록일</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='15%' colSpan={2}>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>등록자</Typography>
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
                            <TableRow sx={{ '&:last-child .MuiTableCell-body': { border: '0px !important' } }} className={classes.emptyBox}>
                                <TableCell align='center'>
                                    <Box sx={{width: '24px', height: '18px', background: '#d9d9d9', borderRadius: '99px', marginLeft: '12px'}}/>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{width: '238px', height: '18px', background: '#d9d9d9', borderRadius: '99px'}}/>
                                </TableCell>
                                <TableCell >
                                    <EmptyTag/>
                                </TableCell>
                                <TableCell >
                                    <EmptyState/>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{width: '134px', height: '18px', background: '#d9d9d9', borderRadius: '99px'}}/>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{width: '134px', height: '18px', background: '#d9d9d9', borderRadius: '99px'}}/>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{width: '68px', height: '18px', background: '#d9d9d9', borderRadius: '99px'}}/>
                                </TableCell>
                                <TableCell>
                                    <EmptySelect/>
                                </TableCell>
                            </TableRow>

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



                <Typography className={classes.emptyText}>등록된 템플릿이 없습니다. ‘템플릿 만들기' 버튼을 눌러 신규 생성해보세요.</Typography>

            </div>
        );
    }
};

export default withStyles(styles)(ListTableEmpty);