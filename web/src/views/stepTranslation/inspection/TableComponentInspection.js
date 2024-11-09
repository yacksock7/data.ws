import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import { makeStyles } from '@mui/styles';
import {
    Box,
    Paper,
    TablePagination,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Menu,
    Checkbox,
    Typography,
    Button,
    Collapse,
    Stack, Avatar,
    FormControlLabel,
    AvatarGroup, FormControl, Select
} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import { ReactComponent as ArrowUpIcon } from '../../../common/images/ArrowUpIcon.svg';
import { ReactComponent as TableDotIcon } from '../../../common/images/TableDotIcon.svg';
import { ReactComponent as TableRoundUp } from '../../../common/images/TableRoundUp.svg';
import { ReactComponent as TableRoundDown } from '../../../common/images/TableRoundDown.svg';
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import { ReactComponent as ArrangeUser } from '../../../common/images/ArrangeUser.svg';
import { ReactComponent as UnCheckedBox } from '../../../common/images/UnCheckedBox.svg';
import { ReactComponent as CheckedBox } from '../../../common/images/CheckedBox.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import { ReactComponent as RemoveFile } from '../../../common/images/RemoveFile.svg';
import { ReactComponent as ExtensionDateIcon } from '../../../common/images/ExtensionDateIcon.svg';
import { ReactComponent as MoreTextClose } from '../../../common/images/MoreTextClose.svg';
import { ReactComponent as PageRight } from '../../../common/images/PageRight.svg';
import { ReactComponent as PageLeft } from '../../../common/images/PageLeft.svg';
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import AdminAvatar2 from "../../../common/images/AdminAvatar2.png";
import TableComponentInspectionRow from "./TableComponentInspectionRow";
import CommonDialog from "../../dialog/CommonDialog";
import {TemplateStepTypeLabel} from "../../../stores/TemplateStore";
import WorkersAssignment from "../../../components/WorkersAssignment";
import {inject, observer} from "mobx-react";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import TableComponentModifyRow from "../correction/TableComponentModifyRow";


