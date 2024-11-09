import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/PeriodPopoverStyle";
import {
    Box,
    Button,
    Checkbox, FormControl,
    FormControlLabel,
    IconButton, MenuItem,
    Popover, Select,
    Typography
} from "@mui/material";
import {ReactComponent as DialogCloseIcon} from "../../../common/images/DialogCloseIcon.svg";
import clsx from "clsx";
import {ReactComponent as UnRadioIcon} from "../../../common/images/UnRadioIcon.svg";
import {ReactComponent as RadioIcon} from "../../../common/images/RadioIcon.svg";
import {ReactComponent as ArrowDownIcon} from "../../../common/images/ArrowDownIcon.svg";
import CalendarComponent from "./CalendarComponent";
import {inject, observer} from "mobx-react";

class PeriodPopover extends Component {
    constructor(props) {
        super(props);
        this.props.deadlineStore.changeStepName('all');
        this.handleChangeStepName('all');
        this.props.deadlineStore.initCalendarToday();
    }

    handleChangeMonthFilter = (e) => {

        this.props.deadlineStore.changeCalendarMonth(e.target.value);
        this.props.deadlineStore.changeCalendarDay(1);

    };
    componentWillUnmount() {
        this.props.deadlineStore.getDeadline(this.props.workStore.selectedWorkTemplateStep);
    }

    handleChangeDayFilter = (e) => {
        this.props.deadlineStore.changeCalendarDay(e.target.value);
    };

    handleChangeChecked = (e) => {
        this.props.deadlineStore.changeDeadlineUnlimitFlag(e.target.checked);
    };

    handleChangeStepName = (str) => {
        this.props.deadlineStore.changeStepName(str);
        //console.log(this.props.deadlineStore.deadlineArr);
        if(str === 'all'){
            this.props.deadlineStore.changeDeadlineShowArr(this.props.deadlineStore.deadlineArr);
        }
        else {
            this.props.deadlineStore.changeDeadlineShowArr(
                this.props.deadlineStore.deadlineArr.filter(item => item.type === str)
            );
        }
    }

    makeDays = () =>
    {
        let arr = [];
        for(let i = 0 ; i<this.props.deadlineStore.calendar.lastDayOfMonth; i++)
        {
            arr.push(<MenuItem key={i} value={i+1}> {i+1} </MenuItem>);
        }
        return arr;
    }
    handleClickSave = () => {
        const today = new Date();
        this.props.deadlineStore.makeDeadlineDeadlineDatetime(this.props.deadlineStore.calendar.selectedYear,
            this.props.deadlineStore.calendar.selectedMonth,this.props.deadlineStore.calendar.selectedDay);
        if(today > this.props.deadlineStore.deadline.deadlineDatetime) {
            alert("마감일이 올바르지 않습니다.");
            return;
        }
        this.props.deadlineStore.makeDeadline(this.props.workStore.selectedWorkTemplateStep,
            this.props.workStore.selectedWork.workTemplateSteps);
    }

