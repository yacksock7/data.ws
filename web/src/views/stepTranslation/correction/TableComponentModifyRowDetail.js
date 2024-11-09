import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentModifyStyle";
import {
    Box,
    TableCell,
    TableRow,
    IconButton,
    Typography,
    Button,
    Stack,
    Avatar,
} from "@mui/material";
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import { ReactComponent as TableUserAvatar } from '../../../common/images/TableUserAvatar.svg';
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import clsx from "clsx";
import {TemplateStepType} from "../../../stores/TemplateStore";
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";
import {inject, observer} from "mobx-react";
import ModifyComponent from "./ModifyComponent";
import dayjs from "dayjs";


class TableComponentModifyRowDetail extends Component {
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
            coachMarkOpen : true,
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


    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10)});
        this.setState({page: 0});
    };

    setOpenTableRow = (preJobStepTaskText, jobStepTaskText) => {

        const {jobStepTaskTransfer} = this.props;
        if (jobStepTaskTransfer.status !== JobTaskStatus.Created) {
            const text = jobStepTaskText? jobStepTaskText : preJobStepTaskText.text;
            this.props.jobStepTaskStore.setNewJobStepTaskText(jobStepTaskTransfer, text);
            this.props.jobStepTaskStore.changeSelectedJobStepTaskTransfer(jobStepTaskTransfer);
        }
    }
    handleCloseCoachMark = () => {
        this.setState({coachMarkOpen : false});
    }

    render() {
        const { classes, jobStepTaskTransfer, index } = this.props;
        const { selectedJobStepTaskTransfer } = this.props.jobStepTaskStore;
        const {selectedWork} = this.props.workStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);

        const open = false;
        const prePreJobStepTaskText =
            jobStepTaskTransfer.prePreWorkers
            && jobStepTaskTransfer.prePreWorkers.length > 0
            && jobStepTaskTransfer.prePreWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.prePreWorkers[0].jobStepTaskText : null;

        const preJobStepTaskText =
            jobStepTaskTransfer.preWorkers
            && jobStepTaskTransfer.preWorkers.length > 0
            && jobStepTaskTransfer.preWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.preWorkers[0].jobStepTaskText : null;

        const jobStepTaskText =
            jobStepTaskTransfer.workers
            && jobStepTaskTransfer.workers.length > 0
            && jobStepTaskTransfer.workers[0].jobStepTaskText ?
                jobStepTaskTransfer.workers[0].jobStepTaskText : null;

        const updatedDatetime = jobStepTaskText && dayjs(jobStepTaskText.updatedDatetime).format("YYYY-MM-DD hh:mm");

        return (
                <TableRow key={jobStepTaskTransfer.jobStepTaskNum} style={{position: 'relative'}}>
                <TableCell className={classes.bg50} style={{paddingLeft: '16px'}}>
                    <Box  className={classes.CheckboxStyle}>
                        <Typography>{jobStepTaskTransfer.jobStepTaskNum}</Typography>
                    </Box>
                </TableCell>
                <TableCell className={classes.bg50} align="center">{options.sourceLang}</TableCell>
                <TableCell className={clsx(classes.bg50, classes.limitText)} align="left" style={{position: 'relative'}}>
                    <Button onClick={() => this.setOpenTableRow(preJobStepTaskText)} disableRipple>
                        <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                            {prePreJobStepTaskText && prePreJobStepTaskText.text}
                        </Typography>
                    </Button>
                    {index === 0 && this.state.coachMarkOpen && (
                    <Box className={classes.tooltipBox} style={{position: 'absolute', top: 40, left: 50}}>
                        <Box className={classes.tooltipArrow}>
                            <TooltipArrow/>
                        </Box>
                        <Box className={classes.tooltipBoxIn}>
                            <Box className={classes.tooltipTitleBox} >
                                <Typography style={{color: '#fff', marginBottom:10,}}>
                                    작업시트
                                </Typography>
                                <Typography style={{color: '#fff', fontWeight: 500, marginBottom: 20,}}>작업 하려는 문장을 선택하면 작업 시트가 <br/>펼쳐집니다.</Typography>
                                <Button className={classes.tooltipBoxCheck} style={{background: '#fff', width: 85, height: 36}}
                                        onClick={this.handleCloseCoachMark}
                                        disableRipple>
                                    <Typography style={{color: '#65615C', fontWeight: 500,}}>확인</Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                    )}

                </TableCell>
                {index === 0 && (
                    <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                        <TableSwichLang/>
                    </TableCell>
                )}
                <TableCell className={classes.bg100} style={{paddingLeft: '16px'}}>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                <TableCell className={classes.bg100} align="center">{options.targetLang}</TableCell>
                <TableCell className={clsx(classes.bg100, classes.limitText)} align="left" >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => this.setOpenTableRow(preJobStepTaskText, jobStepTaskText)}
                        disableRipple
                    >
                        <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                            {preJobStepTaskText && preJobStepTaskText.text}
                        </Typography>
                    </IconButton>
                </TableCell>
                <TableCell style={{background: '#fff', padding: '2.5px 0px', minWidth: '145px'}}>
                    <Typography style={{textAlign: 'center', letterSpacing: '-0.5px'}}>
                        {updatedDatetime}
                    </Typography>
                </TableCell>
                <TableCell style={{background: '#fff', padding: '2.5px 0px'}}>
                    {(jobStepTaskTransfer.status === JobTaskStatus.Created
                        || jobStepTaskTransfer.status === JobTaskStatus.Assigned) && (
                        <Box className={classes.uncompleted}><Typography>미완료</Typography></Box>
                    )}
                    {(jobStepTaskTransfer.status === JobTaskStatus.Completed
                        || jobStepTaskTransfer.status === JobTaskStatus.Accepted) && (
                        <Box className={clsx(classes.completed, classes.uncompleted)}><Typography>완료</Typography></Box>
                    )}
                    {jobStepTaskTransfer.status === JobTaskStatus.Rejected &&  (
                        <Box className={clsx(classes.rejectTag, classes.uncompleted)}><Typography>반려</Typography></Box>
                    )}
                </TableCell>

                {jobStepTaskTransfer.status === JobTaskStatus.Created ? (
                    <>
                        {/*<TableCell style={{background: '#fff'}} align="right">*/}
                        {/*    <Box className={classes.ArrangeUserBtn} style={{marginRight: '6px'}}>*/}
                        {/*        <Button disableRipple>*/}
                        {/*            <ArrangeUser /> <Typography> 배정 </Typography>*/}
                        {/*        </Button>*/}
                        {/*    </Box>*/}
                        {/*</TableCell>*/}
                        {/*<TableCell style={{background: '#fff'}} />*/}
                        {/*<TableCell style={{background: '#fff'}} align="right">*/}
                        {/*    <IconButton id="basic-button"*/}
                        {/*                aria-controls={open ? 'basic-menu' : undefined}*/}
                        {/*                aria-haspopup="true"*/}
                        {/*                aria-expanded={open ? 'true' : undefined}*/}
                        {/*                onClick={this.handleClick}*/}
                        {/*                disableRipple>*/}
                        {/*        <TableDotIcon/>*/}
                        {/*    </IconButton>*/}
                        {/*    <Menu*/}
                        {/*        id="basic-menu"*/}
                        {/*        anchorEl={anchorEl}*/}
                        {/*        open={open}*/}
                        {/*        // onClick={() => this.handleClose}*/}
                        {/*        MenuListProps={{*/}
                        {/*            'aria-labelledby': 'basic-button',*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <MenuItem>번역 다시 실행</MenuItem>*/}
                        {/*    </Menu>*/}
                        {/*</TableCell>*/}
                    </>
                ) : (
                    <>
                        <TableCell style={{background: '#fff'}} align="right">
                            <Stack className={classes.avatarBox}>
                                <Avatar>
                                    {/*img 관리자 이미지가 없을때 TableUserAvatar 기본 아이콘 노출*/}
                                    {/*{historyRow.AdminAvatar ? <img src={historyRow.AdminAvatar} /> : <TableUserAvatar />}*/}
                                    <TableUserAvatar />
                                </Avatar>
                            </Stack>
                        </TableCell>
                        <TableCell/>
                    </>
                )}


                {selectedJobStepTaskTransfer === jobStepTaskTransfer &&
                    <ModifyComponent jobStepTaskTransfer={jobStepTaskTransfer} />
                }
                    {/*RecComponent*/}
                    {/*LabelingComponent*/}
            </TableRow>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskStore', 'workStore')(
        observer(TableComponentModifyRowDetail)
    )
);


