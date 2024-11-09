import React, { Component } from 'react';
import { withStyles } from "@mui/styles";
import { styles } from "./styles/WorkGroupStyle";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Tab,
    Button,
    IconButton,
    Tabs,
    ToggleButton,
    ToggleButtonGroup,
    Typography, Popover, MenuList
} from "@mui/material";
import clsx from "clsx";
import {ReactComponent as GroupAddPlus} from "../../../../common/images/GroupAddPlus.svg";
import {ReactComponent as WorkerInviteBtn} from "../../../../common/images/WorkerInviteBtn.svg";
import { ReactComponent as FileTextIcon } from '../../../../common/images/FileTextIcon.svg';
import { ReactComponent as TempalteDownloadIcon } from '../../../../common/images/TempalteDownloadIcon.svg';
import TemplateDialog from "../taskList/TemplateDialog";
import TemplateDialog2 from "../taskList/TemplateDialog2";
import CommonDialog from "../../../dialog/CommonDialog";
import TemplateGroupDialog from "../../../dialog/TemplateGroupDialog";

class TabBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            registrationAnchorEl: null,
        };
    }

    handleChangeTab = (event, tabIndex) => {
        this.setState({ tabIndex });
    };

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
        this.setState({workerDialogOpen: true});
    };

    handleClickWorkerDialog2 = () => {
        this.setState({workerDialogOpen2: true});
    };



    render() {
        const { classes } = this.props;
        const { tabIndex } = this.state;
        const { registrationAnchorEl, periodAnchorEl } = this.state;
        const registrationOpen = Boolean(registrationAnchorEl);

        return (
            <div>
                <Box className={classes.seachBoxOuter}>
                    <Box>
                        <Tabs value={tabIndex} onChange={this.handleChangeTab} className={classes.trigger}>
                            <Tab value={0} label={'작업자'} disableRipple />
                            <Tab value={1} label={'작업 그룹'} disableRipple />
                        </Tabs>
                    </Box>
                    <Box>
                        <IconButton className={classes.downloadIcon} onClick={this.handleClickWorkerDialog2} disableRipple><TempalteDownloadIcon/></IconButton>
                        <Button className={classes.addGroupBtn} onClick={this.handleClickWorkerDialog} disableRipple><GroupAddPlus/><Typography>그룹 추가</Typography></Button>
                        <Button className={classes.buildTemplateBtn} onClick={this.handleClickRegistration} disableRipple>
                            <Typography>작업자 초대</Typography><WorkerInviteBtn/>
                        </Button>
                        <Popover
                            id="simple-popper"
                            open={registrationOpen}
                            anchorEl={registrationAnchorEl}
                            onClose={this.handleClosePopover}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
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

                </Box>

                <TemplateGroupDialog
                    open={this.state.workerDialogOpen}
                    onClose={this.handleCloseDialog}
                    title={<span><b>그룹</b> 추가</span>}
                    submitText={'추가하기'}
                    onClick={this.saveWorkUploadUsers}
                    children={<TemplateDialog/>}
                />

                <TemplateGroupDialog
                    open={this.state.workerDialogOpen2}
                    onClose={this.handleCloseDialog}
                    title={<span><b>작업자</b> 초대</span>}
                    submitText={'초대하기'}
                    onClick={this.saveWorkUploadUsers}
                    children={<TemplateDialog2/>}
                />


            </div>
        );
    }
}

export default withStyles(styles)(TabBox);
