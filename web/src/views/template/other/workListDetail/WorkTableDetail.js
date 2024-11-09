import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkListDetailStyle";
import {
    Box, Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import clsx from "clsx";

class WorkTableDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableList:[
                {number: 1, language: 'KO', text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어? 템플릿상세', state:'미완료', date:'2023. 03. 06 13:10'},
                {number: 2, language: 'KO', text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어? 템플릿상세', state:'반려', date:'2023. 03. 06 13:10'},
                {number: 3, language: 'KO', text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어? 템플릿상세', state:'완료', date:'2023. 03. 06 13:10'},
                {number: 4, language: 'KO', text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어? 템플릿상세', state:'진행전', date:'2023. 03. 06 13:10'},
                {number: 5, language: 'KO', text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어? 템플릿상세', state:'미완료', date:'2023. 03. 06 13:10'},
            ]

        }
    }

    render() {
        const { classes, open } = this.props;

        return (
            <TableRow style={open ? {} : {display:'none'}} >
                <TableCell style={{ padding: 0,}} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases" className={classes.tableBox}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" width='5%'></TableCell>
                                    <TableCell align="center" width='5%'>출발어</TableCell>
                                    <TableCell width='59%'>작업 결과물</TableCell>
                                    <TableCell align="center" width='11%'></TableCell>
                                    <TableCell width='20%'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.tableList.map((list, i) => (
                                    <TableRow key={i} >
                                        <TableCell align="center">
                                            #{list.number}
                                        </TableCell>
                                        <TableCell align='center'>{list.language}</TableCell>
                                        <TableCell>
                                            {list.text}
                                        </TableCell>
                                        <TableCell align='center'>
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

export default withStyles(styles)(WorkTableDetail);