import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box,
    Paper,
    TablePagination,
    TableContainer,
    Table,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    IconButton,
    MenuItem,
    Menu,
    Typography,
    Button,
    Collapse,
    Stack,
    Avatar,
    Popover, MenuList,
    FormControl,
    Select
} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from '../../../common/images/ArrowDownIcon.svg';
import {ReactComponent as ArrowUpIcon} from '../../../common/images/ArrowUpIcon.svg';
import {ReactComponent as TableDotIcon} from '../../../common/images/TableDotIcon.svg';
import {ReactComponent as TableRoundUp} from '../../../common/images/TableRoundUp.svg';
import {ReactComponent as TableRoundDown} from '../../../common/images/TableRoundDown.svg';
import {ReactComponent as TableUserAvatar} from '../../../common/images/TableUserAvatar.svg';
import {ReactComponent as MoreTextClose} from '../../../common/images/MoreTextClose.svg';
import {ReactComponent as PageRight} from '../../../common/images/PageRight.svg';
import {ReactComponent as PageLeft} from '../../../common/images/PageLeft.svg';
import clsx from "clsx";
import AdminAvatar from "../../../common/images/AdminAvatar.png";
import {inject, observer} from "mobx-react";
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";
import {TemplateStepType} from "../../../stores/TemplateStore";

class TableComponentUploadRowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes, jobStepTaskTransfer } = this.props;
        const {selectedWork} = this.props.workStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);

        const jobStepTaskText =
            jobStepTaskTransfer.workers
            && jobStepTaskTransfer.workers.length > 0
            && jobStepTaskTransfer.workers[0].jobStepTaskText ?
                jobStepTaskTransfer.workers[0].jobStepTaskText : null;

        return (
            <React.Fragment>
                <TableRow key={jobStepTaskTransfer.jobStepTaskNum}>
                    <TableCell>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                    <TableCell align="center">
                        {options.sourceLang}
                    </TableCell>
                    <TableCell align="left" className={classes.limitText}
                               style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography sx={{overflow: "hidden", textOverflow: "ellipsis",display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                                {jobStepTaskText && jobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {jobStepTaskTransfer.workers*/}
                        {/*        && jobStepTaskTransfer.workers[0].text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose/>*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskStore', 'workStore')(
        observer(TableComponentUploadRowDetail)
    )
);
