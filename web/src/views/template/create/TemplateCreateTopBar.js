import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "../../../components/WithRouter";
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateTopBarStyle";

import {ReactComponent as BasicServiceLogo} from "../../../common/images/BasicServiceLogin.svg";
import {ReactComponent as CreateTemplateTopBackIcon} from "../../../common/images/CreateTemplateTopBackIcon.svg";

import {Box, Button, IconButton, Tooltip, MenuList, MenuItem, Popover} from "@mui/material";

import CommonDialog from "../../dialog/CommonDialog";
import NewCreateTemplate from "../../createWork/NewCreateTemplate";
import {MachineType, TemplateStepType} from "../../../stores/TemplateStore";
import TemplateHistoryController from "./TemplateHistoryController";

class CreateTemplateTopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
    }

    handleChangeNewTemplateName = (e) => {
        this.props.templateStore.changeNewTemplateName(e.target.value);
    };

    handleClickHome = () => {
        this.props.navigate('/');
    };

    handleOpenDialog = () => {
        const { dialogOpen } = this.state;
        this.setState({ dialogOpen: !dialogOpen });
    };

    handleClickDialog = () => {
        this.setState({
            dialogOpen: true
        });
    };

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
        });
    };

    makeNewTemplate = () => {
        const {id} = this.props.authStore.loginUser;
        const {templateId} = this.props.params;
        if (templateId === 'new') {
            this.props.templateStore.makeNewPrivateTemplate(id, this.createWorkTemplateAndWork);
        } else {
            this.props.templateStore.makeNewTemplate(id);
        }
        this.handleOpenDialog();
    }

    createWorkTemplateAndWork = () => {
        this.props.templateStore.addTemplateRejectOption();

        const {newWork} = this.props.workStore;
        const {loginUser} = this.props.authStore;

        this.props.templateStore.createWorkTemplateAndWork(loginUser.id, newWork, this.props.navigate);
    }

    hanleCheckTemplateSteps = () => {
        if (this.props.templateStore.templateErrorArr.length > 0) {
            alert("템플릿의 스텝 사이에 호환 오류가 있습니다.");
            return false;
        }
        for (let i = 0; i < this.props.templateStore.templateSteps.length; i++) {
            if (this.props.templateStore.templateSteps[i].type === TemplateStepType.Machine) {
                if (this.props.templateStore.templateSteps[i].options === null) {
                    alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                    return false;
                } else if (this.props.templateStore.templateSteps[i].options.machineType !== null && this.props.templateStore.templateSteps[i].options.machineType !== undefined) {
                    if (this.props.templateStore.templateSteps[i].options.machineType === MachineType.MachineTranslation) {
                        if (!this.props.templateStore.templateSteps[i].options.engine || !this.props.templateStore.templateSteps[i].options.sourceLang
                            || !this.props.templateStore.templateSteps[i].options.targetLang) {
                            alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                            return false;
                        }
                    } else {
                        if (!this.props.templateStore.templateSteps[i].options.engine || !this.props.templateStore.templateSteps[i].options.sourceLang) {
                            alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                            return false;
                        }
                    }
                } else {
                    alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                    return false;
                }
            } else if (this.props.templateStore.templateSteps[i].type !== TemplateStepType.Correction &&
                this.props.templateStore.templateSteps[i].type !== TemplateStepType.Refine &&
                this.props.templateStore.templateSteps[i].type !== TemplateStepType.Export) {
                console.log(this.props.templateStore.templateSteps[i]);
                if (this.props.templateStore.templateSteps[i].options === null || !this.props.templateStore.templateSteps[i].options) {
                    console.log(this.props.templateStore.templateSteps[i]);
                    alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        const {classes} = this.props;
        const {newTemplate} = this.props.templateStore;
        const {dialogOpen} = this.state;

        return (
            <Box className={classes.root}>

                {/* 로고 + 뒤로가기 */}
                <Box display='flex' alignItems='center'>
                    <Box className={classes.logoBox}
                         onClick={this.handleClickHome}>
                        <BasicServiceLogo/>
                    </Box>

                    <Tooltip title="홈으로 나가기"
                             placement="bottom"
                             classes={{tooltip: classes.lightTooltip }}>
                        <IconButton onClick={this.handleClickHome}
                                    className={classes.iconButton}
                                    disableRipple>
                            <CreateTemplateTopBackIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* history controller + 저장 버튼 */}
                <Box display='flex' alignItems='center'>
                   <TemplateHistoryController/>

                    <Box className={classes.buttonStyle}>
                        <Button className={classes.buttonBoxIn}
                                onClick={this.handleOpenDialog}
                                disableRipple>템플릿 생성</Button>
                    </Box>
                </Box>

                <CommonDialog open={dialogOpen}
                              color={'#7500fa'}
                              hoverColor={'#9d4bfb'}
                              title={<span><b>새 템플릿 이름</b>으로 저장</span>}
                              submitText={'저장'}
                              onClose={this.handleCloseDialog}
                              onClick={this.makeNewTemplate}
                              children={<NewCreateTemplate textFieldValue={newTemplate.name} handleChangTextField={this.handleChangeNewTemplateName}/>}/>
            </Box>
        );
    }
};

export default withRouter(
    withStyles(styles)(
        inject('authStore', 'workStore', 'templateStore')(
            observer(CreateTemplateTopBar)
        )
    )
);