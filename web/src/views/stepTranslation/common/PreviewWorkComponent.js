import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Typography,
    Button,
    Popover, Tooltip
} from "@mui/material";
import { ReactComponent as ArrowDownIcon } from '../../../common/images/ArrowDownIcon.svg';
import {inject, observer} from "mobx-react";
import {TemplateStepTypeButton} from "../../../stores/TemplateStore";


// import clsx from "clsx";
class TableComponentRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyAnchorEl: null,
        }
    }

    handleClickHistoryAnchorEl = (event) => {
        event.stopPropagation();
        const {historyAnchorEl} = this.state;
        if(historyAnchorEl) {
            this.setState({historyAnchorEl: null});
        } else {
            this.setState({historyAnchorEl: event.currentTarget});
            const { workTemplateId, workTemplateStepNum } = this.props.workStore.selectedWorkTemplateStep;
            this.props.workTemplateStore.getPreWorkTemplateSteps(workTemplateId, workTemplateStepNum);
        }
    };

    handleClose = (event) => {
        event.stopPropagation();
        this.setState({historyAnchorEl: null});
    };



    render() {
        const { classes } = this.props;
        const { historyAnchorEl } = this.state;
        const historyOpen = Boolean(historyAnchorEl);
        const { selectedJobStepTransfer } = this.props.jobStepStore;
        const { preWorkTemplateSteps } = this.props.workTemplateStore;

        return (
            <React.Fragment>

                {/* TODO 이전 작업 보기. 업로드는 숨기기 with selectedWorkTemplateStep*/}
                <Box>
                    <Button onClick={this.handleClickHistoryAnchorEl} className={classes.historyButton} disableRipple>
                        {historyOpen ? <ArrowDownIcon style={{transform: 'scaleY(-1)'}}/> : <ArrowDownIcon />}
                        <Typography>이전 작업 이력 보기</Typography>
                    </Button>


                    <Popover
                        id="simple-popper"
                        open={historyOpen}
                        anchorEl={historyAnchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                        transformOrigin={{vertical: 'top', horizontal: 'center',}}
                        className={classes.popoverBox}>

                        <Box>
                            <Typography>이전 작업 이력 보기</Typography>
                            <Box display='flex' alignItems='center'>
                                {preWorkTemplateSteps && preWorkTemplateSteps.map(preStep =>(
                                    <Tooltip
                                        title={preStep.name}
                                        placement="bottom"
                                        classes={{tooltip: classes.lightTooltip}}>

                                        {TemplateStepTypeButton[preStep.type]}
                                    </Tooltip>
                                )

                                )}
                            </Box>
                        </Box>
                    </Popover>
                </Box>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepStore', 'workTemplateStore', 'workStore')(
        observer(TableComponentRow)
    )
);

