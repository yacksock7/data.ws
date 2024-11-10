import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

import {withStyles} from "@mui/styles";
import {styles} from "../styles/CreateTemplateTopBarStyle";
import clsx from "clsx";

import {ReactComponent as ArrowCounterClockwise} from "../../../../common/images/ArrowCounterClockwise.svg";

import {Box, IconButton, Tooltip} from "@mui/material";
import {HistoryControlType} from "../../../../stores/TemplateStore";


class TemplateCreateTopBar extends Component {
    handleChangeTemplateStepFromHistory = (type) => {
        this.props.templateStore.changeTemplateStepFromHistory(type);
    }

    render() {
        const {classes} = this.props;
        const {templateStepHistoryIndex, templateStepHistories} = this.props.templateStore;

        return (
            <Box>
                <Tooltip title="실행 취소"
                         placement="bottom"
                         classes={{tooltip: classes.lightTooltip}}>
                        <span>
                            <IconButton
                                onClick={() => this.handleChangeTemplateStepFromHistory(HistoryControlType.Previous)}
                                disabled={templateStepHistoryIndex < 2}
                                disableRipple>
                                <ArrowCounterClockwise/>
                            </IconButton>
                        </span>
                </Tooltip>

                <Tooltip title="다시 실행"
                         placement="bottom"
                         classes={{ tooltip: classes.lightTooltip }}>
                        <span>
                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                        onClick={() => this.handleChangeTemplateStepFromHistory(HistoryControlType.Next)}
                                        disabled={templateStepHistoryIndex === templateStepHistories.length}
                                        disableRipple>
                                <ArrowCounterClockwise style={{transform: 'scaleX(-1)'}}/>
                            </IconButton>
                        </span>
                </Tooltip>
            </Box>
        );
    }
};

export default withStyles(styles)(
    inject('templateStore')(
        observer(TemplateCreateTopBar)
    )
);