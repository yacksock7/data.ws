import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BuildTemplateStyle";
import clsx from "clsx";
import dayjs from "dayjs";

import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as TableArrowUp } from '../../../common/images/TableArrowUp.svg';

import {
    Box,
    MenuItem,
    Select,
    Button,
    IconButton,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    TablePagination,
} from "@mui/material";
import {TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";


class TemplateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrow: false,
            state: '1',
            registrationAnchorEl: null,
            page: 0,
            rowsPerPage: 5,
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


    handleClickRegistration = event => {
        this.setState({
            registrationAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            registrationAnchorEl: null,
            periodAnchorEl: null,
        });
    };

    getTemplateStepLabel = (stepType) => {
        const { classes } = this.props;

        switch (stepType) {
            case TemplateStepType.Upload :  return clsx(classes.squareChipBox, classes.squareChipBox6);
            case TemplateStepType.Recording :  return clsx(classes.squareChipBox, classes.squareChipBox3);
            case TemplateStepType.Machine :  return clsx(classes.squareChipBox, classes.squareChipBox7);
            case TemplateStepType.Labeling :  return clsx(classes.squareChipBox);
            case TemplateStepType.Inspection :  return clsx(classes.squareChipBox, classes.squareChipBox2);
            case TemplateStepType.Editing :  return clsx(classes.squareChipBox, classes.squareChipBox5);
            case TemplateStepType.Export :  return clsx(classes.squareChipBox, classes.squareChipBox4);
            default: return {};
        }
    }



    render() {
        const { classes, templates } = this.props;
        const { rowsPerPage, page, arrow, state } = this.state;

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableBox}>
                    <Table aria-label="simple table">
                        <TableHead className={this.state.detailOpen ? classes.borderStyle : ''}>
                            <TableRow>
                                <TableCell align='center' width='8%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>번호</Typography>
                                        <ArrowUpIcon style={arrow ? {} : {transform: 'rotate( 180deg )'}}/>
                                    </Button>
                                </TableCell>

                                <TableCell width='17%'>
                                    템플릿 이름
                                </TableCell>

                                <TableCell align='left' width='26%'>
                                    포함된 단계
                                </TableCell>

                                <TableCell align='left' width='15%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}> 수정일 </Typography>
                                            <ArrowUpIcon style={arrow ? {} : {transform: 'rotate( 180deg )'}}/>
                                    </Button>
                                </TableCell>

                                <TableCell align='left' width='15%'>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}> 등록일 </Typography>
                                            <ArrowUpIcon style={arrow ? {} : {transform: 'rotate( 180deg )'}}/>
                                    </Button>
                                </TableCell>

                                <TableCell width='19%' colSpan={2}>
                                    <Button className={classes.arrowButton} onClick={this.handleClickArrow} disableRipple>
                                        <Typography className={classes.tableCellText}>등록자</Typography>
                                            <ArrowUpIcon style={ arrow ? {} : {transform: 'rotate( 180deg )'}}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {templates.map(template => {
                                return <TableRow sx={{ '&:last-child .MuiTableCell-body': { border: '0px !important' } }}>
                                    <TableCell align='center'>
                                        {template.id}
                                    </TableCell>
                                    <TableCell>
                                        <Typography className={classes.tempalteName}>
                                            {template.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Box className={classes.tagBox} sx={{ '&:last-child .MuiTableCell-body': { marginRight: '0px !important' }, display: 'flex', alignItems: 'center' }}>
                                            {template.templateStepTypes.map(stepType => {
                                                return  <Box className={this.getTemplateStepLabel(stepType)}><Typography> {TemplateStepTypeLabel[stepType]} </Typography></Box>
                                            })}
                                            <IconButton onClick={this.handleClickRegistration} disableRipple>
                                                <TableArrowUp/>
                                            </IconButton>
                                            {/*<Popover id="simple-popper"*/}
                                            {/*         className={classes.popoverBox}*/}
                                            {/*         open={registrationOpen}*/}
                                            {/*         anchorEl={registrationAnchorEl}*/}
                                            {/*         anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}*/}
                                            {/*         transformOrigin={{vertical: 'top', horizontal: 'right'}}*/}
                                            {/*         onClose={this.handleClosePopover}>*/}
                                            {/*    <Box>*/}
                                            {/*        <Box className={classes.TagBoxOuter}>*/}
                                            {/*            <Box className={classes.TagBoxtopIcon}><TagBoxtopIcon/></Box>*/}
                                            {/*            <Box className={classes.tagBoxCloseIcon}><IconButton disableRipple><TagBoxCloseIcon/></IconButton></Box>*/}

                                            {/*            <Box className={classes.tagBox}>*/}
                                            {/*                {template.templateStepTypes.map(stepType => {*/}
                                            {/*                    return  <Box className={this.getTemplateStepLabel(stepType)}><Typography> {TemplateStepTypeLabel[stepType]} </Typography></Box>*/}
                                            {/*                })}*/}
                                            {/*            </Box>*/}
                                            {/*        </Box>*/}
                                            {/*    </Box>*/}
                                            {/*</Popover>*/}

                                            {/*<Box sx={{position: 'relative'}}>*/}
                                            {/*    <IconButton disableRipple>*/}
                                            {/*        <TableArrowUp/>*/}
                                            {/*    </IconButton>*/}
                                            {/*    <Box sx={{position: 'absolute', zIndex: 999, background: '#fff', top: '30px', height: '40px', border: '1px solid #000'}}>*/}
                                            {/*        <Box className={clsx(classes.squareChipBox, classes.squareChipBox6)}><Typography>업로드</Typography></Box>*/}
                                            {/*        <Box className={clsx(classes.squareChipBox, classes.squareChipBox3)}><Typography>녹음</Typography></Box>*/}
                                            {/*    </Box>*/}
                                            {/*</Box>*/}

                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(template.updatedDatetime).format("YYYY. MM. DD hh:mm")}
                                    </TableCell>
                                    <TableCell>
                                        {dayjs(template.createdDatetime).format("YYYY. MM. DD hh:mm")}
                                    </TableCell>

                                    <TableCell>
                                        {template.userNickname}
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Select className={classes.selectBox}
                                                    value={state}
                                                    onChange={this.handleChangeState}
                                                    IconComponent={(props) => (<Box><ArrowDownIcon  {...props} /></Box>)}
                                                    MenuProps={{
                                                        className:classes.selectPopover,
                                                        anchorOrigin: {vertical: "bottom", horizontal: "right"},
                                                        transformOrigin:{vertical: 'top', horizontal: 'right',}
                                                    }}>
                                                <MenuItem value={1}>편집</MenuItem>
                                                <MenuItem value={2}>복제</MenuItem>
                                                <MenuItem value={3}>삭제</MenuItem>
                                            </Select>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={templates.length}
                    page={page}
                    onPageChange={this.handleChangePage}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage={'페이지당 행 수 :'}
                    SelectProps={{
                        IconComponent: ArrowDownIcon,
                        MenuProps: {className:classes.selectPopover}
                    }}
                    labelDisplayedRows={({ count, page }) => {
                        return <span className={classes.displayRow}><span>{page + 1}</span> / {Math.ceil(count / rowsPerPage)}</span>
                    }}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    className={classes.paginationBox}/>
            </div>
        );
    }
};

export default withStyles(styles)(TemplateList);