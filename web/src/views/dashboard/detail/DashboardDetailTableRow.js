import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardDetailTableStyle";
import {
    Box, Button,
    LinearProgress,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {ReactComponent as TableRoundDown} from "../../../common/images/TableRoundDown.svg";
import TableDetail from "./TableDetail";
import clsx from "clsx";

class DashboardDetailTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailOpen: false,
        }
    }

    handleClickDetail = () => {
        this.setState({detailOpen: !this.state.detailOpen});
    };

    render() {
        const { classes, list } = this.props;

        return (
            <React.Fragment>
                <TableRow sx={{ '&:last-child .MuiTableCell-body': { border: '0px !important' } }}  className={this.state.detailOpen ? classes.showBackground :''}>
                    <TableCell align='center'>{list.number}</TableCell>
                    <TableCell>{list.name}</TableCell>
                    <TableCell>
                        <Button className={classes.buttonStyle} onClick={this.handleClickDetail} disableRipple>
                            {this.state.detailOpen ?
                                <TableRoundDown />
                                :
                                <TableRoundDown style={{transform: 'rotate( 180deg )'}}/>
                            }
                            <Typography>
                                {list.text}
                            </Typography>
                        </Button>

                    </TableCell>
                    <TableCell align='center'>
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
                    <TableCell align='center'>{list.companion}</TableCell>
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
                    <TableCell>{list.date}</TableCell>
                </TableRow>
                <TableDetail open={this.state.detailOpen}/>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(DashboardDetailTableRow);