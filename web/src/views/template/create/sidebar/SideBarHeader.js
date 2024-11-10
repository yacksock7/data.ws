import React, {Component} from 'react';
import clsx from "clsx";

import {withStyles} from "@mui/styles";
import {styles} from "../styles/CreateTemplateSideBarStyle";

import {ReactComponent as TooltipArrow} from "../../../../common/images/TooltipArrow.svg";
import {ReactComponent as TooltipCloseIcon} from "../../../../common/images/TooltipCloseIcon.svg";
import {ReactComponent as InfoIcon} from "../../../../common/images/InfoIcon.svg";

import {Box, Button, IconButton, Typography} from "@mui/material";

class SideBarHeader extends Component {

    render() {
        const { classes, tooltipOpen, handleOpenTooltip} = this.props;


        return (
            <Box className={classes.topBox}>
                <Typography className={classes.titleText}>작업 단계 유형</Typography>
                <Box display='flex' justifyContent='center' alignItems='center' style={{position: 'relative'}}>
                    <IconButton className={classes.iconButton}
                                onClick={(e) => handleOpenTooltip(e, "total")}
                                disableRipple>
                        <InfoIcon/>
                    </IconButton>

                    {tooltipOpen === "total" &&
                        <Box className={classes.tooltipBox}>
                            <Box className={classes.tooltipArrow}>
                                <TooltipArrow style={{transform: 'rotate( 270deg )'}}/>
                            </Box>

                            <Box className={classes.tooltipBoxIn}>
                                <Box className={classes.tooltipTitleBox}>
                                    <Typography className={classes.tipText}>Tip</Typography>
                                    <Typography>작업 단계 선택</Typography>
                                </Box>
                                <Typography>
                                    작업 단계를 순서 대로 추가하기 위해 유형을 드래그하세요.
                                </Typography>
                                <Box display='flex' justifyContent='flex-end'>
                                    <Button className={classes.tooltipButton}
                                            onClick={(e) => this.handleOpenTooltip(e, "total")}
                                            disableRipple>
                                        확인
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(SideBarHeader);