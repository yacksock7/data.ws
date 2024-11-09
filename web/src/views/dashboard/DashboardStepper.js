import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DashboardStepperStyle";
import {Box, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";

class DashboardStepper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepperList1:[
                {value: 1, text: '업로드'},
                {value: 2, text: '번역'},
                {value: 3, text: '교정'},
                {value: 4, text: '검수'},
                {value: 5, text: '추출'},
            ],
            stepperList2:[
                {value: 1, text: '업로드'},
                {value: 2, text: '녹음'},
                {value: 3, text: '기계'},
                {value: 4, text: '라벨링'},
                {value: 5, text: '교정'},
                {value: 6, text: '정제'},
                {value: 7, text: '검수'},
                {value: 8, text: '추출'},
            ],
        }
    }

    render() {
        const { classes, stepper, stepper2, handleClickStepper, handleClickStepper2, tabIndex } = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.rootIn} style={tabIndex === 0 ? {width: '80%'} : {width: '95%'}}>
                    {tabIndex === 0?
                        <ToggleButtonGroup
                            value={stepper}
                            onChange={handleClickStepper}
                            className={classes.toggleButton}
                        >
                            {this.state.stepperList1.map((list, i) => (
                                <ToggleButton key={list.value} value={list.value} disableRipple>
                                    <Box className={classes.circleBox}>
                                        <Typography>{list.value}</Typography>
                                    </Box>
                                    <Typography className={classes.text}>{list.text}</Typography>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                        :
                        <ToggleButtonGroup
                            value={stepper2}
                            onChange={handleClickStepper2}
                            className={classes.toggleButton}
                        >
                            {this.state.stepperList2.map((list, i) => (
                                <ToggleButton key={list.value} value={list.value} disableRipple>
                                    <Box className={classes.circleBox}>
                                        <Typography>{list.value}</Typography>
                                    </Box>
                                    <Typography className={classes.text}>{list.text}</Typography>
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    }

                    <Box className={classes.lineStyle}/>
                </Box>

            </div>
        );
    }
};

export default withStyles(styles)(DashboardStepper);