import React, {Component} from 'react';

import {withStyles} from "@mui/styles";
import {styles} from "../styles/CreateTemplateSideBarStyle";

import {ReactComponent as InfoIcon} from "../../../../common/images/InfoIcon.svg";

import {Box, IconButton} from "@mui/material";
import CardTooltip from "./CardTooltip";

class CardInformation extends Component {

    render() {
        const { classes, cardValue, tooltipOpen,
            handleOpenTooltip} = this.props;


        return (
            <Box className={classes.cardInfoBox}>
                <IconButton className={classes.iconButton}
                            onClick={(e) => handleOpenTooltip(e, cardValue.textId)}
                            disableRipple>
                    <InfoIcon/>
                </IconButton>

                {tooltipOpen === cardValue.textId &&
                    <CardTooltip cardValue={cardValue}
                                 handleOpenTooltip={handleOpenTooltip}/>
                }
            </Box>
        );
    }
}

export default withStyles(styles)(CardInformation);