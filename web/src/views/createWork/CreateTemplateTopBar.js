import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateTopBarStyle";
import {Box, Button, IconButton, TextField, Typography, Tooltip, MenuList, MenuItem, Popover} from "@mui/material";
import {ReactComponent as BasicServiceLogo} from "../../common/images/BasicServiceLogin.svg";
import {ReactComponent as CreateTemplateTopBackIcon} from "../../common/images/CreateTemplateTopBackIcon.svg";
import {ReactComponent as ArrowCounterClockwise} from "../../common/images/ArrowCounterClockwise.svg";
import {withRouter} from "../../components/WithRouter";
import clsx from "clsx";
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import CommonDialog from "../dialog/CommonDialog";
import NewCreateTemplate from "./NewCreateTemplate";
import {inject, observer} from "mobx-react";
import {HistoryControlType, MachineType, TemplateStepType} from "../../stores/TemplateStore";


class CreateTemplateTopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            anchorEl: null,
            dialogOpen: false,
        };
    }


    handleClickEdit = () => {
        this.setState({ edit: true });
    };

    handleClickSave = () => {
        this.setState({ edit: false });
    };

    handleChangeNewWorkName = (e) => {
        this.props.workStore.changeNewWorkName(e.target.value);
    };

    handleChangeNewTemplateName = (e) => {
        this.props.templateStore.changeNewTemplateName(e.target.value);
    };

    goToBack = () => {
        this.props.navigate('/create');
    }

    handleClickHome = () => {
        this.props.navigate('/');
    };

    handleClickPopover = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            anchorEl: null,
        });
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
        const { id } = this.props.authStore.loginUser;
        const { templateId } = this.props.params;
        if(templateId==='new'){
            this.props.templateStore.makeNewPrivateTemplate(id, this.createWorkTemplateAndWork);
            this.handleCloseDialog();
        }
        else{
            this.props.templateStore.makeNewTemplate(id, this.handleCloseDialog);
            this.handleCloseDialog();
        }
    }

    handleChangeTemplateStepFromHistory = (type) => {
        this.props.templateStore.changeTemplateStepFromHistory(type);
    }

    handleClickSaveAndWorkStart = () =>{
        if(!this.hanleCheckTemplateSteps())
            return;

        const { templateId } = this.props.params;
        if(templateId==='new')
            this.handleClickDialog();
        else
            this.createWorkTemplateAndWork();
    }

    createWorkTemplateAndWork = () => {
        // this.props.templateStore.addTemplateRejectOption();

        const { newWork } = this.props.workStore;
        const { loginUser } = this.props.authStore;

        // this.props.templateStore.createWorkTemplateAndWork(loginUser.id, newWork, this.props.navigate);
    }

    hanleCheckTemplateSteps = () =>{
        if(this.props.templateStore.templateErrorArr.length>0)
        {
            alert("템플릿의 스텝 사이에 호환 오류가 있습니다.");
            return false;
        }
        for(let i =0;i< this.props.templateStore.templateSteps.length;i++)
        {
        // /console.log(this.props.templateStore.templateSteps[i]);
            if(this.props.templateStore.templateSteps[i].type === TemplateStepType.Machine)
            {
                if(this.props.templateStore.templateSteps[i].options === null){
                alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                return false;
            }
            else if(this.props.templateStore.templateSteps[i].options.machineType !== null && this.props.templateStore.templateSteps[i].options.machineType !== undefined)
            {
                if(this.props.templateStore.templateSteps[i].options.machineType === MachineType.MachineTranslation)
                {
                    if(!this.props.templateStore.templateSteps[i].options.engine || !this.props.templateStore.templateSteps[i].options.sourceLang
                    || !this.props.templateStore.templateSteps[i].options.targetLang)
                    {
                    alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                    return false;
                    }
                }
                else {
                        if(!this.props.templateStore.templateSteps[i].options.engine || !this.props.templateStore.templateSteps[i].options.sourceLang)
                        {
                            alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                            return false;
                        }
                    }
            }
            else {
                alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                return false;
                }
            }
                else if(this.props.templateStore.templateSteps[i].type !== TemplateStepType.Editing &&
                this.props.templateStore.templateSteps[i].type !== TemplateStepType.Refine &&
                this.props.templateStore.templateSteps[i].type !== TemplateStepType.Export)
            {
                console.log(this.props.templateStore.templateSteps[i]);
                if(this.props.templateStore.templateSteps[i].options === null || !this.props.templateStore.templateSteps[i].options)
            {
                console.log(this.props.templateStore.templateSteps[i]);
                alert('옵션 중 선택 하지 않은 옵션이 있습니다.')
                return false;
            }
          }
        }
        return true;
    }
    
    render() {
        const { classes } = this.props;
        const { newTemplate, templateStepHistoryIndex, templateStepHistories } = this.props.templateStore;
        const { newWork } = this.props.workStore;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <Box className={classes.root}>
                <Box display='flex' alignItems='center'>
                    <Box className={classes.logoBox}
                         onClick={this.handleClickHome}>
                        <BasicServiceLogo/>
                    </Box>

                    <Tooltip
                        title="홈으로 나가기"
                        placement="bottom"
                        classes={{
                            tooltip: classes.lightTooltip,
                        }}
                    >
                        <IconButton onClick={this.handleClickHome}
                                    className={classes.iconButton}
                                    disableRipple>
                            <CreateTemplateTopBackIcon/>
                        </IconButton>
                    </Tooltip>

                    <Box className={classes.titleBox}>
                        {this.state.edit ?
                            <Box display='flex' alignItems='center'>
                                <TextField
                                    id="outlined-bare"
                                    className={classes.textField}
                                    placeholder='일감 제목을 입력하세요. (최대 200자)'
                                    margin="normal"
                                    variant="outlined"
                                    value={newWork.name}
                                    onChange={this.handleChangeNewWorkName}
                                />
                                <Button className={classes.saveButton} onClick={this.handleClickSave} disabled={newWork.name === ''} disableRipple>저장</Button>
                            </Box>
                            :
                            <>
                                <Typography className={classes.titleText}>{newWork.name}</Typography>
                                <Button className={classes.editButton} onClick={this.handleClickEdit} disableRipple>Edit name</Button>
                            </>
                        }
                    </Box>
                </Box>

                <Box display='flex' alignItems='center'>
                    <Tooltip
                        title="실행 취소"
                        placement="bottom"
                        classes={{
                            tooltip: classes.lightTooltip,
                        }}>
                        <span>
                        <IconButton className={classes.iconButton}
                                    onClick={()=> this.handleChangeTemplateStepFromHistory(HistoryControlType.Previous)}
                                    disabled={templateStepHistoryIndex < 2}
                                    disableRipple>
                            <ArrowCounterClockwise/>
                        </IconButton>
                        </span>
                    </Tooltip>

                    <Tooltip
                        title="다시 실행"
                        placement="bottom"
                        classes={{
                            tooltip: classes.lightTooltip,
                        }}>
                        <span>
                        <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                    onClick={()=> this.handleChangeTemplateStepFromHistory(HistoryControlType.Next)}
                                    disabled={templateStepHistoryIndex === templateStepHistories.length}
                                    disableRipple>
                            <ArrowCounterClockwise style={{transform: 'scaleX(-1)'}}/>
                        </IconButton>
                        </span>
                    </Tooltip>


                    <Box className={classes.buttonStyle}>
                        <Button className={classes.buttonBoxIn}
                                onClick={this.handleClickSaveAndWorkStart}
                                disableRipple>저장하고 작업 시작하기</Button>
                        <Box className={classes.buttonInLine} />
                        <IconButton className={clsx(classes.iconButton, classes.iconButtonBoxIn)} onClick={this.handleClickPopover} disableRipple>
                            <ArrowDownIcon />
                        </IconButton>
                        <Popover
                            id="simple-popper"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={this.handleClosePopover}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            className={classes.popoverBox}
                        >
                            <Box>
                                <MenuList>
                                    <MenuItem onClick={this.handleClickDialog} disableRipple>
                                        새 템플릿으로 저장
                                    </MenuItem>
                                </MenuList>
                            </Box>
                        </Popover>
                    </Box>
                </Box>
                <CommonDialog
                    open={this.state.dialogOpen}
                    onClose={this.handleCloseDialog}
                    onClick={this.makeNewTemplate}
                    title={<span><b>새 템플릿 이름</b>으로 저장</span>}
                    submitText={'저장'}
                    color={'#7500fa'}
                    hoverColor={'#9d4bfb'}
                    children={<NewCreateTemplate textFieldValue={newTemplate.name}
                                                 handleChangTextField={this.handleChangeNewTemplateName}/>
                }
                />
            </Box>
        );
    }
};

export default withRouter(
    withStyles(styles) (
        inject('authStore', 'workStore', 'templateStore') (
            observer(CreateTemplateTopBar)
        )
    )
);