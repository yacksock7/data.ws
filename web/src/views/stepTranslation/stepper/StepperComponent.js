import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/StepperComponentStyles";
import {
    Box,
    Button,
    Step,
    Stepper,
    StepLabel,
    StepButton,
    StepContent, StepConnector, Typography,
} from "@mui/material";
import clsx from "clsx";
import StepperInfoComponent from "./StepperInfoComponent";
import {inject, observer} from "mobx-react";
import {TemplateStepType} from "../../../stores/WorkTemplateStore";
import {ReactComponent as SettingsIcon} from '../../../common/images/SettingsIcon.svg';
import StepperSettingComponent from "./StepperSettingComponent";

const QontoConnector = withStyles({
    alternativeLabel: {
    },
    active: {
        '& $line': {
            border: '2px solid #7500fa',
            borderColor: '#7500fa !important',
        },
    },
    completed: {
        '& $line': {
            border: '2px solid #7500fa',
            borderColor: '#7500fa !important',
        },
    },
    line: {
        border: '2px dashed #323232',
        opacity: '0.6 !important',
        borderColor: '#323232 !important',
        borderTopWidth: '0 !important',
        borderTopStyle: 'none !important',
    },
})(StepConnector);

class StepperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        }
    }

    componentDidMount() {
        const { workTemplateId, workTemplateStepNum } = this.props.workStore.selectedWorkTemplateStep;
        this.props.workTemplateStore.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
        this.props.workTemplateStore.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    }

    handleChangeSelectedWorkStep = async (workTemplateStepNum, state) => {

        await this.props.workStore.changeSelectedWorkStep(workTemplateStepNum, state);


        const { selectedWorkTemplateStep } = this.props.workStore;
        const { loginUser } = this.props.authStore;

        this.props.jobStepTaskResultStore.initCheckedList();
        this.props.jobStepTaskResultStore.changePreJobResult([]);
        this.props.jobStepTaskResultStore.changeSelectedJobStepTask(null);
        this.props.jobStepStore.init();

        await this.props.jobStepStore.getJobStepTransfers(selectedWorkTemplateStep.workTemplateId, selectedWorkTemplateStep.workTemplateStepNum, loginUser.id);

        // this.props.deadlineStore.getDeadline(selectedWorkTemplateStep);
        this.props.workTemplateStore.getWorkTemplateStepViewingRoles(selectedWorkTemplateStep.workTemplateId, selectedWorkTemplateStep.workTemplateStepNum);
    }

    handleClickSetting = event => {
        this.setState({ anchorEl: event.currentTarget });
        const { workTemplateId, workTemplateStepNum } = this.props.workStore.selectedWorkTemplateStep;
        this.props.workTemplateStore.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
        // this.props.workTemplateStore.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    };

    handleCloseSetting = () => {
        this.setState({
            anchorEl: null,
        });
    };

    render() {
        const { classes} = this.props;
        const { selectedWork, selectedWorkTemplateStep } = this.props.workStore;
        const { loginUser } = this.props.authStore;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);


        return (
            <div className={classes.root}>
                <StepperInfoComponent/>

                <Box className={clsx(classes.stepperBox)} >
                    <Stepper activeStep={selectedWorkTemplateStep.workTemplateStepNum-1} alternativeLabel connector={<QontoConnector />} >
                        {selectedWork.workTemplateSteps.map(step => (
                            <Step key={`${step.workTemplateId}_${step.workTemplateStepNum}`} sx={(theme) =>({
                                '& .MuiStepLabel-iconContainer.Mui-completed':{
                                    '&:before':{
                                        content: `"${step.workTemplateStepNum}"`,
                                    }
                                }
                            }) }  >
                                {step.disabled
                                    ? (
                                        <StepLabel style={{opacity: 0.5}}>
                                            {step.name}
                                        </StepLabel>
                                    ) : (
                                        <StepLabel onClick={() => this.handleChangeSelectedWorkStep(step.workTemplateStepNum)}>
                                            {step.name}
                                        </StepLabel>
                                    )
                                }

                                <StepContent>
                                    {step.type === TemplateStepType.Upload ?
                                        null
                                        :
                                        <Button className={clsx(classes.nexButton, classes.backButton)}
                                                onClick={() => this.handleChangeSelectedWorkStep(step.workTemplateStepNum, "PRE")}
                                                disableRipple>
                                            이전
                                        </Button>
                                    }

                                    {step.type === TemplateStepType.Export ?
                                        null
                                        :
                                        <Button className={classes.nexButton}
                                                onClick={() => this.handleChangeSelectedWorkStep(step.workTemplateStepNum, "NEXT")}
                                                disableRipple>
                                            다음
                                        </Button>
                                    }
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {selectedWork.work.userId === loginUser.id &&
                    <Button aria-owns={open ? 'simple-popper' : undefined}
                            className={classes.buttonStyle}
                            onClick={this.handleClickSetting}
                            disableRipple>

                        <SettingsIcon/>
                        <Typography>이전 단계 작업 노출 설정</Typography>
                    </Button>
                }


                <StepperSettingComponent selectedWorkTemplateStep={selectedWorkTemplateStep}
                                         open={open}
                                         anchorEl={anchorEl}
                                         handleCloseSetting={this.handleCloseSetting}
                />
            </div>
        );
    }
};

export default withStyles(styles) (
    inject('authStore', 'workStore', 'jobStepStore', 'workTemplateStore','jobStepTaskResultStore','deadlineStore')(
        observer(StepperComponent)
    )
);