// import clsx from "clsx";
class TableComponentInspection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openRows: {},
            openTable : false,
            allChecked: false,
            checked: [true, false],
            workerDialogOpen: false,
            count: ''
        }
    }


    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };


     handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
     handleClose = () => {
         this.setState({
             anchorEl: null,
         });
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
            workerDialogOpen: false,
        });
    };

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            count: event.target.value
        });
    }




    saveJobStepTaskWorkers = async () => {
        await this.props.jobStepTaskWorkerStore.createJobStepTaskWorkers();
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
        this.handleCloseDialog();
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

    handleOpenDialog = (jobStepTransfer, state) => {
        const {jobId, jobStepNum} =  jobStepTransfer;
        if (state === JobTaskStatus.Assigned) {
            this.props.jobStepTaskWorkerStore.getJobStepTaskWorkers(jobId, jobStepNum);
        } else {
            this.props.jobStepTaskWorkerStore.addJobStepIdTasks(jobId, jobStepNum, true);
        }
        this.props.jobStepTaskWorkerStore.changeSelectedJobStepTransfer(jobStepTransfer);
        this.setState({workerDialogOpen: true});
    }


    render() {
        const { classes} = this.props;
        const { anchorEl, selected} = this.state;
        const {jobStepTransfers, page, rowsPerPage, totalCount} = this.props.jobStepStore;
        const { selectedWorkTemplateStep } = this.props.workStore;
        const totalPage = Math.floor((totalCount-1) / rowsPerPage) + 1;
        const open = Boolean(anchorEl);

        const rows = [
            {
                no : '10',
                title : '검수 (4) 테이블',
                createDate : '2023. 03. 06 13:10',
                currentStatus : '반려',
                assign: '배정',
                history: [
                    {
                        no: '#1',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#1',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'fix Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '',
                        AdminAvatar: AdminAvatar,
                    },
                    {
                        no: '#2',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#2',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '배정',
                        AdminAvatar: '',
                    },
                    {
                        no: '#3',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#3',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '',
                        AdminAvatar: AdminAvatar,
                    },
                    {
                        no: '#4',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#4',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '',
                        AdminAvatar: AdminAvatar,
                    },
                ],
            },
            {
                no : '9',
                title : '일감명 저녁식사 메뉴 고르기 일상생활 9',
                createDate : '2023. 03. 06 13:10',
                currentStatus : '마감',
                assign: '',
                history: [
                    {
                        no: '#1',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#1',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '',
                        AdminAvatar: AdminAvatar,
                    },
                ],
            },
            {
                no : '8',
                title : '일감명 저녁식사 메뉴 고르기 일상생활 9',
                createDate : '2023. 03. 06 13:10',
                currentStatus : '미완료',
                assign: '',
                history: [
                    {
                        no: '#1',
                        startLang: 'KO',
                        startSentences: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?',
                        endNo: '#1',
                        endLang: 'EN',
                        endSentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        modifyNo: '#1',
                        modifyLang: 'EN',
                        modifySentences: 'Then, let\'s have kimchi fried rice for dinner. Any cheese left in the freezer?',
                        assign: '',
                        AdminAvatar: AdminAvatar,
                    },
                ],
            },


        ];
        function Row(props) {
            const { row } = props;
            const [openTable, setOpenTable] = React.useState(false);


            const useStyles = makeStyles((theme) => ({
                paginationActions: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '& .MuiTablePagination-selectRoot': {
                        marginRight: theme.spacing(2),
                    },
                },
            }));




            return (
                <React.Fragment>
                    <TableRow className={clsx(classes.tableList, classes.tableHover)}>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>
                            <Box  className={classes.CheckboxStyle}>
                                <Checkbox
                                    // onClick={this.handleAllChecked}
                                    // checked={this.state.allChecked}
                                    icon={<UnCheckedBox />}
                                    checkedIcon={<CheckedBox />}
                                    disableRipple
                                />
                                <Typography>{row.no}</Typography>
                            </Box>
                        </TableCell>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.titleWrap}>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpenTable(!openTable)}
                                disableRipple
                            >
                                {openTable ? <TableRoundDown /> : <TableRoundUp />}
                                <Typography
                                    sx={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: "1",
                                        WebkitBoxOrient: "vertical",
                                        textAlign: "left",
                                    }}
                                    >
                                    {row.title}
                                </Typography>
                            </IconButton>
                        </TableCell>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} className={classes.tableDueDate}>
                            <Typography>{row.createDate}</Typography>
                        </TableCell>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                            {row.currentStatus === '미완료' && (
                                <Box className={classes.uncompleted}><Typography>{row.currentStatus}</Typography></Box>
                            )}
                            {row.currentStatus === '완료' && (
                                <Box className={clsx(classes.completed, classes.uncompleted)}><Typography>{row.currentStatus}</Typography></Box>
                            )}
                            {row.currentStatus === '반려' && (
                                <Box className={clsx(classes.rejectTag, classes.uncompleted)}><Typography>{row.currentStatus}</Typography></Box>
                            )}
                            {row.currentStatus === '마감' && (
                                <>
                                    <Box className={clsx(classes.extension, classes.uncompleted)} style={{marginTop: '-4px'}}><Typography>{row.currentStatus}</Typography></Box>
                                    <Box className={classes.extensionDueDate}><Button disableRipple style={{marginLeft: '3px'}}>+ 기한 연장</Button></Box>
                                </>
                            )}
                        </TableCell>
                        <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                            {row.assign === "배정" ? (
                                <Box className={classes.ArrangeUserBtn} style={{justifyContent: 'right', marginRight: '12px'}}>
                                    <Button disableRipple>
                                        <ArrangeUser /> <Typography>{row.assign}</Typography>
                                    </Button>
                                </Box>
                            ) : (
                                <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    {/*한명일때*/}
                                    {/*<Stack className={classes.avatarBox}>*/}
                                    {/*    <Avatar>*/}
                                    {/*        /!*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*!/*/}
                                    {/*        {AdminAvatar ? <img src={AdminAvatar} /> : <TableUserAvatar />}*/}
                                    {/*    </Avatar>*/}
                                    {/*</Stack>*/}

                                    {/*2명 이상일때*/}
                                    <AvatarGroup total={4} max={5} sx={{ flexDirection: 'row' }} className={classes.avatarBox}>
                                        <Avatar>+9</Avatar>
                                        <Avatar src={AdminAvatar} />
                                        <Avatar src={AdminAvatar} />
                                        <Avatar src={AdminAvatar} />
                                    </AvatarGroup>

                                    <Box className={classes.rejectFile}>
                                        <Button disableRipple>
                                            <RemoveFile />
                                        </Button>
                                    </Box>
                                    {/*<IconButton id="basic-button"*/}
                                    {/*            aria-controls={open ? 'basic-menu' : undefined}*/}
                                    {/*            aria-haspopup="true"*/}
                                    {/*            aria-expanded={open ? 'true' : undefined}*/}
                                    {/*    //         onClick={() => this.handleClick(historyRow)}*/}
                                    {/*            disableRipple>*/}
                                    {/*    <TableDotIcon/>*/}
                                    {/*</IconButton>*/}
                                    {/*<Menu*/}
                                    {/*    id="basic-menu"*/}
                                    {/*    anchorEl={anchorEl}*/}
                                    {/*    open={open}*/}
                                    {/*    // onClick={() => this.handleClose}*/}
                                    {/*    MenuListProps={{*/}
                                    {/*        'aria-labelledby': 'basic-button',*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    <MenuItem>번역 다시 실행1</MenuItem>*/}
                                    {/*</Menu>*/}
                                </Box>
                            )}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ padding: 0 }} colSpan={9} className={classes.toggleTable}>
                            <Collapse in={openTable} timeout="auto" unmountOnExit>
                                <Box>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: '3%', textAlign: 'center'}}></TableCell>
                                                <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px'}}>출발어</TableCell>
                                                <TableCell style={{width: '22%', textAlign: 'center'}}>문장 (100)</TableCell>
                                                <TableCell style={{width: '2%'}}></TableCell>
                                                <TableCell style={{width: '3%'}}></TableCell>
                                                <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px'}}>도착어</TableCell>
                                                <TableCell style={{width: '25%', textAlign: 'center'}}>문장 (100)</TableCell>
                                                <TableCell style={{width: '2%'}} style={{background: '#fff', borderBottom: '0px'}}></TableCell>
                                                <TableCell style={{width: '3%'}} style={{background: '#8059ac', borderBottom: '1px solid #8059ac'}}></TableCell>
                                                <TableCell style={{width: '3%', textAlign: 'center', padding: '2.5px 0px', background: '#8059ac', borderBottom: '1px solid #8059ac'}}>교정어</TableCell>
                                                <TableCell style={{width: '28%', textAlign: 'center', background: '#8059ac', borderBottom: '1px solid #8059ac'}}>문장 (100)</TableCell>
                                                <TableCell style={{width: '4%', background: '#8059ac', borderBottom: '1px solid #8059ac'}}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.history.map((historyRow, index) => (
                                                <TableRow key={historyRow.no}>
                                                    <TableCell className={classes.bg50} style={{paddingLeft: '16px'}}>
                                                        <Box  className={classes.CheckboxStyle}>
                                                            <Typography>{historyRow.no}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell className={classes.bg50} align="center">{historyRow.startLang}</TableCell>
                                                    <TableCell className={clsx(classes.bg50, classes.limitText)} align="left" style={{position: 'relative'}}>
                                                        <Button disableRipple>
                                                            <Typography
                                                                sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: "2",
                                                                    WebkitBoxOrient: "vertical",
                                                                    textAlign: "left",
                                                                }}>
                                                                {historyRow.startSentences}
                                                            </Typography>
                                                        </Button>
                                                        <Box className={classes.moreText}>
                                                            {historyRow.startSentences}
                                                            <IconButton disableRipple>
                                                                <MoreTextClose />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                    {index === 0 && (
                                                        <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                                                            <TableSwichLang/>
                                                        </TableCell>
                                                    )}
                                                    <TableCell className={classes.bg100} style={{paddingLeft: '16px'}}>{historyRow.endNo}</TableCell>
                                                    <TableCell className={classes.bg100} align="center">{historyRow.endLang}</TableCell>
                                                    <TableCell className={clsx(classes.bg100, classes.limitText)} align="left" style={{position: 'relative'}}>
                                                        <Button disableRipple>
                                                            <Typography
                                                                sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: "2",
                                                                    WebkitBoxOrient: "vertical",
                                                                    textAlign: "left",
                                                                }}>
                                                                {historyRow.endSentences}
                                                            </Typography>
                                                        </Button>
                                                        <Box className={classes.moreText}>
                                                            {historyRow.endSentences}
                                                            <IconButton disableRipple>
                                                                <MoreTextClose />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                    {index === 0 && (
                                                        <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                                                            <TableSwichLang/>
                                                        </TableCell>
                                                    )}
                                                    <TableCell className={classes.bgf3e9ff} style={{paddingLeft: '16px'}}>{historyRow.modifyNo}</TableCell>
                                                    <TableCell className={classes.bgf3e9ff} align="center">{historyRow.modifyLang}</TableCell>
                                                    <TableCell className={clsx(classes.bgf3e9ff, classes.limitText)} align="left" style={{position: 'relative'}}>
                                                        <Button disableRipple>
                                                            <Typography
                                                                sx={{
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    display: "-webkit-box",
                                                                    WebkitLineClamp: "2",
                                                                    WebkitBoxOrient: "vertical",
                                                                    textAlign: "left",
                                                                }}>
                                                                {historyRow.modifySentences}
                                                            </Typography>
                                                        </Button>
                                                        <Box className={classes.moreText}>
                                                            {historyRow.modifySentences}
                                                            <IconButton disableRipple>
                                                                <MoreTextClose />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                        {historyRow.assign ? (
                                                            <>
                                                            <TableCell className={classes.bgf3e9ff} align="right">
                                                                <Box style={{display: 'flex', alignItems: 'center'}}>
                                                                    <Box className={classes.workTimeStyle}>
                                                                        <Button disableRipple></Button>
                                                                    </Box>
                                                                    <Box className={classes.ArrangeUserBtn} style={{marginRight: '6px'}}>
                                                                        <Button disableRipple>
                                                                            <ArrangeUser /> <Typography>{historyRow.assign}</Typography>
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </TableCell>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <TableCell className={classes.bgf3e9ff} align="right">
                                                                    <Box style={{display: 'flex', alignItems: 'center'}}>
                                                                        <Box className={clsx(classes.workTimeStyle, classes.workTimeBlue)}>
                                                                            <Button disableRipple></Button>
                                                                        </Box>
                                                                        {/*한명일때*/}
                                                                        {/*<Stack className={classes.avatarBox}>*/}
                                                                        {/*    <Avatar>*/}
                                                                        {/*        /!*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*!/*/}
                                                                        {/*        {historyRow.AdminAvatar ? <img src={historyRow.AdminAvatar} /> : <TableUserAvatar />}*/}
                                                                        {/*    </Avatar>*/}
                                                                        {/*</Stack>*/}

                                                                        {/*2명 이상*/}
                                                                        <AvatarGroup total={3} max={4} sx={{ flexDirection: 'row' }} className={clsx(classes.avatarBox, classes.InnerTable)}>
                                                                            <Avatar>+5</Avatar>
                                                                            <Avatar src={AdminAvatar} />
                                                                            <Avatar src={AdminAvatar} />
                                                                        </AvatarGroup>

                                                                        <Box className={classes.rejectFile}>
                                                                            <Button disableRipple>
                                                                                <RemoveFile />
                                                                            </Button>
                                                                        </Box>
                                                                    </Box>
                                                                </TableCell>
                                                            </>
                                                        )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </React.Fragment>
            );
        }

        return (
            <div>
                <TableContainer component={Paper} className={classes.tableWrap}>
                    <Table aria-label="collapsible table">
                        <TableHead className={classes.headTitle}>
                            <TableRow className={classes.tableList}>
                                <TableCell style={{width: '9%', paddingLeft: '23px', paddingRight: 0,}} className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>번호</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '60%'}} align="left">일감명</TableCell>
                                <TableCell style={{width: '13%'}} align="left" className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>최근 작업일</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '9%', maxWidth: 150}} align="left" className={classes.toggleBtn}>
                                    <IconButton
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography>진행 상태</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: '10%', minWidth: 115}} align="right" className={classes.toggleBtn} colSpan={1}>
                                    <IconButton
                                        style={{marginRight: '30px'}}
                                        disableRipple
                                        onClick={this.handleToggle}
                                    >
                                        <Typography >작업자</Typography> {selected ? <ArrowDownIcon /> : <ArrowUpIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/*{rows.map((row) => (*/}
                            {/*    <Row key={row.name} row={row} />*/}
                            {/*))}*/}

                            {/*{rows.map((row) => (*/}
                            {/*    <TableComponentInspectionRow key={row.name} row={row} />*/}
                            {/*))}*/}

                            {jobStepTransfers.map(jobStepTransfer => (
                                <TableComponentInspectionRow key={`TableComponentModifyRow_${jobStepTransfer.jobId}`}
                                                             jobStepTransfer={jobStepTransfer}
                                                             handleOpenDialog={this.handleOpenDialog}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/*Pagination*/}
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: 10,}}>
                    <Box className={classes.rowCount} style={{display: 'flex', alignItems: 'center',}}>
                        <Typography>페이지 당 수:</Typography>
                        <Box sx={{ width: 45 }}>
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
                            <PageLeft />
                        </IconButton>
                        <Box className={classes.pagiNumber}>
                            <Typography><span>{page+1}</span> / {totalPage}</Typography>
                        </Box>
                        <IconButton disabled={page+1 === totalPage}
                                    onClick={() => this.handleChangePage(page+1)} disableRipple>
                            <PageRight />
                        </IconButton>
                    </Box>
                </Box>
                {/*Pagination*/}

                {/*작업자 배정 dialog*/}
                <CommonDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>{TemplateStepTypeLabel[selectedWorkTemplateStep.type]}</b> 단계 작업자 배정</span>}
                    submitText={'배정하기'}
                    onClick={this.saveJobStepTaskWorkers}
                    children={<WorkersAssignment/>}
                />

            </div>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepStore', 'workStore', 'jobStepTaskWorkerStore', 'authStore')(
        observer(TableComponentInspection)
    )
);
