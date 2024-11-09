import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/LoginDialogStyle";
import {withRouter} from "../../components/WithRouter";
import {Button, Dialog, Typography} from "@mui/material";
import {AbcTwoTone} from "@mui/icons-material";

class LoginDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {classes, open, title, subText, submitText, onClick} = this.props;

        return (
            <Dialog
                open={open}
                className={classes.dialogBox}
            >
                <Typography className={classes.textStyle}>{title}</Typography>
                {subText &&
                    <Typography className={classes.subStyle}>{subText}</Typography>
                }
                <Button className={classes.ButtonStyle} onClick={onClick} disableRipple>
                    {submitText ?
                        submitText
                        :
                        '확인'
                    }
                </Button>
            </Dialog>
        );
    }
}

export default withRouter(withStyles(styles)(LoginDialog));