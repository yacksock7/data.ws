import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkGroupStyle";
import {
    Box, Button,
    LinearProgress,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {ReactComponent as TableUserGroup} from "../../../../common/images/TableUserGroup.svg";
import {ReactComponent as SettingsGroupIcon} from "../../../../common/images/SettingsGroupIcon.svg";
import ListTableRowDetail from "./GroupListRowDetail";
import clsx from "clsx";

class GroupListRow extends Component {
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
                    <TableCell>
                        <Button className={classes.buttonStyle} onClick={this.handleClickDetail} disableRipple>
                            {/*{this.state.detailOpen ?*/}
                            {/*    <TableRoundDown />*/}
                            {/*    :*/}
                            {/*    <TableRoundDown style={{transform: 'rotate( 180deg )'}}/>*/}
                            {/*}*/}
                            <Box sx={{border: '1px solid #cacaca', width: '38px', height: '38px', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', background: '#fff'}}><TableUserGroup/></Box>
                            <Typography>
                                {list.text}
                            </Typography>
                        </Button>
                    </TableCell>
                    <TableCell>{list.name}</TableCell>
                    <TableCell align='left'>{list.companion}</TableCell>
                    <TableCell>{list.date}</TableCell>
                    <TableCell>
                        <Button className={classes.groupManageBtn} disableRipple>
                            <SettingsGroupIcon/><Typography>그룹관리</Typography>
                        </Button>
                    </TableCell>
                    {/*<TableCell align='center'>*/}
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
                    {/*<TableCell>*/}
                    {/*    <Box display='flex' alignItems='center'>*/}
                    {/*        <Box className={classes.numberBox}>*/}
                    {/*            <Typography><span>{list.complete}</span>/{list.assignment}</Typography>*/}
                    {/*        </Box>*/}
                    {/*        <Box className={classes.progressBox}>*/}
                    {/*            <LinearProgress variant="determinate" value={list.percent} />*/}
                    {/*        </Box>*/}
                    {/*        <Typography className={classes.progressText}>{list.percent}%</Typography>*/}
                    {/*    </Box>*/}
                    {/*</TableCell>*/}
                    {/*<TableCell align='center'>*/}
                    {/*    <Box*/}
                    {/*        className={*/}
                    {/*            list.state === '반려' ?*/}
                    {/*                clsx(classes.chipBox, classes.chipBox2)*/}
                    {/*                :*/}
                    {/*                list.state === '완료' ?*/}
                    {/*                    clsx(classes.chipBox, classes.chipBox3)*/}
                    {/*                    :*/}
                    {/*                    list.state === '진행전' ?*/}
                    {/*                        clsx(classes.chipBox, classes.chipBox4)*/}
                    {/*                        :*/}
                    {/*                        classes.chipBox*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <Typography>{list.state}</Typography>*/}
                    {/*    </Box>*/}
                    {/*</TableCell>*/}

                </TableRow>
                <ListTableRowDetail open={this.state.detailOpen}/>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(GroupListRow);