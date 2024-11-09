import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TranslationStyle";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerOpenWidth, totalDrawerCloseWidth} from "../../App";
import StepperComponent from "./stepper/StepperComponent";
import Upload from "./upload/Upload";
import Translation from "./translation/Translation";
import Download from "./download/Download";
import {Box} from "@mui/material";
import {inject, observer} from "mobx-react";
import Correction from "./correction/Correction";
import Inspection from "./inspection/Inspection";
import {TemplateStepType} from "../../stores/TemplateStore";
import WorkStep from "./common/WorkStep";

class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        }
        this.handleNext = this.handleNext.bind();
        this.handleBack = this.handleBack.bind();
    }

    handleNext = async () => {
        await this.props.jobStepStore.init()
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = async () => {
        await this.props.jobStepStore.init()
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes} = this.props;
        const { open, menuValue,  sideBar, cardEmpty } = this.props.navigateStore;
        const { selectedWork, selectedWorkTemplateStep } = this.props.workStore;

        return (
            <div
                className={classes.root}
                style={
                    open ?
                        menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                        :
                        menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}
                }
            >
                {!selectedWork ?
                    //등록된 작업이 없을때
                    <Box className={classes.emptyBack} />
                    :
                    <>
                        <StepperComponent />
                        <WorkStep />
                    </>
                }

            </div>
        );
    }
};

export default withStyles(styles) (
    inject('authStore', 'workStore', 'navigateStore','jobStepStore') (
        observer(Work)
    )
);