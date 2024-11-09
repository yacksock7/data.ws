import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TaskListStyle";
import {
    Box, Button,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import ProfileTestImage from "../../../../common/images/ProfileTestImage.jpeg";
import { ReactComponent as ArrowDownIcon } from '../../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../../common/images/ArrowUpIcon.svg';
import clsx from "clsx";
import {Link} from "react-router-dom";

class TaskTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrow: false,
            arrow2: false,
            arrow3: false,
            tableList:[
                {
                    number: 10,
                    profile:ProfileTestImage,
                    nickname: '템플릿',
                    complete: 9 ,
                    assignment: 10,
                    percent: 90,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '미완료',
                    chip: '라벨링',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579akdfdfdj579akdfdfdj579akdfdfdj579@gmail.com'
                },
                {
                    number: 9,
                    profile:ProfileTestImage,
                    nickname: '김희선',
                    complete: 0 ,
                    assignment: 0,
                    percent: 0,
                    companion: 0,
                    date: '2023 02. 27 13:10',
                    state: '미완료',
                    chip: '검수',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 8,
                    profile:ProfileTestImage,
                    nickname: '김대호',
                    complete: 90 ,
                    assignment: 100,
                    percent: 90,
                    companion: 10,
                    date: '2023 02. 27 13:10',
                    state: '반려',
                    chip: '녹음',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 7,
                    profile:ProfileTestImage,
                    nickname: '변요한',
                    complete: 40,
                    assignment: 100,
                    percent: 40,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '정제',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 6,
                    profile:ProfileTestImage,
                    nickname: '송혜교',
                    complete: 50,
                    assignment: 100,
                    percent: 50,
                    companion: 10,
                    date: '2023 02. 27 13:10',
                    state: '진행전',
                    chip: '교정',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },

                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },

                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
                {
                    number: 5,
                    profile:ProfileTestImage,
                    nickname: '이하나',
                    complete: 20,
                    assignment: 100,
                    percent: 20,
                    companion: 1,
                    date: '2023 02. 27 13:10',
                    state: '완료',
                    chip: '업로드',
                    group: '그룹 2+',
                    name: '김아무개',
                    email: 'akdfdfdj579@gmail.com'
                },
            ],
            page: 0,
            rowsPerPage: 5,

        }
    }

    handleClickArrow = () => {
        this.setState({arrow: !this.state.arrow});
    };

    handleClickArrow2 = () => {
        this.setState({arrow2: !this.state.arrow2});
    };

    handleClickArrow3 = () => {
        this.setState({arrow3: !this.state.arrow3});
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { rowsPerPage, page } = this.state;

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' width='5%'>번호</TableCell>
                                <TableCell width='10%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>작업 닉네임</Typography>
                                        {this.state.arrow ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='17%'>작업 상태<span> (완료 건수/할당 건수)</span></TableCell>
                                <TableCell width='6%'>반려 건수</TableCell>
                                <TableCell width='10%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow2} disableRipple>
                                        <Typography className={classes.tableCellText}>최근 작업일</Typography>
                                        {this.state.arrow2 ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='9%' >최근 작업 상태</TableCell>
                                <TableCell width='8%' align="center" className={classes.tableBorderRight}></TableCell>
                                <TableCell width='8%' align="center">작업 그룹</TableCell>
                                <TableCell width='8%' align="center">
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow3} disableRipple>
                                        <Typography className={classes.tableCellText}>성명</Typography>
                                        {this.state.arrow3 ?
                                            <ArrowUpIcon />
                                            :
                                            <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                        }
                                    </Button>
                                </TableCell>
                                <TableCell width='13%'>이메일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.tableList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((list, i) => (
                                <TableRow key={i} sx={{ '&:last-child .MuiTableCell-body': { border: 0 } }}>
                                    <TableCell align='center'>{list.number}</TableCell>
                                    <TableCell>
                                        <Box display='flex' alignItems='center'>
                                            <Box className={classes.imageBox}>
                                                <img src={list.profile} alt='프로필 사진'/>
                                            </Box>
                                            <Typography className={classes.nameText}>{list.nickname}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display='flex' alignItems='center'>
                                            <Box className={classes.numberBox}>
                                                <Typography><span>{list.complete}</span>/{list.assignment}</Typography>
                                            </Box>
                                            <Box className={classes.progressBox}>
                                                <LinearProgress variant="determinate" value={list.percent} />
                                            </Box>
                                            <Typography className={classes.progressText}>{list.percent}%</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell style={list.companion === 10 ? {color: '#d91e50'} : {}}>
                                        {list.companion}
                                    </TableCell>
                                    <TableCell>{list.date}</TableCell>
                                    <TableCell>
                                        <Box display='flex' alignItems='center'>
                                            <Box
                                                className={
                                                    list.state === '반려' ?
                                                        clsx(classes.chipBox, classes.chipBox2)
                                                        :
                                                        list.state === '완료' ?
                                                            clsx(classes.chipBox, classes.chipBox3)
                                                            :
                                                            list.state === '진행전' ?
                                                                clsx(classes.chipBox, classes.chipBox4)
                                                                :
                                                                classes.chipBox
                                                }
                                            >
                                                <Typography>{list.state}</Typography>
                                            </Box>
                                            <Box
                                                className={
                                                    list.chip === '검수' ?
                                                        clsx(classes.squareChipBox, classes.squareChipBox2)
                                                        :
                                                        list.chip === '녹음' ?
                                                            clsx(classes.squareChipBox, classes.squareChipBox3)
                                                            :
                                                            list.chip === '정제' ?
                                                                clsx(classes.squareChipBox, classes.squareChipBox4)
                                                                :
                                                                list.chip === '교정' ?
                                                                    clsx(classes.squareChipBox, classes.squareChipBox5)
                                                                    :
                                                                    list.chip === '업로드' ?
                                                                        clsx(classes.squareChipBox, classes.squareChipBox6)
                                                                        :
                                                                        classes.squareChipBox
                                                }
                                            >
                                                <Typography>{list.chip}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" className={classes.tableBorderRight}>
                                        <Link to="/template" className={classes.underline}>
                                            <Button className={classes.detailbuttonStyle} disableRipple>상세 내역</Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center"><Typography className={classes.groupText}>{list.group}</Typography></TableCell>
                                    <TableCell align="center">{list.name}</TableCell>
                                    <TableCell>{list.email}</TableCell>
                                </TableRow>
                            ))}
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

export default withStyles(styles)(TaskTable);