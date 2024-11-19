import React, {Component} from 'react';
import {withStyles, makeStyles} from "@mui/styles";
import {styles} from "./styles/CreateWorkStyle";
import {Box, Button, Step, StepConnector, StepLabel, Stepper, Typography} from "@mui/material";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";
import { ReactComponent as StepCheckedIcon } from '../../common/images/StepCheckedIcon.svg';
import { ReactComponent as StepIcon } from '../../common/images/StepIcon.svg';
import clsx from "clsx";
import TitleRegistration from "./TitleRegistration";
import ChooseTemplate from "./ChooseTemplate";
import {inject, observer} from "mobx-react";

const useQontoStepIconStyles = makeStyles({
    stepIconActive: {
        '& .circle-line':{
            stroke: '#aaaaaa'
        },
        '& .circle':{
            fill:'#aaa',
            opacity: 0.5
        }
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={active ? classes.stepIcon : clsx(classes.stepIcon, classes.stepIconActive)}
        >
            {completed ? <StepCheckedIcon/> : active ? <StepIcon/> : <StepIcon/>}
        </div>
    );
}

class CreateWork extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes} = this.props;
        const { open, menuValue,  sideBar } = this.props.navigateStore;
        const { activeStep } = this.state;

        return (
            <Box className={classes.root}
                 style={open ?
                     menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                     : menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}}>
                <Box>
                    <Box className={classes.stepperBox}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            <Step onClick={activeStep === 0 ? null : this.handleBack}>
                                <StepLabel StepIconComponent={QontoStepIcon}>작업 제목 등록</StepLabel>
                            </Step>
                            <Step onClick={activeStep === 0 ? this.handleNext : null}>
                                <StepLabel StepIconComponent={QontoStepIcon}>템플릿 선택</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>

                    <Typography className={classes.titleText}>
                        {this.state.activeStep === 0 ?
                            '작업 정보를 등록해주세요.'
                            :
                            '작업 템플릿을 선택해주세요.'
                        }

                    </Typography>
                    {this.state.activeStep === 0 &&
                        <TitleRegistration handleNext={this.handleNext}/>
                    }

                    {this.state.activeStep === 1 &&
                        <ChooseTemplate/>
                    }

                </Box>
            </Box>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(CreateWork)
    )
);