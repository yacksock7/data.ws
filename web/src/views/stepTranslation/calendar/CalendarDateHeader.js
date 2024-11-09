import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {Box} from "@mui/material";
import {styles} from "./styles/CalendarDateHeaderStyle";

class CalendarDateHeader extends Component {
    render() {
        const {classes, label, value} = this.props;
        const zeroNum = label.replace(/(^0+)/, "");

        return (
            <div className={classes.toolbarBox}>
                <Box className={classes.dateHeaderPadding}>
                    <span>{zeroNum}</span>
                </Box>
            </div>
        );
    }
}
export default withStyles(styles)(CalendarDateHeader);