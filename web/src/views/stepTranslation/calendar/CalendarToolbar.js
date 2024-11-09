import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {Typography, IconButton} from "@mui/material";
import {ReactComponent as CalendarArrowIcon} from "../../../common/images/CalendarArrowIcon.svg";
import {styles} from "./styles/CalendarToolbarStyle";


class CalendarToolbar extends Component {
    render() {
        const {classes, date} = this.props;
        const navigate = (action) => {
            this.props.onNavigate(action);
        };

        return (
            <div className={classes.toolbarBox}>

                <IconButton
                    onClick={navigate.bind(null, 'PREV')}
                    disableRipple
                    className={classes.iconButton}
                >
                    <CalendarArrowIcon />
                </IconButton>
                <Typography className={classes.yearText}>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</Typography>
                <IconButton
                    onClick={navigate.bind(null, 'NEXT')}
                    disableRipple
                    className={classes.iconButton}
                >
                    <CalendarArrowIcon style={{transform: 'scaleX(-1)'}}/>
                </IconButton>
            </div>
        );
    }
}
export default withStyles(styles)(CalendarToolbar);