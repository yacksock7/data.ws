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
    Tabs,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    LinearProgress,
    TablePagination,
    MenuList, Popover
} from "@mui/material";
import clsx from "clsx";
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as TableArrowUp } from '../../../common/images/TableArrowUp.svg';
import { ReactComponent as TagBoxCloseIcon } from '../../../common/images/TagBoxCloseIcon.svg';
import { ReactComponent as TagBoxtopIcon } from '../../../common/images/TagBoxtopIcon.svg';
import ListTableRow from "./ListTableRow";


class ListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrow: false,
            state: '1',
            registrationAnchorEl: null,
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



    render() {
        const { classes } = this.props;
        const { rowsPerPage, page } = this.state;
        const { registrationAnchorEl, periodAnchorEl } = this.state;
        const registrationOpen = Boolean(registrationAnchorEl);

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
                            <TableRow sx={{ '&:last-child .MuiTableCell-body': { border: '0px !important' } }}>
                                <TableCell align='center'>
                                    10
                                </TableCell>
                                <TableCell>
                                    <Typography className={classes.tempalteName}>템플릿 이름</Typography>
                                </TableCell>
                                <TableCell >
                                    <Box className={classes.tagBox} sx={{ '&:last-child .MuiTableCell-body': { marginRight: '0px !important' }, display: 'flex', alignItems: 'center' }}>
                                        <Box className={clsx(classes.squareChipBox, classes.squareChipBox6)}><Typography>업로드</Typography></Box>
                                        <Box className={clsx(classes.squareChipBox, classes.squareChipBox3)}><Typography>녹음</Typography></Box>
                                        <Box className={clsx(classes.squareChipBox, classes.squareChipBox7)}><Typography>기계</Typography></Box>
                                        <Box className={classes.squareChipBox}><Typography>라벨링</Typography></Box>
                                        <Box className={clsx(classes.squareChipBox, classes.squareChipBox2)}><Typography>검수</Typography></Box>
                                        {/*<Box className={clsx(classes.squareChipBox, classes.squareChipBox5)}><Typography>교정</Typography></Box>*/}
                                        {/*<Box className={clsx(classes.squareChipBox, classes.squareChipBox4)}><Typography>추출</Typography></Box>*/}
                                        <IconButton onClick={this.handleClickRegistration} disableRipple>
                                            <TableArrowUp/>
                                        </IconButton>
                                        <Popover
                                            id="simple-popper"
                                            open={registrationOpen}
                                            anchorEl={registrationAnchorEl}
                                            onClose={this.handleClosePopover}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            className={classes.popoverBox}
                                        >
                                        <Box>

                                            <Box className={classes.TagBoxOuter}>
                                                <Box className={classes.TagBoxtopIcon}><TagBoxtopIcon/></Box>
                                                <Box className={classes.tagBoxCloseIcon}>
                                                    <IconButton disableRipple><TagBoxCloseIcon/></IconButton>
                                                </Box>
                                                <Box className={classes.tagBox}>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox6)}><Typography>업로드</Typography></Box>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox3)}><Typography>녹음</Typography></Box>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox7)}><Typography>기계</Typography></Box>
                                                    <Box className={classes.squareChipBox}><Typography>라벨링</Typography></Box>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox2)}><Typography>검수</Typography></Box>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox5)}><Typography>교정</Typography></Box>
                                                    <Box className={clsx(classes.squareChipBox, classes.squareChipBox4)}><Typography>추출</Typography></Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        </Popover>

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
                                <TableCell >
                                    <Box className={clsx(classes.chipBox, classes.chipBox2)}><Typography>반려</Typography></Box>
                                    {/*<Box className={clsx(classes.chipBox, classes.chipBox3)}><Typography>완료</Typography></Box>*/}
                                    {/*<Box className={clsx(classes.chipBox, classes.chipBox4)}><Typography>진행전</Typography></Box>*/}
                                    {/*<Box className={classes.chipBox}><Typography>진행중</Typography></Box>*/}
                                </TableCell>
                                <TableCell>
                                    2023. 03. 06 13:10
                                </TableCell>
                                <TableCell>
                                    2023. 03. 06 13:10
                                </TableCell>
                                <TableCell>
                                    빅베이직
                                </TableCell>
                                <TableCell>
                                    <Box>
                                        <Select
                                            value={this.state.state}
                                            onChange={this.handleChangeState}
                                            className={classes.selectBox}
                                            IconComponent={(props) => (
                                                <Box>
                                                    <ArrowDownIcon  {...props} />
                                                </Box>
                                            )}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "right"
                                                },
                                                transformOrigin:{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                },
                                                className:classes.selectPopover
                                            }}
                                        >
                                            <MenuItem value={1}>편집</MenuItem>
                                            <MenuItem value={2}>복제</MenuItem>
                                            <MenuItem value={3}>삭제</MenuItem>
                                        </Select>
                                    </Box>
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
            </div>
        );
    }
};

export default withStyles(styles)(ListTable);