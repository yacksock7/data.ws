import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    TableCell,
    TableRow,
    IconButton,
    Typography,
    Button,
    Stack,
    Avatar,
    TextField, FormControl, Select, MenuItem, Tooltip
} from "@mui/material";
import {ReactComponent as ArrangeUser} from '../../../common/images/ArrangeUser.svg';
import {ReactComponent as TableUserAvatar} from '../../../common/images/TableUserAvatar.svg';
import {inject, observer} from "mobx-react";
import PreviewWorkComponent from "./PreviewWorkComponent";
import {TemplateStepType} from "../../../stores/TemplateStore";
import WorkSheet from "./WorkSheet/WorkSheet";
import {StatusTypeColor} from "../../../stores/JobStepTaskStore";
import {ReactComponent as RemoveFile} from "../../../common/images/RemoveFile.svg";
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as RejectTooltipIcon} from "../../../common/images/RejectTooltipIcon.svg";
import {ReactComponent as TooltipCloseIconBlack} from "../../../common/images/TooltipCloseIconBlack.svg";
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";
import dayjs from "dayjs";
import clsx from "clsx";
import {ReactComponent as TimeHistoryIcon} from "../../../common/images/TimeHistoryIcon.svg";
import PreWorkResultSheet from "./WorkSheet/PreWorkResultSheet";
import {ReactComponent as PlayIcon} from "../../../common/images/PlayIcon.svg";
import {ReactComponent as SoundPauseIcon} from "../../../common/images/SoundPauseIcon.svg";


// import clsx from "clsx";
class ResultComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playButton: false,
        }
    }

    handleResultViewing = async () => {

        const {jobStepTaskTransfer} = this.props;
        const {selectedWorkTemplateStep} = this.props.workStore;

        const preJobStepTaskResult =
            jobStepTaskTransfer.preJobStepTaskResult
                ? jobStepTaskTransfer.preJobStepTaskResult : null;

        const checkedStatus = await this.checkJobTaskStatus(jobStepTaskTransfer.status);
        if (checkedStatus) { // complete
            // resultType 고려
            if (selectedWorkTemplateStep.resultType === "Text") {
                // result value

            } else if (selectedWorkTemplateStep.resultType === "Audio") {

            }
        } else { // non-complete
            // inputType 고려
            if (selectedWorkTemplateStep.inputType === "Text") {
                // input value

            } else if (selectedWorkTemplateStep.inputType === "Audio") {

            }
        }
    }

    checkJobTaskStatus = (value) => {
        switch (JobTaskStatus[value]) {
            case JobTaskStatus.Waiting :
            case JobTaskStatus.Created :
            case JobTaskStatus.Assigned :
            case JobTaskStatus.Failed :
            case JobTaskStatus.Rejected :
                return false;
                break;

            case JobTaskStatus.RejectWaiting :
            case JobTaskStatus.Completed :
            case JobTaskStatus.Accepted :
                return true;
                break;
        }
    }

    checkResultType = (checkedStatus) => {
        const {selectedWorkTemplateStep} = this.props.workStore;

        if (checkedStatus) { // complete
            return selectedWorkTemplateStep.resultType;
        } else { // non-complete
            return selectedWorkTemplateStep.inputType;
        }
    }

    getResultComponent = (checkedStatus, resultType) => {
        const {jobStepTaskTransfer, handleClickDetailOpen} = this.props;

        const jobStepTaskResults =
            jobStepTaskTransfer.jobStepTaskResults
            && jobStepTaskTransfer.jobStepTaskResults.length > 0
                ? jobStepTaskTransfer.jobStepTaskResults : null;

        const preJobStepTaskResult =
            jobStepTaskTransfer.preJobStepTaskResult
                ? jobStepTaskTransfer.preJobStepTaskResult : null;


        if (checkedStatus) { // complete
            if (resultType === "Text") {
                const result = jobStepTaskResults && jobStepTaskResults.length > 0 && jobStepTaskResults[0].jobStepTaskText ? jobStepTaskResults[0].jobStepTaskText.text : null;
                return (
                    <Typography onClick={handleClickDetailOpen}>
                        {result}
                    </Typography>
                );
            } else if (resultType === "Audio") {
                const result = jobStepTaskResults && jobStepTaskResults.length > 0 && jobStepTaskResults[0].jobStepTaskAudio ? jobStepTaskResults[0].jobStepTaskAudio.downloadUrl : null;
                return this.getAudioComponent(result);
            }
        } else { // non-complete


            if (resultType === "Text") {
                const result = preJobStepTaskResult && preJobStepTaskResult.jobStepTaskText ? preJobStepTaskResult.jobStepTaskText.text : null;
                return (
                    <Typography onClick={handleClickDetailOpen}>
                        {result}
                    </Typography>
                );

            } else if (resultType === "Audio") {
                const result = preJobStepTaskResult && preJobStepTaskResult.jobStepTaskAudio ? preJobStepTaskResult.jobStepTaskAudio.downloadUrl : null;
                return this.getAudioComponent(result);
            }
        }
    }

    getAudioComponent = (value) => {
        const {classes} = this.props;
        return (
            <>
                <audio src={value}
                       id={"audio_tag"}
                       alt="audio"
                       controls={false}
                       className={classes.iconButton2}/>

                <Tooltip title={this.state.playButton ? '재생' : '일시중지'}
                         placement="bottom"
                         classes={{ tooltip: classes.lightTooltip }}>

                    <IconButton className={classes.iconButton2} onClick={this.handleClickPlay} disableRipple>
                        { this.state.playButton ? <SoundPauseIcon/> : <PlayIcon/> }
                    </IconButton>
                </Tooltip>
            </>
        );
    }

    handleClickPlay = () => {
        this.setState({playButton: !this.state.playButton});

        const audio = document.getElementById("audio_tag");
        if (!this.state.playButton) {
            audio.play();
        } else {
            audio.pause();
        }
    };

    render() {
        const {classes, jobStepTaskTransfer} = this.props;

        const checkedStatus = this.checkJobTaskStatus(jobStepTaskTransfer.status);
        const resultType = this.checkResultType(checkedStatus);
        const resultComponent = this.getResultComponent(checkedStatus, resultType);

        return (
            <React.Fragment>
                {resultComponent}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(
    inject('jobRejectStore', 'jobStepTaskStore', 'jobStepTaskResultStore', 'jobStepStore', 'workStore', 'authStore')(
        observer(ResultComponent)
    )
);

