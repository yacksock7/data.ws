import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentModifyStyle";
import {
    Box,
    IconButton,
    Typography,
    Button,
    Stack, Avatar,
    TextField,
    Tooltip
} from "@mui/material";
import { ReactComponent as ModifyCloseIcon } from '../../../common/images/ModifyCloseIcon.svg';
import { ReactComponent as RoundTransfer } from '../../../common/images/RoundTransfer.svg';
import { ReactComponent as RefreshModify } from '../../../common/images/RefreshModify.svg';
import { ReactComponent as Backward } from '../../../common/images/Backward.svg';
import { ReactComponent as ClipBoardIcon } from '../../../common/images/ClipBoardIcon.svg';
import { ReactComponent as CopyIcon } from '../../../common/images/CopyIcon.svg';
import { ReactComponent as RejectFileIcon } from '../../../common/images/RejectFileIcon.svg';
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as TooltipArrowDown} from "../../../common/images/TooltipArrowDown.svg";
import {ReactComponent as TooltipCloseIcon} from "../../../common/images/TooltipCloseIcon.svg";
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import {inject, observer} from "mobx-react";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import {HistoryControlType, TemplateStepType} from "../../../stores/TemplateStore";

class ModifyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coachMarkOpen : true
        }
    }

    // componentDidMount() {
    //     // this.initNewJobStepTaskText(jobStepTaskText, preJobStepTaskText);
    // }

    componentWillUnmount() {
        console.log("componentWillUnmount!!");
        this.props.jobStepTaskStore.init();
    }

    handleCloseTableLow = () => {
        this.props.jobStepTaskStore.changeSelectedJobStepTaskTransfer();
        this.props.jobStepTaskStore.init();
    }

    handleChangeTextHistory = (type) => {
        this.props.jobStepTaskStore.changeTextHistory(type);
    }

    handleChangeText = (text) => {
        this.props.jobStepTaskStore.changeNewJobStepTaskText(text);
    }

    saveJobStepTask = async () => {
        const { loginUser } = this.props.authStore;
        const {jobId, jobStepNum} = this.props.jobStepTaskTransfer;
        await this.props.jobStepTaskStore.createJobStepTaskText(loginUser.id);
        this.props.jobStepTaskStore.getJobStepTaskTransfers(jobId, jobStepNum, loginUser.id);
    }

    handleCopyText = () => {
        const { text } = this.props.jobStepTaskStore.newJobStepTaskText;
        window.navigator.clipboard.writeText(text)
            .then(() => { alert("복사 완료!"); });
    }

    handleCloseCoachMark = () => {
        this.setState({coachMarkOpen : false});
    }

    initNewJobStepTaskText = (jobStepTaskText, preJobStepTaskText) => {
        if (!jobStepTaskText) {
            this.props.jobStepTaskStore.changeNewJobStepTaskText(preJobStepTaskText);
        }
    }

    render() {
        const { classes, jobStepTaskTransfer, handleClickDetailOpen } = this.props;
        const { loginUser } = this.props.authStore;
        const { newJobStepTaskText, textHistoryIndex } = this.props.jobStepTaskStore;
        const { preJobResults } = this.props.jobStepTaskResultStore;

        const preJobStepTask =
            preJobResults.find(preJobResult =>
                preJobResult.jobId === jobStepTaskTransfer.jobId
                && preJobResult.jobStepNum === (jobStepTaskTransfer.jobStepNum-1)
                && preJobResult.jobStepTaskNum === jobStepTaskTransfer.jobStepTaskNum);
        const preJobStepTaskText = preJobStepTask ? preJobStepTask.jobStepTaskResult.jobStepTaskText.text : null;


        const jobStepTask =
            preJobResults.find(preJobResult =>
                preJobResult.jobId === jobStepTaskTransfer.jobId
                && preJobResult.jobStepNum === jobStepTaskTransfer.jobStepNum
                && preJobResult.jobStepTaskNum === jobStepTaskTransfer.jobStepTaskNum);
        const jobStepTaskText = jobStepTask ? jobStepTask.jobStepTaskResult.jobStepTaskText.text : null;



        return (
                <Box className={classes.modifyWrap} style={{boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.25)'}}>
                    <Box className={classes.modifyWrapInner}>
                        <Box className={classes.topBarText}>
                            <Typography>작업자</Typography>
                            <img src={AdminAvatar} />
                            <Typography style={{marginLeft: 62}}>진행 상태</Typography>
                            {(jobStepTaskTransfer.status === JobTaskStatus.Created
                                || jobStepTaskTransfer.status === JobTaskStatus.Assigned) && (
                                <Box className={classes.uncompleted}><Typography style={{margin: 0, color: '#fff', lineHeight: '22px'}}>미완료</Typography></Box>
                            )}
                            {(jobStepTaskTransfer.status === JobTaskStatus.Completed
                                || jobStepTaskTransfer.status === JobTaskStatus.Accepted) && (
                                <Box className={clsx(classes.completed, classes.uncompleted)}><Typography style={{margin: 0, color: '#fff', lineHeight: '22px'}}>완료</Typography></Box>
                            )}
                            {jobStepTaskTransfer.status === JobTaskStatus.Rejected &&  (
                                <Box className={clsx(classes.rejectTag, classes.uncompleted)}><Typography style={{margin: 0, color: '#fff', lineHeight: '22px'}}>반려</Typography></Box>
                            )}
                            <Button disableRipple>+ 문장별 기한 지정</Button>
                        </Box>
                        <Box>
                            <IconButton onClick={handleClickDetailOpen} disableRipple>
                                <ModifyCloseIcon />
                            </IconButton>
                        </Box>
                    </Box>


                    <Box className={classes.translationBar}>
                        <Typography>기계번역</Typography>
                        <Box style={{display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', marginLeft: '-20px'}}>
                            <RoundTransfer />
                            <Typography style={{marginLeft: 20}}>교정</Typography>
                        </Box>

                        <Box className={classes.btnWrap}>
                            <Tooltip title="이전 상태로 되돌리기">
                                <span>
                                    <IconButton style={{marginRight: 20}}
                                                onClick={() => this.handleChangeTextHistory(HistoryControlType.Previous)}
                                                disabled={textHistoryIndex < 2}
                                                disableRipple>
                                            <Backward />
                                    </IconButton>
                                </span>
                            </Tooltip>

                            <Tooltip title="기계번역 원문으로 돌아가기">
                                <IconButton onClick={() => this.handleChangeText(preJobStepTaskText ? preJobStepTaskText : "")} disableRipple>
                                    <RefreshModify />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>


                    <Box style={{display: 'flex', borderTop: '1px solid #777', }}>
                        <Box className={classes.textArea}>
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                value={preJobStepTaskText && preJobStepTaskText}
                                disabled={true}
                            />
                            <Box >
                                <Typography className={classes.wordCount}>{preJobStepTaskText ? preJobStepTaskText.length : 0} / 5,000</Typography>
                            </Box>
                        </Box>
                        <Box className={classes.textArea} style={{borderRight: 0, background: '#eee'}}>
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                // value={newJobStepTaskText.text}
                                value={
                                    (jobStepTaskTransfer.status === JobTaskStatus.Completed
                                    || jobStepTaskTransfer.status === JobTaskStatus.Accepted) ? jobStepTaskText : newJobStepTaskText.text
                                }
                                disabled={jobStepTaskTransfer.status === JobTaskStatus.Completed || jobStepTaskTransfer.status === JobTaskStatus.Accepted}
                                onChange={(e) => this.handleChangeText(e.target.value)}
                            />
                            {/*<Box className={classes.chipStyle}>*/}
                            {/*    <Stack direction="row" spacing={1}>*/}
                            {/*        <Chip*/}
                            {/*            icon={<ChipEyeIcon />}*/}
                            {/*            deleteIcon={<ChipIconClose />}*/}
                            {/*            label="dinner"*/}
                            {/*            variant="outlined"*/}
                            {/*            onClick={handleClick}*/}
                            {/*            onDelete={handleDelete}*/}
                            {/*        />*/}
                            {/*        <Chip*/}
                            {/*            icon={<ChipEyeIcon />}*/}
                            {/*            deleteIcon={<ChipIconClose />}*/}
                            {/*            label="kimchi kimchi"*/}
                            {/*            variant="outlined"*/}
                            {/*            onClick={handleClick}*/}
                            {/*            onDelete={handleDelete}*/}
                            {/*        />*/}
                            {/*        <Chip*/}
                            {/*            icon={<ChipEyeIcon />}*/}
                            {/*            deleteIcon={<ChipIconClose />}*/}
                            {/*            label="kimchi kimchi"*/}
                            {/*            variant="outlined"*/}
                            {/*            onClick={handleClick}*/}
                            {/*            onDelete={handleDelete}*/}
                            {/*        />*/}
                            {/*        <Chip*/}
                            {/*            icon={<ChipEyeIcon />}*/}
                            {/*            deleteIcon={<ChipIconClose />}*/}
                            {/*            label="kimchi kimchi"*/}
                            {/*            variant="outlined"*/}
                            {/*            onClick={handleClick}*/}
                            {/*            onDelete={handleDelete}*/}
                            {/*        />*/}
                            {/*        <Chip*/}
                            {/*            icon={<ChipEyeIcon />}*/}
                            {/*            deleteIcon={<ChipIconClose />}*/}
                            {/*            label="kimchi kimchi"*/}
                            {/*            variant="outlined"*/}
                            {/*            onClick={handleClick}*/}
                            {/*            onDelete={handleDelete}*/}
                            {/*        />*/}
                            {/*    </Stack>*/}
                            {/*</Box>*/}
                        </Box>
                    </Box>


                    <Box style={{display: 'flex', }}>
                        <Box className={classes.buttonArea}>
                        </Box>
                        <Box className={classes.buttonArea} style={{borderRight: 0, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Box  style={{display: 'flex', }}>
                                {/*<Box className={classes.iconButtonStyle}>*/}
                                {/*    <Button disableRipple>*/}
                                {/*        <ClipBoardIcon/>*/}
                                {/*        <Typography>전문보기</Typography>*/}
                                {/*    </Button>*/}
                                {/*</Box>*/}
                                <Box className={classes.iconButtonStyle}>
                                    <Button onClick={this.handleCopyText} disableRipple>
                                        <CopyIcon/>
                                        <Typography>복사</Typography>
                                    </Button>
                                </Box>
                                {jobStepTaskTransfer.status === JobTaskStatus.Rejected &&
                                    <div style={{position: 'relative'}}>
                                        <Box className={classes.iconButtonStyle}>
                                            <Button disableRipple>
                                                <RejectFileIcon/>
                                                <Typography>반려</Typography>
                                            </Button>
                                        </Box>
                                        <Box className={classes.tooltipBox} style={{position: 'absolute', top: 40,}}>
                                            <Box className={classes.tooltipArrow}>
                                                <TooltipArrow/>
                                            </Box>
                                            <Box className={classes.tooltipBoxIn}>
                                                <Box className={classes.tooltipTitleBox} >
                                                    <Typography style={{color: '#fff', marginBottom:10,}}>
                                                    반려
                                                    </Typography>
                                                <Typography style={{color: '#fff', fontWeight: 500, marginBottom: 20,}}>반려 사유건이 있습니다. <br/>눌러서 상세 내역을 확인하고 재작업해주세요.</Typography>
                                                <Button className={classes.tooltipBoxCheck} style={{background: '#fff', width: 85, height: 36}} disableRipple>
                                                    <Typography style={{color: '#65615C', fontWeight: 500,}}>확인</Typography>
                                                </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                }
                            </Box>
                            <Box className={classes.buttonStyle} style={{position: 'relative'}}>
                                <Button className={classes.buttonLine}
                                        onClick={handleClickDetailOpen}
                                        disableRipple>
                                    <Typography>취소</Typography>
                                </Button>
                                <Button onClick={this.saveJobStepTask}
                                        disabled={(jobStepTaskTransfer.status === JobTaskStatus.Completed
                                            || jobStepTaskTransfer.status === JobTaskStatus.Accepted)
                                            // || loginUser.id !== jobStepTask.userId
                                }
                                        disableRipple>
                                    <Typography>완료</Typography>
                                </Button>


                                {this.state.coachMarkOpen &&
                                    <Box className={classes.tooltipBoxBtn} style={{position: 'absolute'}}>
                                        <Box className={classes.tooltipBoxInBtn}>
                                            <Box className={classes.tooltipTitleBox}>
                                                <Typography style={{color: '#fff', marginBottom: 10,}}>
                                                    완료
                                                </Typography>
                                                <Typography style={{color: '#fff', fontWeight: 500, marginBottom: 20,}}>
                                                    교정을 하지 않아도 '완료' 버튼을 눌러야 작업이 수행됩니다.
                                                </Typography>
                                                <Button className={classes.tooltipBoxCheck}
                                                        style={{background: '#fff', width: 85, height: 36}}
                                                        onClick={this.handleCloseCoachMark}
                                                        disableRipple>
                                                    <Typography
                                                        style={{color: '#65615C', fontWeight: 500, fontSize: '0.875rem'}}>확인</Typography>
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box className={classes.tooltipArrowBtn}>
                                            <TooltipArrowDown/>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
        );
    }
}

export default withStyles(styles)(
    inject('jobStepTaskResultStore', 'jobStepTaskStore', 'workStore', 'authStore')(
        observer(ModifyComponent)
    )
);
