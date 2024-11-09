import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CommonDialogStyle";
import {Box, Button, Dialog, IconButton, Typography} from "@mui/material";
import { ReactComponent as DialogCloseIcon } from '../../common/images/DialogCloseIcon.svg';
import clsx from "clsx";

class EmailDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonHover: false,
            textHover: false
        }
    }

    handleTextMouseEnter = () => {
        this.setState({
            textHover: true,
        });
    };

    handleButtonMouseEnter = () => {
        this.setState({
            buttonHover: true,
        });
    };

    handleMouseLeave = () => {
        this.setState({
            textHover: false,
            buttonHover: false,
        });
    };

    render() {
        const { classes, open, onClose, onClick, title, submitText, children, color, hoverColor, cancel = true, submit = true} = this.props;
        const { buttonHover, textHover } = this.state;

        const TextColorStyle = {
            color: textHover ? hoverColor : color,
        };

        const TextStyle = {
            color: textHover ? '#5f59fc' : '#140cf2',
        };

        const ButtonColorStyle = {
            background: buttonHover ? hoverColor : color,
        };

        const ButtonStyle = {
            background: buttonHover ? '#5f59fc' : '#140cf2',
        };

        return (
            <Dialog
                open={open}
                className={classes.emailDialogBox}
            >
                <Box className={classes.titleBox}>
                    <Typography className={classes.emailTitleText}>{title}</Typography>
                    <IconButton onClick={onClose} className={classes.iconButton} disableRipple>
                        <DialogCloseIcon/>
                    </IconButton>
                </Box>

                <Box className={classes.contentsBox}>
                    {children}
                </Box>

                <Box className={clsx(classes.controlBox, classes.emailControlBox)}>

                    {submit &&
                        <Button
                            className={clsx(classes.buttonStyle, classes.emailButtonStyle)}
                            onClick={onClick}
                            onMouseEnter={this.handleButtonMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            onClick={onClick}
                            disableRipple
                        >
                            {submitText ?
                                submitText
                                :
                                '확인'
                            }
                        </Button>
                    }
                </Box>

            </Dialog>
        );
    }
};

export default withStyles(styles) (EmailDialog);