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
        const { selectedWorkTemplateStep } = this.props.workStore;

        //getDeadline

        return (
            <div className={classes.root}>
                <Box></Box>

                {selectedWorkTemplateStep.type === TemplateStepType.Upload &&
                    <UploadControlComponent />
                }

                {selectedWorkTemplateStep.type === TemplateStepType.Export &&
                    <Button className={classes.buttonStyle}  onClick={this.handleClickDownload} disableRipple>다운로드</Button>
                }

                {/*{selectedWorkTemplateStep.type !== TemplateStepType.Upload*/}
                {/*    && selectedWorkTemplateStep.type !== TemplateStepType.Export &&*/}
                {/*    <TranslationBar/>*/}
                {/*}*/}

            </div>
        );
    }
};
export default withStyles(styles) (
    inject('jobStepStore','workStore', 'authStore','jobStepTaskResultStore') (
        observer(InspectionControlComponent)
    )
);