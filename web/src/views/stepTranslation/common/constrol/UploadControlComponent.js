import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/UploadControlStyle";
import {Box, Button, Popover, MenuList, MenuItem} from "@mui/material";
import { ReactComponent as FileTextIcon } from '../../../../common/images/FileTextIcon.svg';
import clsx from "clsx";
import UploadDialog from "../dialog/UploadDialog";
import CommonDialog from "../../../dialog/CommonDialog";
import {inject, observer} from "mobx-react";
import WorkersAssignmentUpload from "../dialog/WorkersAssignmentUpload";

class UploadControlComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationAnchorEl: null,
            periodAnchorEl: null,
            dialogOpen: false,
            workerDialogOpen: false,
        }
    }
    componentDidMount() {
        const {selectedWorkTemplateStep} = this.props.workStore
        this.props.deadlineStore.getDeadline(selectedWorkTemplateStep);
    }

    handleClickRegistration = event => {
        this.setState({
            registrationAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            registrationAnchorEl: null,
            periodAnchorEl: null,
        });
    };

    handleClickDialog = () => {
        this.setState({
            dialogOpen: true,
            registrationAnchorEl: null,
        });
    };

    handleClickWorkerDialog = () => {
        const {selectedWork} = this.props.workStore;
        this.props.workUploadUserStore.getWorkUploadUsers(selectedWork.work.id);
        this.setState({workerDialogOpen: true});
    };

    handleCloseDialog = () => {
        this.setState({dialogOpen: false, workerDialogOpen: false});
    };


    saveWorkUploadUsers = () => {
        const { selectedWork } = this.props.workStore;
        this.props.workUploadUserStore.createWorkUploadUsers(selectedWork.work.id);
        this.handleCloseDialog();
    };

    render() {
        const { classes } = this.props;
        const { registrationAnchorEl } = this.state;
        const { selectedWork } = this.props.workStore;
        const { loginUser } = this.props.authStore;

        const registrationOpen = Boolean(registrationAnchorEl);

        return (
            <div className={classes.root}>
                <Box className={classes.displayFlex}>
                    {selectedWork && selectedWork.work && selectedWork.work.userId === loginUser.id &&
                        <Button className={classes.buttonStyle} onClick={this.handleClickWorkerDialog} disableRipple>작업자 배정</Button>
                    }

                    <Button className={clsx(classes.buttonStyle, classes.buttonStyle2)} onClick={this.handleClickRegistration} disableRipple>일감 등록</Button>

                    <Popover
                        id="simple-popper"
                        open={registrationOpen}
                        anchorEl={registrationAnchorEl}
                        onClose={this.handleClosePopover}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
                        transformOrigin={{ vertical: 'top', horizontal: 'center'}}
                        className={classes.popoverBox}
                    >
                        <Box>
                            <MenuList>
                                <MenuItem onClick={this.handleClickDialog} disableRipple>
                                    <FileTextIcon/>
                                    <span>파일 단위로 등록</span>
                                </MenuItem>
                            </MenuList>

                            <Box className={classes.buttonBox}>
                                <Button className={classes.popoverButton} disableRipple>등록 양식 받기</Button>
                            </Box>
                        </Box>
                    </Popover>
                </Box>


                {/* 일감 등록 dialog */}
                <UploadDialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}/>

                {/* 작업자 배정 dialog */}
                <CommonDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>업로드</b> 단계 작업자 배정</span>}
                    submitText={'배정하기'}
                    onClick={this.saveWorkUploadUsers}
                    children={<WorkersAssignmentUpload/>}
                />
            </div>
        );
    }
}

export default withStyles(styles) (
    inject('authStore', 'workStore', 'workUploadUserStore', 'jobStepStore','deadlineStore') (
        observer(UploadControlComponent)
    )
);