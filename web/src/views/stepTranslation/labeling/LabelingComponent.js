import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./TableComponentLabelingStyle";
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
import {ReactComponent as RecFileUploadIcon} from "../../../common/images/RecFileUploadIcon.svg";
import {ReactComponent as RecPlayIcon} from "../../../common/images/RecPlayIcon.svg";
import {ReactComponent as LabelProgressIcon1} from "../../../common/images/LabelProgressIcon1.svg";
import {ReactComponent as LabelProgressIcon2} from "../../../common/images/LabelProgressIcon2.svg";
import {ReactComponent as LabelProgressIcon3} from "../../../common/images/LabelProgressIcon3.svg";
import {ReactComponent as LabelProgressIcon4} from "../../../common/images/LabelProgressIcon4.svg";
import {ReactComponent as LabelProgressIcon5} from "../../../common/images/LabelProgressIcon5.svg";
import {ReactComponent as LabelProgressIcon6} from "../../../common/images/LabelProgressIcon6.svg";
import {ReactComponent as RightCursorBtn} from "../../../common/images/RightCursorBtn.svg";
import {ReactComponent as RightResetBtn} from "../../../common/images/RightResetBtn.svg";
import {ReactComponent as RightClosetBtn} from "../../../common/images/RightClosetBtn.svg";
import {ReactComponent as TopTooltipUpIcon} from "../../../common/images/TopTooltipUpIcon.svg";
import {ReactComponent as LabelingCloseBtn} from "../../../common/images/LabelingCloseBtn.svg";
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import {inject, observer} from "mobx-react";
import {JobTaskStatus} from "../../../stores/JobStepStore";
import {HistoryControlType, TemplateStepType} from "../../../stores/TemplateStore";

class LabelingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coachMarkOpen : true
        }
    }

    componentWillUnmount() {
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

    render() {
        const { classes, jobStepTaskTransfer } = this.props;
        const { loginUser } = this.props.authStore;
        const { newJobStepTaskText, textHistoryIndex } = this.props.jobStepTaskStore;
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

        const worker =
            jobStepTaskTransfer.workers
            && jobStepTaskTransfer.workers.length > 0 ? jobStepTaskTransfer.workers[0] : null;

        const handleClick = () => {
            console.info('You clicked the Chip.');
        };

        const handleDelete = () => {
            console.info('You clicked the delete icon.');
        };

        return (
            <td>
                <Box className={classes.modifyWrap} style={{boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.25)'}}>

                    <Box style={{}} className={classes.translationBar}>
                        <Typography>문장 평가</Typography>

                        <Box style={{display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', marginLeft: '-20px'}}>
                            <Typography style={{marginLeft: 20}}>라벨링</Typography>
                        </Box>

                        <Box className={classes.btnWrap} style={{display: 'flex', alignItems: 'center', }}>
                            <Tooltip title="">
                                <IconButton onClick={() => this.handleChangeText(preJobStepTaskText.text)} disableRipple>
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
                                value={preJobStepTaskText && preJobStepTaskText.text}
                                disabled={true}
                            />
                            <Typography style={{color: '#323232', fontSize: '1.75rem', lineHeight: '36px',}}>그럼 저녁메뉴는
                                <span>
                                    김치볶음밥
                                    <Box className={classes.toolTipBoxWrap} >
                                        <Box style={{marginBottom: '-9px', textAlign: 'center'}}><TopTooltipUpIcon/></Box>
                                        <Box className={classes.toolTipBoxInner}>
                                            <Box className={classes.toolTipBoxTop}>
                                                <Typography style={{fontSize: '1rem', fontWeight: 'bold'}}>태깅종류</Typography>
                                                <IconButton disableRipple>
                                                    <RightClosetBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner}><LabelProgressIcon1/> 정확성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner} style={{borderLeft: '5px solid #FFCF23',}}><LabelProgressIcon2/>  명확성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner} style={{borderLeft: '5px solid #376FFF',}}><LabelProgressIcon3/>  유창성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner} style={{borderLeft: '5px solid #3CCC65',}}><LabelProgressIcon4/>  결속성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner} style={{borderLeft: '5px solid #000',}}><LabelProgressIcon5/>  간결성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipList} >
                                                <Box className={classes.listInner} style={{borderLeft: '5px solid #CB00CF',}}><LabelProgressIcon6/>  일관성</Box>
                                                <IconButton disableRipple>
                                                    <RightCursorBtn/>
                                                </IconButton>
                                            </Box>
                                            <Box className={classes.toolTipBoxBottom}>
                                                <Tooltip title="초기화">
                                                    <IconButton disableRipple>
                                                        <RightResetBtn/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </Box>
                                </span>으로 하자
                            </Typography>
                        </Box>
                        <Box className={classes.textArea} style={{borderRight: 0}}>
                            <TextField
                                id="standard-multiline-static"
                                multiline
                                rows={3}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                // value={newJobStepTaskText.text}
                                value={
                                    (jobStepTaskTransfer.status === JobTaskStatus.Completed
                                    || jobStepTaskTransfer.status === JobTaskStatus.Accepted) ? jobStepTaskText.text : newJobStepTaskText.text
                                }
                                disabled={jobStepTaskTransfer.status === JobTaskStatus.Completed || jobStepTaskTransfer.status === JobTaskStatus.Accepted}
                                onChange={(e) => this.handleChangeText(e.target.value)}
                            />
                            <Box className={classes.labelingArea}>
                                <Box style={{display: 'flex'}}>
                                    <Typography>김치볶음밥</Typography>
                                    <Box><IconButton disableRipple><LabelingCloseBtn/></IconButton></Box>
                                </Box>
                                <Box className={classes.labelingText}>명확성 > 원문오류</Box>
                            </Box>
                        </Box>
                    </Box>


                    <Box style={{display: 'flex', }}>
                        <Box className={classes.buttonArea}>
                        </Box>
                        <Box className={classes.buttonArea} style={{borderRight: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Box  style={{display: 'flex', }}>
                                <Box className={classes.iconButtonStyle}>
                                    <Button disableRipple>
                                        <ClipBoardIcon/>
                                        <Typography>전문보기</Typography>
                                    </Button>
                                </Box>
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
                                        onClick={this.handleCloseTableLow}
                                        disableRipple>
                                    <Typography>취소</Typography>
                                </Button>
                                <Button onClick={this.saveJobStepTask}
                                        disabled={(jobStepTaskTransfer.status === JobTaskStatus.Completed
                                            || jobStepTaskTransfer.status === JobTaskStatus.Accepted)
                                            || loginUser.id !== worker.userId
                                }
                                        disableRipple>
                                    <Typography>완료</Typography>
                                </Button>

                                {/*{this.state.coachMarkOpen &&*/}
                                {/*    <Box className={classes.tooltipBoxBtn} style={{position: 'absolute'}}>*/}
                                {/*        <Box className={classes.tooltipBoxInBtn}>*/}
                                {/*            <Box className={classes.tooltipTitleBox}>*/}
                                {/*                <Typography style={{color: '#fff', marginBottom: 10,}}>*/}
                                {/*                    완료*/}
                                {/*                </Typography>*/}
                                {/*                <Typography style={{color: '#fff', fontWeight: 500, marginBottom: 20,}}>*/}
                                {/*                    교정을 하지 않아도 '완료' 버튼을 눌러야 작업이 수행됩니다.*/}
                                {/*                </Typography>*/}
                                {/*                <Button className={classes.tooltipBoxCheck}*/}
                                {/*                        style={{background: '#fff', width: 85, height: 36}}*/}
                                {/*                        onClick={this.handleCloseCoachMark}*/}
                                {/*                        disableRipple>*/}
                                {/*                    <Typography*/}
                                {/*                        style={{color: '#65615C', fontWeight: 500, fontSize: '0.875rem'}}>확인</Typography>*/}
                                {/*                </Button>*/}
                                {/*            </Box>*/}
                                {/*        </Box>*/}
                                {/*        <Box className={classes.tooltipArrowBtn}>*/}
                                {/*            <TooltipArrowDown/>*/}
                                {/*        </Box>*/}
                                {/*    </Box>*/}
                                {/*}*/}

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </td>
        );
    }
}

export default withStyles(styles)(
    inject('jobStepTaskStore', 'workStore', 'authStore')(
        observer(LabelingComponent)
    )
);
