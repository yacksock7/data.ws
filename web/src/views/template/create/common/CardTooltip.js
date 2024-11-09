import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withStyles} from "@mui/styles";
import clsx from "clsx";

import {styles} from "../styles/CreateTemplateSideBarStyle";

import {ReactComponent as TooltipArrow} from "../../../../common/images/TooltipArrow.svg";
import {ReactComponent as TooltipCloseIcon} from "../../../../common/images/TooltipCloseIcon.svg";

import {Box, IconButton, Typography} from "@mui/material";

class CardTooltip extends Component {

    render() {
        const { classes, list, handleOpenTooltip} = this.props;


        return (
            <Box className={clsx(classes.tooltipBox, classes.tooltipBox2)}>
                <Box className={classes.tooltipArrow}>
                    <TooltipArrow style={{transform: 'rotate( 270deg )'}}/>
                </Box>

                <Box className={classes.tooltipBoxIn}>
                    <Box display='flex'
                         justifyContent='space-between'
                         alignItems='center'
                         className={classes.tooltipTitleBox}>
                        <Typography>[{list.text}]</Typography>
                        <IconButton className={classes.iconButton}
                                    onClick={(e) => handleOpenTooltip(e, list.textId)}
                                    disableRipple>
                            <TooltipCloseIcon/>
                        </IconButton>
                    </Box>
                    <ul>
                        <li>{list.tooltip}</li>
                        {list.tooltip2 !== '' &&
                            <li>{list.tooltip2}</li>
                        }
                    </ul>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(CardTooltip);