    render() {
        const { classes, open, anchorEl, onClose,stepName } = this.props;
        const { deadline,calendar } = this.props.deadlineStore;

        return (
            <Popover
                id="simple-popper"
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                className={classes.popoverBox}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderRadius: 6,
                        display:'flex',
                        alignItems: 'center'
                    }
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        ml: "10px",
                        "&::before": {
                            backgroundColor: "white",
                            content: '""',
                            display: "block",
                            position: "absolute",
                            width: 12,
                            height: 12,
                            bottom: -5,
                            transform: "rotate(45deg)",
                            left: "calc(50% - 6px)",
                            zIndex: 1000
                        }
                    }}
                />
                <Box className={classes.paper}>
                    <Box className={classes.leftBox}>
                        <CalendarComponent />
                    </Box>
                    <Box className={classes.rightBox}>
                        <Box display='flex' justifyContent='flex-end'>
                            <IconButton onClick={onClose} className={classes.iconButton} disableRipple>
                                <DialogCloseIcon/>
                            </IconButton>
                        </Box>
                        <Box className={classes.control}>
                            <Box>
                                <Box className={classes.typeBox}>
                                    <Typography className={classes.titleText}>작업 단계별 표시</Typography>
                                    <Box className={classes.typeBoxIn}>
                                        <Button
                                            onClick={e => this.handleChangeStepName('all')}
                                            className={deadline.stepName === 'all' ? clsx(classes.typeButton, classes.typeBlackSelect) : clsx(classes.typeButton, classes.typeBlack)}
                                            disableRipple
                                        >
                                            전체
                                        </Button>
                                        <Button
                                            onClick={e => this.handleChangeStepName('upload')}
                                            className={deadline.stepName === 'upload' ? clsx(classes.typeButton, classes.typeSelect) : classes.typeButton}
                                            disableRipple
                                        >
                                            업로드
                                        </Button>
                                        <Button
                                            onClick={e => this.handleChangeStepName('translate')}
                                            className={deadline.stepName === 'translate' ? clsx(classes.typeButton, classes.typeYellowSelect) : clsx(classes.typeButton, classes.typeYellow)}
                                            disableRipple
                                        >
                                            번역
                                        </Button>
                                        <Button
                                            onClick={e => this.handleChangeStepName('correction')}
                                            className={deadline.stepName === 'correction'? clsx(classes.typeButton, classes.typeIndigoSelect) : clsx(classes.typeButton, classes.typeIndigo)}
                                            disableRipple
                                        >
                                            교정
                                        </Button>
                                        <Button
                                            onClick={e => this.handleChangeStepName('inspection')}
                                            className={deadline.stepName === 'inspection' ? clsx(classes.typeButton, classes.typePinkSelect) : clsx(classes.typeButton, classes.typePink)}
                                            disableRipple
                                        >
                                            검수
                                        </Button>
                                        <Button
                                            onClick={e => this.handleChangeStepName('export')}
                                            className={deadline.stepName === 'export' ? clsx(classes.typeButton, classes.typePurpleSelect) : clsx(classes.typeButton, classes.typePurple)}
                                            disableRipple
                                        >
                                            추출
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>

                            <Box>
                                <Box className={classes.dateBox}>
                                    <Typography className={classes.titleText}>{stepName} 마감일</Typography>
                                    <Box display='flex' alignItems='center'>
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <Select
                                                id="filter"
                                                value={calendar.selectedMonth}
                                                onChange={this.handleChangeMonthFilter}
                                                IconComponent={(props) => (
                                                    <Box>
                                                        <ArrowDownIcon  {...props} />
                                                    </Box>
                                                )}
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    },
                                                    transformOrigin:{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                    PaperProps:{
                                                      style:{
                                                        maxHeight : 300,
                                                      },
                                                    },
                                                    // getContentAnchorEl: null,
                                                    className:classes.selectPopover
                                                }}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>
                                                <MenuItem value={7}>7</MenuItem>
                                                <MenuItem value={8}>8</MenuItem>
                                                <MenuItem value={9}>9</MenuItem>
                                                <MenuItem value={10}>10</MenuItem>
                                                <MenuItem value={11}>11</MenuItem>
                                                <MenuItem value={12}>12</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <Typography className={classes.textStyle}>월</Typography>

                                        <FormControl variant="outlined" className={clsx(classes.formControl, classes.formControlIcon)}>
                                            <Select
                                                id="filter"
                                                value={calendar.selectedDay}
                                                onChange={this.handleChangeDayFilter}
                                                IconComponent={(props) => (
                                                    <Box>
                                                        <ArrowDownIcon  {...props} />
                                                    </Box>
                                                )}
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: "bottom",
                                                        horizontal: "left"
                                                    },
                                                    transformOrigin:{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                    PaperProps:{
                                                        style:{
                                                            maxHeight : 300,
                                                        },
                                                    },
                                                    // getContentAnchorEl: null,
                                                    className:classes.selectPopover
                                                }}
                                            >
                                                {this.makeDays()}
                                            </Select>
                                        </FormControl>
                                        <Typography className={classes.textStyle}>일</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent='flex-end'>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={calendar.unLimitFlag}
                                                    onChange={this.handleChangeChecked}
                                                    value="checked"
                                                    icon={<UnRadioIcon />}
                                                    checkedIcon={<RadioIcon />}
                                                    disableRipple
                                                />
                                            }
                                            label="기한 없음"
                                            className={classes.checkBox}
                                        />
                                    </Box>
                                </Box>

                                <Box className={classes.controlBox}>
                                    <Button className={classes.cancelButton} onClick={onClose} disableRipple>취소</Button>
                                    <Button className={classes.buttonStyle} onClick={this.handleClickSave} disableRipple>저장</Button>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </Popover>
        );
    }
}

export default withStyles(styles)(
    (inject)('deadlineStore','workStore')(
        (observer)(PeriodPopover)));