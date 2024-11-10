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
import {JobTaskStatus} from "../../../../stores/JobStepStore";

class WorkSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playButton: false
        }
    }

    handleClickPlay = () => {
        this.setState({playButton: !this.state.playButton});
    };

    render() {
        const {classes, jobStepTaskTransfer, handleClickDetailOpen} = this.props;
        const {jobStepTaskResults, selectedJobStepTask} = this.props.jobStepTaskResultStore;
        const { selectedWorkTemplateStep } = this.props.workStore;
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
                                {jobStepTaskResults
                                    && jobStepTaskResults.length > 0
                                    && jobStepTaskResults.map(result => (
                                        <Box key={`WorkSheet_${result.jobId}_${result.jobStepNum}_${result.jobStepTaskNum}`}
                                             display='flex' className={classes.detailCellBox} style={{height: 48}}>
                                            <Box className={classes.contentsBoxCell}>
                                                <Box display='flex' alignItems='center'>
                                                    <Box className={classes.arrowBoxCell}>
                                                        <ArrowsActionIcon style={{marginRight: 8}}/>

                                                        <Tooltip
                                                            title={selectedWorkTemplateStep.name}
                                                            placement="bottom"
                                                            className={{tooltip: classes.lightTooltip}}>

                                                            {TemplateStepTypeButton[selectedWorkTemplateStep.type]}
                                                        </Tooltip>
                                                    </Box>
                                                    <Typography style={{marginLeft: 20}}>
                                                        {result.resultType === ResultType.Text ?
                                                            result.jobStepTaskText.text : ""}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                {(selectedWorkTemplateStep.type === TemplateStepType.Editing
                                    || selectedWorkTemplateStep.type === TemplateStepType.Refine)
                                    && (jobStepTaskTransfer.status === JobTaskStatus.Assigned
                                        || jobStepTaskTransfer.status === JobTaskStatus.Rejected)
                                    &&
                                    <ModifyComponent jobStepTaskTransfer={jobStepTaskTransfer}
                                                     onClickEvent={this.props.onClickEvent}
                                                     handleClickDetailOpen={handleClickDetailOpen}/>
                                }

                                </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskResultStore', 'workStore')(
        observer(WorkSheet)
    )
);


