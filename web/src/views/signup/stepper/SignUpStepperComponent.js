import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/SignUpStepperComponentStyles";
import {
    Box,
    Button,
    Step,
    Stepper,
    StepLabel,
    StepContent, StepConnector,
} from "@mui/material";
import clsx from "clsx";

const QontoConnector = withStyles({
    alternativeLabel: {
    },
    active: {
        '& $line': {
            border: '2px solid #9d4bfb',
            borderColor: '#9d4bfb !important',
            opacity: '1 !important',
        },
    },
    completed: {
        '& $line': {
            border: '2px solid #7500fa',
            borderColor: '#9d4bfb !important',
            opacity: '1 !important',
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

class SignUpStepperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes, activeStep, handleBack } = this.props;


        return (
            <div className={classes.root}>
                <Box className={clsx(classes.stepperBox, classes.stepperBoxCompletedIcon)}>
                    <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                        <Step onClick={activeStep === 1 ? handleBack : null} style={activeStep === 1 ? {cursor:'pointer'} : {}}>
                            <StepLabel>기본 정보</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>선택 정보</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>이메일 인증</StepLabel>
                        </Step>
                    </Stepper>
                </Box>
            </div>
        );
    }
};

export default withStyles(styles) (SignUpStepperComponent);