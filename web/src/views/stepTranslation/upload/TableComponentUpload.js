import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Typography,
    FormControl,
    Select
} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from '../../../common/images/ArrowDownIcon.svg';
import {ReactComponent as ArrowUpIcon} from '../../../common/images/ArrowUpIcon.svg';
import {ReactComponent as PageRight} from '../../../common/images/PageRight.svg';
import {ReactComponent as PageLeft} from '../../../common/images/PageLeft.svg';
import {inject, observer} from "mobx-react";
import TableComponentUploadRow from "./TableComponentUploadRow";

// import clsx from "clsx";
class TableComponentUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            selected: false,
            open: false,
            openRows: {},
            openTable: false,
            count: ''
        };
    }




    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleChangePage = (newPage) => {
        const {jobStepTransfers, rowsPerPage} = this.props.jobStepStore;
        const totalPage = (jobStepTransfers.length / rowsPerPage) + 1;
        if (newPage >= 0 && newPage < totalPage) {
            this.props.jobStepStore.changePage(newPage);
        }
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    };

    handleChangeRowPerPage = (event) => {
        const rowsPerPage = parseInt(event.target.value);
        this.props.jobStepStore.changeRowsPerPage(rowsPerPage);
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    }

    render() {
        const {classes} = this.props;
        const {selected} = this.state;
        const {jobStepTransfers, page, rowsPerPage, totalCount} = this.props.jobStepStore;
        const totalPage = Math.floor((totalCount-1) / rowsPerPage) + 1;

        // console.log("111jobStepTransfers : ", jobStepTransfers);

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableWrap}>
                    <Table aria-label="collapsible table">
                        <TableHead className={classes.headTitle}>
                            <TableRow className={classes.tableList}>
                                {/*<TableCell />*/}

                                <TableCell style={{width: '9%', paddingLeft: '23px', paddingRight: 0,}}
                                           className={classes.toggleBtn}>
                                    <IconButton disableRipple onClick={this.handleToggle}>
                                        <Typography>번호</Typography> {selected ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                                    </IconButton>
                                </TableCell>

                                <TableCell style={{width: '45%'}} align="left">일감명</TableCell>

                                <TableCell style={{width: '12%'}} align="center">파일 형식</TableCell>

                                <TableCell style={{width: '13%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton disableRipple onClick={this.handleToggle}>
                                        <Typography>생성 일시</Typography> {selected ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                                    </IconButton>
                                </TableCell>

                                <TableCell style={{width: '12%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton disableRipple onClick={this.handleToggle}>
                                        <Typography>진행상태</Typography> {selected ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                                    </IconButton>
                                </TableCell>

                                <TableCell style={{width: '8%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton disableRipple onClick={this.handleToggle}>
                                        <Typography>작업자</Typography> {selected ? <ArrowDownIcon/> : <ArrowUpIcon/>}
                                    </IconButton>
                                </TableCell>

                                {/*<TableCell />*/}
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {jobStepTransfers.map(jobStepTransfer => (
                                <TableComponentUploadRow key={'uploadTable'+jobStepTransfer.jobId} jobStepTransfer={jobStepTransfer} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


                {/*Pagination*/}
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: 10,}}>
                    <Box className={classes.rowCount} style={{display: 'flex', alignItems: 'center',}}>
                        <Typography>페이지 당 수:</Typography>
                        <Box sx={{width: 45}}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={rowsPerPage}
                                    onChange={this.handleChangeRowPerPage}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={classes.paginationBtn} style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton disabled={page === 0}
                                    onClick={() => this.handleChangePage(page-1)} disableRipple>
                            <PageLeft/>
                        </IconButton >
                        <Box className={classes.pagiNumber}>
                            <Typography><span>{page+1}</span> / {totalPage}</Typography>
                        </Box>
                        <IconButton disabled={page+1 === totalPage}
                                    onClick={() => this.handleChangePage(page+1)} disableRipple>
                            <PageRight/>
                        </IconButton>
                    </Box>
                </Box>
                {/*Pagination*/}
            </div>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepStore', 'workStore', 'authStore')(
        observer(TableComponentUpload)
    )
);
