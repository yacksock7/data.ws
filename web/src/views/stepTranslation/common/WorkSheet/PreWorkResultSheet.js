import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TableComponentStyle";
import {
    Box, Button,
    Collapse, IconButton,
    TableCell,
    TableRow, Tooltip, Typography,
} from "@mui/material";
import {inject, observer} from "mobx-react";
import {ReactComponent as ArrowsActionIcon} from '../../../../common/images/ArrowsActionIcon.svg';
import {ReactComponent as SoundPauseIcon} from "../../../../common/images/SoundPauseIcon.svg";
import {ReactComponent as PlayIcon} from "../../../../common/images/PlayIcon.svg";
import clsx from "clsx";
import {ResultType, TemplateStepType, TemplateStepTypeButton} from "../../../../stores/TemplateStore";
import ModifyComponent from "./ModifyComponent";

class WorkSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playButton: false
        }
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
        const { preJobResults, selectedJobStepTask } = this.props.jobStepTaskResultStore;
        const { workTemplateStepViewingRoles } = this.props.workTemplateStore;
        const viewingTemplateStepNums = workTemplateStepViewingRoles.map(e => e.viewingTemplateStepNum);
        const open = selectedJobStepTask
            && jobStepTaskTransfer.jobId === selectedJobStepTask.jobId
            && jobStepTaskTransfer.jobStepNum === selectedJobStepTask.jobStepNum
            && jobStepTaskTransfer.jobStepTaskNum === selectedJobStepTask.jobStepTaskNum;

        return (
            <React.Fragment>
                <TableRow style={open ? {display: 'table-row', width:this.props.headerWidth} : {display: 'none'}}>
                    <TableCell colSpan={3} style={{padding: 0}}>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            <Box>
                                {preJobResults && preJobResults.length > 0
                                    && preJobResults.filter(e => viewingTemplateStepNums.includes(e.jobStepNum)).map(preJobResult => (
                                        <Box key={`WorkSheet_${preJobResult.jobId}_${preJobResult.jobStepNum}_${preJobResult.jobStepTaskNum}`}
                                             display='flex' className={classes.detailCellBox} style={{height: 48}}>
                                            <Box className={classes.contentsBoxCell}>
                                                <Box display='flex' alignItems='center'>
                                                    <Box className={classes.arrowBoxCell}>
                                                        {/*<ArrowsActionIcon style={{marginRight: 8, }}/>*/}
                                                        <ArrowsActionIcon style={{marginRight: 8, transform: " scaleY(-1)"}}/>

                                                        <Tooltip
                                                            title={preJobResult.templateStepName}
                                                            placement="bottom"
                                                            className={{tooltip: classes.lightTooltip}}>

                                                            {TemplateStepTypeButton[preJobResult.templateStepType]}
                                                        </Tooltip>
                                                    </Box>
                                                    {preJobResult.resultType === ResultType.Text &&
                                                        <Typography style={{marginLeft: 20}}>
                                                            {preJobResult.jobStepTaskResult.jobStepTaskText.text}
                                                        </Typography>
                                                    }

                                                    {preJobResult.resultType === ResultType.Audio &&
                                                        <>
                                                            <audio src={preJobResult.jobStepTaskResult.jobStepTaskAudio.downloadUrl}
                                                                   id={"audio_tag"}
                                                                   alt="audio"
                                                                   controls={false}
                                                                   className={classes.iconButton2}/>
                                                            <Tooltip
                                                                title={this.state.playButton ? '재생' : '일시중지'}
                                                                placement="bottom"
                                                                classes={{tooltip: classes.lightTooltip}}>

                                                                <IconButton className={classes.iconButton2}
                                                                            onClick={this.handleClickPlay} disableRipple>
                                                                    {this.state.playButton ? <SoundPauseIcon/> : <PlayIcon/> }
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    }
                                                </Box>

                                                <Box display='flex' alignItems='center' justifyContent='center'
                                                     style={{width: 78}}>
                                                    {preJobResult.templateStepType === TemplateStepType.Upload &&
                                                        <Box className={classes.machineBox}>
                                                            <Typography>출발어</Typography>
                                                        </Box>
                                                    }
                                                    {preJobResult.templateStepType === TemplateStepType.Machine &&
                                                        <Box className={classes.machineBox}>
                                                            <Typography>도착어</Typography>
                                                        </Box>
                                                    }
                                                    {preJobResult.templateStepType === TemplateStepType.Correction &&
                                                        <Button className={clsx(classes.contentsButtonCell, classes.contentsButtonCellBlue)} disableRipple>
                                                            {`${preJobResult.templateStepName} 보기`}
                                                        </Button>
                                                    }
                                                    {preJobResult.templateStepType === TemplateStepType.Refine &&
                                                        <Button className={clsx(classes.contentsButtonCell, classes.contentsButtonCellPurple)} disableRipple>
                                                            {`${preJobResult.templateStepName} 보기`}
                                                        </Button>
                                                    }
                                                    {preJobResult.templateStepType === TemplateStepType.Recording &&
                                                        <Tooltip
                                                            title={this.state.playButton ? '재생' : '일시중지'}
                                                            placement="bottom"
                                                            classes={{tooltip: classes.lightTooltip}}>

                                                            <IconButton className={classes.iconButton2}
                                                                        onClick={this.handleClickPlay} disableRipple>
                                                                {this.state.playButton ? <PlayIcon/> : <SoundPauseIcon/>}
                                                            </IconButton>
                                                        </Tooltip>
                                                    }
                                                    {preJobResult.templateStepType === TemplateStepType.Labeling &&
                                                        <Button className={classes.contentsButtonCell} disableRipple>
                                                            {`${preJobResult.templateStepName} 보기`}
                                                        </Button>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskResultStore', 'workTemplateStore', 'workStore')(
        observer(WorkSheet)
    )
);


