import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardDetailTableStyle";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import DashboardDetailTableRow from "./DashboardDetailTableRow";


class DashboardDetailTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrow: false,
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
            ]
        }
    }

    handleClickArrow = () => {
        this.setState({arrow: !this.state.arrow});
    };

    render() {
        const { classes, detail } = this.props;

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead className={this.state.detailOpen ? classes.borderStyle : ''}>
                            <TableRow>
                                <TableCell align='center' width='5%'>번호</TableCell>
                                <TableCell width='10%'>작업명</TableCell>
                                <TableCell width='25%'>일감명</TableCell>
                                <TableCell align='center' width='9%'>작업 단계</TableCell>
                                <TableCell align='center' width='10%'>반려 건수</TableCell>
                                <TableCell width='18%'>작업 상태<span> (완료 건수/할당 건수)</span></TableCell>
                                <TableCell align='center' width='10%'>최근 작업상태</TableCell>
                                <TableCell width='13%'>
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
                                    <DashboardDetailTableRow key={i} list={list}/>
                                ))
                                :
                                this.state.tableList.map((list, i) => (
                                    <DashboardDetailTableRow key={i} list={list}/>
                                ))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
};

export default withStyles(styles)(DashboardDetailTable);