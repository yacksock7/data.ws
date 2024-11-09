import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/NotificationDialogStyle";
import {Box, Button, Typography} from "@mui/material";

class NotificationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { classes, handleCloseDialog } = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.notificationBox}>
                    <Typography>공지</Typography>
                </Box>
                <Typography className={classes.titleText}>시스템 점검 안내</Typography>
                <Typography className={classes.dateText}>2023년 6월 14일 오후 2:30</Typography>

                <Box className={classes.scrollBox}>
                    <Typography className={classes.textStyle}>
                        보다 안정화된 서비스 제공을 위해 시스템 점검을 진행 중입니다.<br/>
                        보다 안정화된 서비스 제공을 위해 시스템 점검을 진행 중입니다.<br/>
                        보다 안정화된 서비스 제공을 위해 시스템 점검을 진행 중입니다.<br/>
                    </Typography>
                </Box>

                <Box display='flex' justifyContent='center'>
                    <Button className={classes.buttonStyle} onClick={handleCloseDialog} disableRipple>확인</Button>
                </Box>
            </div>
        );
    }
};

export default withStyles(styles)(NotificationDialog);