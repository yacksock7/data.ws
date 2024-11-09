import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/InformationDialogStyle";
import {Box, Button, Dialog, IconButton, Typography} from "@mui/material";
import { ReactComponent as DialogCloseIcon } from '../../common/images/DialogCloseIcon.svg';

class InformationDialog extends Component {
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
        const { classes, open, onClose, onClick, title, submitText, children, color, hoverColor } = this.props;
        const { buttonHover } = this.state;

        const ButtonColorStyle = {
            background: buttonHover ? hoverColor : color,
        };

        const ButtonStyle = {
            background: buttonHover ? '#5f59fc' : '#140cf2',
        };

        return (
            <Dialog
                open={open}
                className={classes.dialogBox}
            >
                <Box className={classes.titleBox}>
                    <Typography className={classes.titleText}>{title}</Typography>
                    <IconButton onClick={onClose} className={classes.iconButton} disableRipple>
                        <DialogCloseIcon/>
                    </IconButton>
                </Box>

                <Box className={classes.contentsBox}>
                    {children}
                </Box>

                <Box className={classes.controlBox}>
                    <Button
                        className={classes.buttonStyle}
                        onClick={onClick}
                        style={color ? ButtonColorStyle : ButtonStyle}
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
                </Box>

            </Dialog>
        );
    }
};

export default withStyles(styles) (InformationDialog);