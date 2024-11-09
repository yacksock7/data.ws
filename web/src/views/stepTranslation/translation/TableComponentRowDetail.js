import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../styles/TranslationStyle";
import {
    Box,
    TableCell,
    TableRow,
    IconButton,
    MenuItem,
    Menu,
    Typography,
    Button,
} from "@mui/material";
import { ReactComponent as TableDotIcon } from '../../../common/images/TableDotIcon.svg';
import { ReactComponent as TableSwichLang } from '../../../common/images/TableSwichLang.svg';
import clsx from "clsx";
import {TemplateStepType} from "../../../stores/TemplateStore";
import {inject, observer} from "mobx-react";
import {JobTaskStatus, JobTaskStatusLabel} from "../../../stores/JobStepStore";



class TableComponentRowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 2,
            rowsPerPage: 10,
            anchorEl: null,
            selected: 'false',
            open: false,
            openMenu: null,
            openTable : false
        };

    }

    render() {
        const { classes, jobStepTaskTransfer, index } = this.props;
        const { anchorEl, selected, openTable } = this.state;
        const {selectedWork} = this.props.workStore;
        const options = JSON.parse(selectedWork.workTemplateSteps.find(step => step.type === TemplateStepType.Machine).options);
        const open = Boolean(anchorEl);

        const preJobStepTaskText =
            jobStepTaskTransfer.preWorkers
            && jobStepTaskTransfer.preWorkers.length > 0
            && jobStepTaskTransfer.preWorkers[0].jobStepTaskText ?
                jobStepTaskTransfer.preWorkers[0].jobStepTaskText : null;

        const jobStepTaskText =
            jobStepTaskTransfer.workers
            && jobStepTaskTransfer.workers.length > 0
            && jobStepTaskTransfer.workers[0].jobStepTaskText ?
                jobStepTaskTransfer.workers[0].jobStepTaskText : null;

        return (
            <React.Fragment>
                <TableRow key={`TableRow_${jobStepTaskTransfer.jobStepTaskNum}`}>
                    <TableCell className={classes.bg50} style={{paddingLeft: '16px'}}>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                    <TableCell className={classes.bg50} align="center">{options.sourceLang}</TableCell>
                    <TableCell className={clsx(classes.bg50, classes.limitText)} align="left" style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                                {preJobStepTaskText && preJobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {jobStepTaskTransfer.workers*/}
                        {/*        && jobStepTaskTransfer.workers[0].jobStepTaskText.text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                    {index === 0 && (
                        <TableCell style={{background: '#fff', borderBottom: '#fff', textAlign: 'center'}} rowSpan={10}>
                            <TableSwichLang/>
                        </TableCell>
                    )}
                    <TableCell className={classes.bg100} style={{paddingLeft: '16px'}}>{jobStepTaskTransfer.jobStepTaskNum}</TableCell>
                    <TableCell className={classes.bg100} align="center">{options.targetLang}</TableCell>
                    <TableCell className={clsx(classes.bg100, classes.limitText)} align="left" style={{position: 'relative'}}>
                        <Button disableRipple>
                            <Typography sx={{overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", textAlign: "left"}}>
                                {jobStepTaskText && jobStepTaskText.text}
                            </Typography>
                        </Button>
                        {/*<Box className={classes.moreText}>*/}
                        {/*    {jobStepTaskTransfer.workers*/}
                        {/*        && jobStepTaskTransfer.workers[0].jobStepTaskText.text}*/}
                        {/*    <IconButton disableRipple>*/}
                        {/*        <MoreTextClose />*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                    </TableCell>
                    <TableCell style={{background: '#fff', padding: '2.5px 0px'}}>
                        {(jobStepTaskTransfer.status === JobTaskStatus.Completed || jobStepTaskTransfer.status === JobTaskStatus.Accepted) ? (
                            <Box className={clsx(classes.completed, classes.uncompleted)}><Typography>{JobTaskStatusLabel[jobStepTaskTransfer.status]}</Typography></Box>
                        ) : (
                            <Box className={classes.uncompleted}><Typography>{JobTaskStatusLabel[jobStepTaskTransfer.status]}</Typography></Box>
                        )}
                    </TableCell>
                    <TableCell style={{background: '#fff'}}>
                        <IconButton id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                            //         onClick={() => this.handleClick(historyRow)}
                                    disableRipple>
                            <TableDotIcon/>
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            // onClick={() => this.handleClose}
                            MenuListProps={{'aria-labelledby': 'basic-button'}}>

                            <MenuItem>번역 다시 실행</MenuItem>
                        </Menu>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskStore', 'workStore')(
        observer(TableComponentRowDetail)
    )
);

