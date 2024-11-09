import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkCardStyle";
import {Box, IconButton, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {ReactComponent as TTTIcon} from "../../common/images/TTTIcon.svg";
import {ReactComponent as MenuDotsIcon} from "../../common/images/MenuDotsIcon.svg";
import clsx from "clsx";
import {inject, observer} from "mobx-react";
import {TemplateStepColor} from "../../stores/TemplateStore";
import dayjs from "dayjs";


class WorkCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            //작업카드 단계 배지 color 임시
            step: false,
        };
    }

    componentDidMount() {
        const { work } = this.props;
    }

    handleClickPopover = (e) => {
        e.stopPropagation();
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleClickCard = async (workId) => {
        this.props.jobStepStore.init();

        const { loginUser } = this.props.authStore;
        this.props.workStore.changeSelectedWork(workId, loginUser.id);

        const { selectedWork } = this.props.workStore;
        const initStep = selectedWork.workTemplateSteps.find(step => !step.disabled);
        this.props.workStore.changeSelectedWorkStep(initStep.workTemplateStepNum);

        const {selectedWorkTemplateStep} = this.props.workStore;
        const {workTemplateId, workTemplateStepNum} = selectedWorkTemplateStep;

        this.props.jobStepStore.getJobStepTransfers(workTemplateId, workTemplateStepNum, loginUser.id);
        this.props.deadlineStore.getDeadline(selectedWorkTemplateStep);
        this.props.workTemplateStore.getWorkTemplateStepViewingRoles(workTemplateId, workTemplateStepNum);
    };

    render() {
        const {classes, workTransfer} = this.props;
        const { selectedWork } = this.props.workStore;
        const { anchorEl } = this.state;
        const popoverOpen = Boolean(anchorEl);
        const createdDatetime = dayjs(workTransfer.work.updatedDatetime).format("YYYY-MM-DD hh:mm");

        return (
            <div className={classes.root} key={`card-${workTransfer.work.id}`}>
                <Box
                    key={`card-box-${workTransfer.work.id}`}
                    className={classes.cardBox}
                    onClick={() => this.handleClickCard(workTransfer.work.id)}
                    style={(selectedWork && selectedWork.work.id === workTransfer.work.id) ? {border: '2px solid #7500fa'} : {border: '1px solid #bbbbbb'}}
                >
                    <Box className={classes.topBox}>
                        {workTransfer.workTemplateSteps && workTransfer.workTemplateSteps.map( step => {
                            return (
                                <Box className={classes.stepBox}
                                     key={`step-${step.workTemplateId}-${step.workTemplateStepNum}`}
                                    style={this.state.step ? {background: TemplateStepColor[step.type]} : {background: '#eee'}}>
                                    <Typography style={this.state.step ? {color: '#fff'} : {color: 'rgba(50, 50, 50, 0.6)'}}>{step.name}</Typography>
                                </Box>
                            );
                        })}
                    </Box>

                    <Typography className={classes.titleText}>{workTransfer.work.name}</Typography>

                    <Box className={classes.contentsBox}>
                        <Box className={classes.flexCenter}>
                            <Box className={classes.iconBox}>
                                <TTTIcon/>
                            </Box>
                            <Typography className={classes.textStyle}>{workTransfer.workTemplate.name}</Typography>
                        </Box>

                        <IconButton
                            aria-owns={popoverOpen ? 'simple-popper' : undefined}
                            onClick={this.handleClickPopover}
                            className={classes.iconButton}
                            disableRipple
                        >
                            <MenuDotsIcon/>
                        </IconButton>

                        <Popover
                            id="simple-popper"
                            open={popoverOpen}
                            anchorEl={anchorEl}
                            onClose={this.handleClosePopover}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            transformOrigin={{vertical: 'top', horizontal: 'right'}}
                            className={classes.popoverBox}
                        >
                            <MenuList>
                                <MenuItem onClick={() => this.handleClosePopover(workTransfer.work.id)}>템플릿 편집</MenuItem>
                            </MenuList>
                        </Popover>
                    </Box>
                    <Typography className={clsx(classes.textStyle, classes.textStyle1)}>
                        {createdDatetime}
                        {/*{list.updated && <span>Updated&nbsp;&nbsp;</span>}*/}
                        {/*{list.date}*/}
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default withStyles(styles) (
    inject('authStore', 'workStore', 'jobStepStore','deadlineStore', 'workTemplateStore')(
        observer(WorkCard)
    )
);