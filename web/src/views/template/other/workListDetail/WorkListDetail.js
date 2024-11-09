import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkListStyle";
import {
    Box,
    FormControl, IconButton,
    MenuItem,
    Select,
    Tab,
    Tabs,
    Button,
    Typography
} from "@mui/material";
import clsx from "clsx";
// import WorkStepBox from "./WorkStepBox";
// import TabBox from "./TabBox";
import UserInfo from "./UserInfo";
import WorkTable from "./WorkTable";

import {ReactComponent as ArrowDownIcon} from "../../../../common/images/ArrowDownIcon.svg";
import {ReactComponent as CalendarArrowIcon} from "../../../../common/images/CalendarArrowIcon.svg";
import {Link} from "react-router-dom";

class WorkListDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
        }
    }



    render() {
        const { classes, tabIndex, handleChangeTab} = this.props;

        return (
            <div>
                {/*<WorkStepBox/>*/}

                <Box display='flex' alignItems='center' sx={{marginBottom: '40px'}}>
                    <Button className={classes.returnBtn} disableRipple>
                        <CalendarArrowIcon/>
                        <Typography className={classes.taskList}>작업자별 목록</Typography>
                    </Button>
                    <Typography className={classes.workerName}>이작업</Typography>
                </Box>

                <Typography className={classes.textDetailList}>회원정보</Typography>
                <UserInfo/>

                <Box sx={{display: 'flex', alignItems: 'center', marginTop: '40px'}}>
                    <Typography className={classes.textDetailList}><strong>이작업</strong> 님,<br/>작업 상세내역</Typography>
                    <FormControl variant="outlined" className={classes.formControl }>
                        <Select
                            id="filter"
                            value={this.state.select}
                            onChange={this.handleChange}
                            IconComponent={(props) => (
                                <ArrowDownIcon  {...props} />
                            )}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                className: classes.selectPopover,
                            }}
                        >
                            <MenuItem value={0}>전체 작업 그룹</MenuItem>
                            <MenuItem value={1}>전체 작업 그룹1</MenuItem>
                            <MenuItem value={2}>전체 작업 그룹2</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <WorkTable/>
            </div>
        );
    }
};

export default withStyles(styles)(WorkListDetail);