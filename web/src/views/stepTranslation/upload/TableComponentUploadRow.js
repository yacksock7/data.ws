import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Menu,
    Typography,
    Collapse,
    Stack,
    Avatar, TextField,
} from "@mui/material";
import {ReactComponent as TableDotIcon} from '../../../common/images/TableDotIcon.svg';
import {ReactComponent as TableUserAvatar} from '../../../common/images/TableUserAvatar.svg';
import clsx from "clsx";
import {inject, observer} from "mobx-react";
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";
import TableComponentUploadRowDetail from "./TableComponentUploadRowDetail";
import dayjs from "dayjs";

// import clsx from "clsx";
class TableComponentUploadRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: false,
            open: false,
            openRows: {},
            openTable: false,
            count: ''
        };
    }

    componentDidMount() {
        this.props.jobStepTaskStore.initSelectJobStepEditNum();
    }

    handleToggle = () => {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    };

    handleClick = (event) => {
        console.log(event.currentTarget);
        this.setState({open: true, anchorEl: event.currentTarget});
    };
    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };


    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    handleChange = (event) => {
        this.setState({
            count: event.target.value
        });
    }

    setOpenTable = () => {
        const {jobId, jobStepNum} = this.props.jobStepTransfer;
        const {loginUser} = this.props.authStore;
        this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
        this.props.jobStepStore.changeSelectedJobStepTransfer(jobId, jobStepNum);
    }

    handleClickJobRowNameEdit = (num) =>
    {
        this.props.jobStepTaskStore.changeSelectJobStepEditNum(num);
        this.handleClose();
    }

    getJobStepTransfers = () =>
    {
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        const { loginUser } = this.props.authStore;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
    }

    handleClickJobRowDelete = async (jobId) =>
    {
        await  this.props.jobStore.deleteUploadJob(jobId);
        this.getJobStepTransfers();
        this.props.jobStepTaskStore.initSelectJobStepEditNum();
        this.handleClose();
    }
    handleTextFieldFocusOut = (e)=>
    {
       this.props.jobStepTaskStore.initSelectJobStepEditNum();
    }

    handleKeyPress = (e, jobId) =>
    {
        if(e.key === "Enter")
        {
            if(e.target.value.length <=0)
            {
                this.props.jobStepTaskStore.initSelectJobStepEditNum();
                return;
            }
            else
            {
                this.props.jobStore.changeUploadJobName(jobId,e.target.value,this.getJobStepTransfers);
                this.props.jobStepTaskStore.initSelectJobStepEditNum();
            }
        }
    }

    render() {
        const { open, anchorEl } = this.state;
        const { classes, jobStepTransfer,key } = this.props;
        const { jobStepTaskTransfers ,selectJobStepEditNum} = this.props.jobStepTaskStore;
        const { selectedJobStepTransfer } = this.props.jobStepStore;
        const openTable =
            selectedJobStepTransfer
            && selectedJobStepTransfer.jobId === jobStepTransfer.jobId
            && selectedJobStepTransfer.jobStepNum === jobStepTransfer.jobStepNum;

        const createdDatetime = dayjs(jobStepTransfer.createdDatetime).format("YYYY-MM-DD hh:mm");
        return (
            <React.Fragment>
                    <TableRow className={clsx(classes.tableList, classes.tableHover)}>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)', paddingLeft: '23px'}}>
                            {jobStepTransfer.jobId}
                        </TableCell>
                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}
                                   className={classes.titleWrap}>
                            {jobStepTransfer.job.name ? (
                                     selectJobStepEditNum === jobStepTransfer.jobId ?
                                         (<TextField label="일감명 수정" variant="standard"  placeholder={jobStepTransfer.job.name} fullWidth onBlur={(e) => {
                                             this.handleTextFieldFocusOut(e)}} onChange={(e) => {}} onKeyDown={(e) =>this.handleKeyPress(e,jobStepTransfer.jobId)} />):
                                (<IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => this.setOpenTable(!openTable)}
                                    disableRipple>
                                    {/*{openTable ? <TableRoundDown/> : <TableRoundUp/>}*/}
                                        <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "1", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                                            {jobStepTransfer.job.name}
                                        </Typography>
                                </IconButton>)
                                ) : (
                                <Box style={{background: '#d9d9d9', width: 238, height: 18, borderRadius: '99px'}} />
                            )}
                        </TableCell>

                        <TableCell align="center" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}
                                   className={classes.fileFormat}>
                            {jobStepTransfer.cloudObject.contentsType ? (
                                <Typography>{jobStepTransfer.cloudObject.contentsType}</Typography>
                            ) : (
                                <Box style={{background: '#d9d9d9', width: 46, height: 18, borderRadius: '99px', margin: '0 auto'}} />
                            )}
                        </TableCell>

                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}
                                   className={classes.tableDueDate}>
                            {jobStepTransfer.createdDatetime ? (
                                <Typography>{createdDatetime}</Typography>
                            ) : (
                                <Box style={{background: '#d9d9d9', width: 134, height: 18, borderRadius: '99px'}}/>
                            )}
                        </TableCell>

                        <TableCell align="left" style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}}>
                            {jobStepTransfer.status === JobTaskStatus.Completed &&
                                <Box className={clsx(classes.completed, classes.ongoing)}><Typography>{JobTaskStatusLabel[jobStepTransfer.status]}</Typography></Box>
                            }
                            {jobStepTransfer.status === JobTaskStatus.Assigned &&
                                <Box className={classes.ongoing} style={{marginTop: '-4px'}}><Typography>{JobTaskStatusLabel[jobStepTransfer.status]}</Typography></Box>
                            }
                            {jobStepTransfer.status === JobTaskStatus.Created &&
                                <Box className={clsx(classes.beforeWork, classes.ongoing)}><Typography>{JobTaskStatusLabel[jobStepTransfer.status]}</Typography></Box>
                            }

                            {/*{row.currentStatus === '진행중' && (*/}
                            {/*    <>*/}
                            {/*        <Box className={classes.ongoing}*/}
                            {/*             style={{marginTop: '-4px'}}><Typography>{row.currentStatus}</Typography></Box>*/}
                            {/*        /!*Todo 진행중일때 '기한연장' 또는 '연장(날짜)'*!/*/}
                            {/*/!*진행중+기한연장*!/*/}
                            {/*        <Box className={classes.extensionDueDate}><Button disableRipple*/}
                            {/*                                                         style={{marginLeft: '7px'}}>+ 기한*/}
                            {/*            연장</Button></Box>*/}
                            {/*        /!*진행중+연장*!/*/}
                            {/*        /!*<Box className={classes.extensionDueDate} ><Button disableRipple style={{marginLeft: '-10px'}}>연장 : ~ 2023. 03. 09</Button></Box>*!/*/}
                            {/*    </>*/}
                            {/*)}*/}
                            {/*{row.currentStatus === '완료' && (*/}
                            {/*    <Box className={clsx(classes.completed, classes.ongoing)}><Typography>{row.currentStatus}</Typography></Box>*/}
                            {/*)}*/}
                            {/*{row.currentStatus === '진행전' && (*/}
                            {/*    <Box className={clsx(classes.beforeWork, classes.ongoing)}><Typography>{row.currentStatus}</Typography></Box>*/}
                            {/*)}*/}

                            {/*<Box className={clsx(classes.beforeWork, classes.ongoing)}>*/}
                            {/*    <Typography>*/}
                            {/*        {this.getTaskStatus()}*/}
                            {/*    </Typography>*/}
                            {/*</Box>*/}
                        </TableCell>

                        <TableCell style={{borderBottom: '0.5px solid rgba(224, 224, 224, 0.5)'}} align="right">
                            <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Stack className={classes.avatarBox}>
                                    <Avatar>
                                        {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                        {/*{row.AdminAvatar ? <img src={row.AdminAvatar}/> : <TableUserAvatar/>}*/}
                                        <TableUserAvatar/>
                                    </Avatar>
                                </Stack>

                                <IconButton id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={this.handleClick}
                                            disableRipple>
                                    <TableDotIcon/>
                                </IconButton>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={this.handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={ () => this.handleClickJobRowNameEdit(jobStepTransfer.jobId)}>일감명 편집</MenuItem>
                                    <MenuItem onClick={() => this.handleClickJobRowDelete(jobStepTransfer.jobId)}>일감 삭제</MenuItem>
                                </Menu>
                            </Box>

                        </TableCell>
                    </TableRow>

                    {/* AS-IS : row detail... */}

                    <TableRow>
                        <TableCell style={{padding: 0}} colSpan={9} className={classes.toggleTable}>
                            <Collapse in={openTable} timeout="auto" unmountOnExit>
                                <Box>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{width: '3%', textAlign: 'center'}}></TableCell>
                                                <TableCell style={{
                                                    width: '7.4%',
                                                    textAlign: 'center',
                                                    padding: '2.5px 0px'
                                                }}>출발어</TableCell>
                                                <TableCell
                                                    style={{width: '89.6%', textAlign: 'left', paddingLeft: '7%'}}>문장 ({jobStepTaskTransfers.length})</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {jobStepTaskTransfers.map(jobStepTaskTransfer => (
                                                <TableComponentUploadRowDetail key={jobStepTaskTransfer.jobStepTaskNum} jobStepTaskTransfer={jobStepTaskTransfer} />
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
};

export default withStyles(styles)(
    inject('jobStepTaskStore', 'jobStepStore', 'jobStore','workStore', 'authStore')(
        observer(TableComponentUploadRow)
    )
);
