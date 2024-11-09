import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkGroupStyle";
import {
    Box, Collapse,
    Table,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography, LinearProgress
} from "@mui/material";
import clsx from "clsx";
import {ReactComponent as TableUserGroup} from "../../../../common/images/TableUserGroup.svg";
import { ReactComponent as ArrowUpIcon } from '../../../../common/images/ArrowUpIcon.svg';

import UserProfileImg from "../../../../common/images/UserProfileImg.png";
import LoginBackImage2 from "../../../../common/images/LoginBackImage2.png";
class GroupListRowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList:[
                {
                    number: 1,
                    workName: '한소희',
                    complete: 4,
                    assignment: 10,
                    percent: 30,
                    rejectNum: 1,
                    recentData: '2023. 03. 06 13:10',
                    name: '이름이름',
                    state:'미완료',
                    chip: '녹음',
                    email: 'akdfdfdj579@gmail.com',
                    date:'2023. 03. 06 13:10'
                },
                {
                    number: 1,
                    workName: '김김김',
                    complete: 4,
                    assignment: 10,
                    percent: 30,
                    rejectNum: 1,
                    recentData: '2023. 03. 06 13:10',
                    name: '이름이름',
                    state:'완료',
                    chip: '검수',
                    email: 'akdfdfdj579@gmail.com',
                    date:'2023. 03. 06 13:10'
                },
                {
                    number: 1,
                    workName: '이이이',
                    complete: 4,
                    assignment: 10,
                    percent: 30,
                    rejectNum: 1,
                    recentData: '2023. 03. 06 13:10',
                    name: '이름이름',
                    state:'반려',
                    chip: '라벨링',
                    email: 'akdfdfdj579@gmail.com',
                    date:'2023. 03. 06 13:10'
                },

            ]

        }
    }


    handleClickArrow = () => {
        this.setState({arrow: !this.state.arrow});
    };

    render() {
        const { classes, open } = this.props;

        return (
            <TableRow style={open ? {} : {display:'none'}} >
                <TableCell style={{ padding: 0,}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases" className={classes.tableBox}>
                            <TableHead>
                                <TableRow className={classes.textColor}>
                                    <TableCell align="center" width='5%'></TableCell>
                                    <TableCell align="center" width='7%'>
                                        <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                            <Typography className={classes.tableCellText}>작업 닉네임</Typography>
                                            {this.state.arrow ?
                                                <ArrowUpIcon />
                                                :
                                                <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                            }
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center" width='20%'>작업상태 <span>(완료 건수/할당 건수)</span></TableCell>
                                    <TableCell width='7%'>반려건수</TableCell>
                                    <TableCell align="left" width='12%'>
                                        <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                            <Typography className={classes.tableCellText}>최근 작업일</Typography>
                                            {this.state.arrow ?
                                                <ArrowUpIcon />
                                                :
                                                <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                            }
                                        </Button>
                                    </TableCell>
                                    <TableCell width='8%'>
                                        최근 작업상태
                                    </TableCell>
                                    <TableCell width='7%' sx={{borderRight: '5px solid #fff'}}/>
                                    <TableCell width='7%' align="center">
                                        <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                            <Typography className={classes.tableCellText}>성명</Typography>
                                            {this.state.arrow ?
                                                <ArrowUpIcon />
                                                :
                                                <ArrowUpIcon style={{transform: 'rotate( 180deg )'}}/>
                                            }
                                        </Button>
                                    </TableCell>
                                    <TableCell width='15%'>이메일</TableCell>
                                    <TableCell width='12%'>등록일</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{background: 'rgba(214, 231, 253, 0.5)'}}>
                                {this.state.tableList.map((list, i) => (
                                    <TableRow key={i} >
                                        <TableCell align="center">
                                            #{list.number}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{display: 'flex', alignItems: 'center',}}>
                                                <img src={UserProfileImg} alt='사용자 프로필' style={{width: '36px', height: '36px', border: '1px solid #fff', borderRadius: '100%'}}/>
                                                <Typography sx={{color: '#056cf2', marginLeft: '8px'}}>{list.workName}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box display='flex' alignItems='center' justifyContent='center'>
                                                <Box className={classes.numberBox}>
                                                    <Typography><span>{list.complete}</span>/{list.assignment}</Typography>
                                                </Box>
                                                <Box className={classes.progressBox}>
                                                    <LinearProgress variant="determinate" value={list.percent} />
                                                </Box>
                                                <Typography className={classes.progressText}>{list.percent}%</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {list.rejectNum}
                                        </TableCell>
                                        <TableCell align="left">
                                            {list.recentData}
                                        </TableCell>
                                        <TableCell align='left'>
                                            <Box sx={{marginRight: '5px'}}
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
                                                                list.state === '미완료' ?
                                                                    clsx(classes.chipBox, classes.chipBox5)
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
                                        </TableCell>
                                        {/*<TableCell>*/}
                                        {/*    <Box*/}
                                        {/*        className={*/}
                                        {/*            list.chip === '검수' ?*/}
                                        {/*                clsx(classes.squareChipBox, classes.squareChipBox2)*/}
                                        {/*                :*/}
                                        {/*                list.chip === '녹음' ?*/}
                                        {/*                    clsx(classes.squareChipBox, classes.squareChipBox3)*/}
                                        {/*                    :*/}
                                        {/*                    list.chip === '정제' ?*/}
                                        {/*                        clsx(classes.squareChipBox, classes.squareChipBox4)*/}
                                        {/*                        :*/}
                                        {/*                        list.chip === '교정' ?*/}
                                        {/*                            clsx(classes.squareChipBox, classes.squareChipBox5)*/}
                                        {/*                            :*/}
                                        {/*                            list.chip === '업로드' ?*/}
                                        {/*                                clsx(classes.squareChipBox, classes.squareChipBox6)*/}
                                        {/*                                :*/}
                                        {/*                                classes.squareChipBox*/}
                                        {/*        }*/}
                                        {/*    >*/}
                                        {/*        <Typography>{list.chip}</Typography>*/}
                                        {/*    </Box>*/}
                                        {/*</TableCell>*/}
                                        <TableCell width='80px' align="center" sx={{borderRight: '5px solid #fff'}}>
                                            <Button className={classes.detailListBtn} disableRipple>상세내역</Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            {list.name}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {list.email}
                                        </TableCell>
                                        <TableCell className={classes.dateText}>{list.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        );
    }
};

export default withStyles(styles)(GroupListRowDetail);