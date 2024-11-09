import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/StepperSettingComponentStyles";
import {Box, Button, IconButton, Popover, Switch, Typography} from "@mui/material";
import {ReactComponent as TooltipCloseIconBlack} from "../../../common/images/TooltipCloseIconBlack.svg";
import {ReactComponent as SettingsIcon} from "../../../common/images/SettingsIcon.svg";
import {ReactComponent as SmallRecIcon} from "../../../common/images/SmallRecIcon.svg";
import {ReactComponent as SmallMachineIcon} from "../../../common/images/SmallMachineIcon.svg";
import {ReactComponent as SmallLabelingIcon} from "../../../common/images/SmallLabelingIcon.svg";
import {ReactComponent as SmallCorrectionIcon} from "../../../common/images/SmallCorrectionIcon.svg";
import {ReactComponent as SmallSwapIcon} from "../../../common/images/SmallSwapIcon.svg";
import {inject, observer} from "mobx-react";
import {TemplateStepTypeButton, TemplateStepTypeLabel} from "../../../stores/TemplateStore";

class StepperSettingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchRec: true,
            switchMachine: false,
            switchLabeling: true,
            switchCorrection: true,
            switchSwap: true,
            switchInspection: true,
        }
    }

    handleChangeRec = (event) => {
        this.setState({
            switchRec: event.target.checked,
        });
    };

    handleChangeMachine = (event) => {
        this.setState({
            switchMachine: event.target.checked,
        });
    };

    handleChangeLabeling = (event) => {
        this.setState({
            switchLabeling: event.target.checked,
        });
    };

    handleChangeCorrection = (event) => {
        this.setState({
            switchCorrection: event.target.checked,
        });
    };

    handleChangeSwap = (event) => {
        this.setState({
            switchSwap: event.target.checked,
        });
    };

    handleChangeInspection = (event) => {
        this.setState({
            switchInspection: event.target.checked,
        });
    };

    isCheckedWorkTemplateStepViewingRoles = (stepNum) => {
        const {workTemplateStepViewingRoles} = this.props.workTemplateStore;
        const isChecked = workTemplateStepViewingRoles.find(role => role.viewingTemplateStepNum === stepNum);
        return !!isChecked;
    }

    handleChangeWorkTemplateStepViewingRoles = (stepNum) => {
        const {workTemplateId, workTemplateStepNum} = this.props.selectedWorkTemplateStep;
        this.props.workTemplateStore.changeWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum, stepNum)
    }

    saveWorkTemplateStepViewingRoles = async () => {
        const {workTemplateId, workTemplateStepNum} = this.props.selectedWorkTemplateStep;
        await this.props.workTemplateStore.saveWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
        this.props.workTemplateStore.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
        this.props.workTemplateStore.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    render() {
        const { classes, open, handleCloseSetting, anchorEl, selectedWorkTemplateStep } = this.props;
        const { preWorkTemplateSteps } = this.props.workTemplateStore;

        return (
            <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseSetting}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'center'}}
                PaperProps={{style: {backgroundColor: "transparent", boxShadow: "none", borderRadius: 0}}}
            >
                <Box sx={{position: "relative", mb: "10px", "&::before": {backgroundColor: "#323232", content: '""', display: "block", position: "absolute", width: 20, height: 20, bottom: -25, transform: "rotate(45deg)", left: '50%'}}}/>

                <Box className={classes.popoverBox}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box className={classes.titleBox}>
                            <SettingsIcon/>
                            <Typography>이전 단계 작업 노출 설정</Typography>
                        </Box>
                        <IconButton className={classes.iconButton} onClick={handleCloseSetting} disableRipple>
                            <TooltipCloseIconBlack/>
                        </IconButton>
                    </Box>

                    <Typography className={classes.textStyle}>
                        * 작업자에게 노출하는 단계를 선택해주세요.<br/>
                        &nbsp;&nbsp;해당 단계의 결과물이 작업자에게 보여집니다.
                    </Typography>

                    <Box display='flex' flexWrap='wrap' justifyContent='space-between'>
                        {preWorkTemplateSteps && preWorkTemplateSteps.length > 0 ? (
                                preWorkTemplateSteps.map(step => (
                                        <Box className={classes.listBox}>
                                            {TemplateStepTypeButton[step.type]}
                                            <Typography className={classes.nameText}>{TemplateStepTypeLabel[step.type]}</Typography>
                                            <Box className={classes.switchBox}>
                                                <Typography>
                                                    {this.isCheckedWorkTemplateStepViewingRoles(step.workTemplateStepNum) ? '노출' : '미노출'}
                                                </Typography>
                                                <Switch disableRipple
                                                        checked={this.isCheckedWorkTemplateStepViewingRoles(step.workTemplateStepNum)}
                                                        onChange={() => this.handleChangeWorkTemplateStepViewingRoles(step.workTemplateStepNum)}
                                                        disabled={step.workTemplateId === selectedWorkTemplateStep.workTemplateId && step.workTemplateStepNum === (selectedWorkTemplateStep.workTemplateStepNum-1)}
                                                        value={TemplateStepTypeLabel[step.type]} />
                                            </Box>
                                        </Box>
                                ))
                        )
                        :
                            (<Typography> 업로드 입니다.</Typography>)
                        }
                    </Box>

                    <Box display='flex' justifyContent='flex-end'>
                        <Button className={classes.buttonStyle}
                                onClick={this.saveWorkTemplateStepViewingRoles}
                                disableRipple>
                            설정 완료
                        </Button>
                    </Box>
                </Box>
            </Popover>
        );
    }
};

export default withStyles(styles) (
    inject('workTemplateStore', 'workStore')(
        observer(StepperSettingComponent)
    )
);