import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardDetailInfoTableStyle";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ProfileTestImage from "../../../common/images/ProfileTestImage.jpeg";

class DashboardDetailInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width='20%' className={classes.padding}>작업 닉네임</TableCell>
                                <TableCell width='15%'>성명</TableCell>
                                <TableCell width='15%'>이메일</TableCell>
                                <TableCell align='center' width='10%'>성별</TableCell>
                                <TableCell width='10%'>생년월일</TableCell>
                                <TableCell width='15%'>소속</TableCell>
                                <TableCell width='15%'>가입일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child .MuiTableCell-body': { border: 0 } }}>
                                <TableCell className={classes.padding}>
                                    <Box display='flex' alignItems='center'>
                                        <Box className={classes.imageBox}>
                                            <img src={ProfileTestImage} alt='프로필 사진'/>
                                        </Box>
                                        <Typography className={classes.nameText}>이작업</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell >이최고</TableCell>
                                <TableCell >akdfdfdj579@gmail.com</TableCell>
                                <TableCell align='center'>여자</TableCell>
                                <TableCell >2000.02.06</TableCell>
                                <TableCell >(주)AI 연구 센터</TableCell>
                                <TableCell >2023. 03. 06 12:16</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
};

export default withStyles(styles)(DashboardDetailInfoTable);