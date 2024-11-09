import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/UploadDialogStyle";
import {Box, Button, Dialog} from "@mui/material";
import {DropzoneArea} from 'material-ui-dropzone'
import {ReactComponent as DragIcon} from "../../../../common/images/DragIcon.svg";
import {inject, observer} from "mobx-react";


const dropzoneText = '이곳을 눌러 Excel 파일을 선택하거나 마우스로 끌어오세요. 용량이 큰 경우 표시되기까지 몇 분 정도 걸릴 수 있습니다.';
class UploadDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    uploadFiles = (files) => {
        this.setState({files: files});
    }

    saveUploadedFiles = async () => {
        const { selectedWorkTemplateStep, selectedWork } = this.props.workStore;
        const { loginUser } = this.props.authStore;
        const { files } = this.state;

        await this.props.jobStore.createUploadJob(loginUser.id, selectedWork.work.id, selectedWorkTemplateStep, files);
        const {workTemplateId, workTemplateStepNum} = this.props.workStore.selectedWorkTemplateStep;
        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
        this.props.onClose();
    }


    render() {
        const { classes, open, onClose } = this.props;

        return (
            <Dialog
                open={open}
                onClose={onClose}
                className={classes.dialogBox}
            >
                <Box className={classes.dropzoneBox}>
                    <DropzoneArea
                        onChange={this.uploadFiles}
                        Icon={DragIcon}
                        dropzoneText={dropzoneText}
                    />
                </Box>
                <Button className={classes.buttonStyle}
                        onClick={this.saveUploadedFiles}
                        disableRipple>
                    파일 올리기
                </Button>
            </Dialog>
        );
    }
};

export default withStyles(styles) (
    inject('workStore', 'authStore', 'jobStore', 'jobStepStore') (
        observer(UploadDialog)
    )
);