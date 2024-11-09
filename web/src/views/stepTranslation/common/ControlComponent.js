import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/ControlStyle";
import {Box, Button, Typography} from "@mui/material";
import TranslationBar from "../translationBar/TranslationBar";
import {ReactComponent as DueDateIcon} from "../../../common/images/DueDateIcon.svg";
import PeriodPopover from "../calendar/PeriodPopover";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";
import UploadControlComponent from "./constrol/UploadControlComponent";
import {TemplateStepType} from "../../../stores/TemplateStore";
import UploadDialog from "../upload/dialog/UploadDialog";
import CommonDialog from "../../dialog/CommonDialog";
import WorkersAssignmentUpload from "../upload/dialog/WorkersAssignmentUpload";

class InspectionControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            periodAnchorEl: null,
        }
    }
    componentDidMount() {
        const { selectedWorkTemplateStep } = this.props.workStore;
        this.props.deadlineStore.getDeadline(selectedWorkTemplateStep);
    }

    handleClickPeriod = event => {
        this.setState({
            periodAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            periodAnchorEl: null,
        });
    };
    handleClickDownload = async () =>{
        if(this.props.jobStepTaskResultStore.checkedJobList.length === 0  && this.props.jobStepTaskResultStore.checkedJobStepTaskList.length === 0){
            alert('파일 또는 문장을 선택해주세요.');
            return;
        }
        if(this.props.authStore.loginUser.id !== this.props.workStore.selectedWork.work.userId){
            alert('작업 생성자가 아닙니다.');
            return;
        }

        const data = await this.props.jobStepTaskResultStore.requestDownload(this.props.authStore.loginUser.id, this.props.workStore.selectedWorkTemplateStep.workTemplateId,this.props.workStore.selectedWorkTemplateStep.workTemplateStepNum);
        //const jsonData = JSON.stringify(data).slice(1,-1);
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const downloadUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'data.json';
        downloadLink.click();
        downloadLink.remove();
        window.URL.revokeObjectURL(downloadUrl);
    }

    render() {
        const { classes } = this.props;
        const { periodAnchorEl } = this.state;
        const { selectedWorkTemplateStep } = this.props.workStore;
        const { createdCount, completedCount} = this.props.jobStepStore;
        const periodOpen = Boolean(periodAnchorEl);
        const {deadline} = this.props.deadlineStore;

        //getDeadline
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

        return (
            <div className={classes.root}>
                <Box className={classes.leftBox}>
                    <Box className={classes.displayFlex}>
                        <Typography className={classes.buttonTextStyle}>{selectedWorkTemplateStep.type === TemplateStepType.Export ? '다운로드 가능일:' : '완료일:'}</Typography>
                        <Button className={classes.dateButton} onClick={this.handleClickPeriod} disableRipple>
                            { isNaN(dayjs(deadline.deadlineDatetime).year()) === false && dayjs(deadline.deadlineDatetime).year() !== 9999 ?
                                <span>{dayjs(deadline.deadlineDatetime).format("~YYYY-MM-DD")} ({dayOfWeek[dayjs(deadline.deadlineDatetime).day()]})</span>
                                : <>
                                    <DueDateIcon/>
                                    <span>기한 지정</span>
                                </>}
                        </Button>

                        <PeriodPopover open={periodOpen} anchorEl={periodAnchorEl} onClose={this.handleClosePopover} stepName={selectedWorkTemplateStep.name}/>
                    </Box>

                    <Box className={classes.displayFlex}>
                        <Typography className={classes.textStyle}>
                            진행 중 / 진행 완료
                            <span className={classes.numberText}> <span>{createdCount}</span> / {completedCount}</span>
                        </Typography>
                    </Box>
                </Box>

                {selectedWorkTemplateStep.type === TemplateStepType.Upload &&
                    <UploadControlComponent />
                }

                {selectedWorkTemplateStep.type === TemplateStepType.Export &&
                    <Button className={classes.buttonStyle}  onClick={this.handleClickDownload} disableRipple>다운로드</Button>
                }

                {selectedWorkTemplateStep.type !== TemplateStepType.Upload && selectedWorkTemplateStep.type !== TemplateStepType.Export &&
                    <TranslationBar/>
                }

            </div>
        );
    }
};
export default withStyles(styles) (
    inject('jobStepStore','workStore', 'deadlineStore', 'authStore','jobStepTaskResultStore') (
        observer(InspectionControlComponent)
    )
);