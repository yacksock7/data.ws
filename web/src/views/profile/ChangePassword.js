import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/ChangePasswordStyle";
import {
    Box,
    Typography,
    Button,
    Popper,
    DialogTitle,
    Paper,
    IconButton,
} from "@mui/material";
import {ReactComponent as EyeIcon} from '../../common/images/EyeIcon.svg';
import {ReactComponent as EyeClosedIcon} from '../../common/images/EyeClosedIcon.svg';
import {ReactComponent as Close} from '../../common/images/Close.svg';
import {ReactComponent as CheckCircleIcon} from "../../common/images/CheckCircleIcon.svg";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePasswordOpen: false,
            arrow: true,
            arrowRef: null,
            disablePortal: false,
            flip: true,
            placement: 'right',
            passwordShow: false,
            passwordShow2: false,
            passwordShow3: false,
        };
    }

    handleClickChangePassword = (event) => {
        const { currentTarget } = event;
        this.setState(state => ({
            arrowRef: currentTarget,
            changePasswordOpen: !state.changePasswordOpen,
        }));
    };

    handleClickPasswordShow = () => {
        this.setState(state => ({
            passwordShow: !this.state.passwordShow
        }));
    };

    handleClickPasswordShow2 = () => {
        this.setState(state => ({
            passwordShow2: !this.state.passwordShow2
        }));
    };

    handleClickPasswordShow3 = () => {
        this.setState(state => ({
            passwordShow3: !this.state.passwordShow3
        }));
    };

    render() {
        const { classes } = this.props;
        const { placement, disablePortal, flip, arrow, arrowRef } = this.state;

        return (
            <div className={classes.root}>
                <Button
                    innerRef={node => {
                        this.arrowRef = node;
                    }}
                    onClick={this.handleClickChangePassword}
                    disableRipple variant="text" className={classes.textBtnStyle}>비밀번호 변경</Button>

                <Popper
                    open={this.state.changePasswordOpen}
                    anchorEl={arrowRef}
                    placement="right"
                    disablePortal={disablePortal}
                    className={classes.popper}
                    modifiers={{
                        flip: {
                            enabled: flip,
                        },
                        arrow: {
                            enabled: arrow,
                            element: arrowRef,
                        },
                        preventOverflow: {
                            enabled: false,
                            boundariesElement: 'scrollParent',
                        },
                    }}
                >
                    {arrow ? <span className={classes.arrow} ref={this.handleArrowRef} /> : null}
                    <Paper className={classes.paper}>

                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography className={classes.titleText}>
                                비밀번호 변경
                            </Typography>
                            <IconButton style={{ padding: 5 }} disableRipple>
                                <Close style={{ width: 24, height: 24 }} />
                            </IconButton>
                        </Box>

                                <Box display="flex" alignItems="center" pb={2}>
                                    <Typography className={classes.textStyle}>
                                        현재 비밀번호
                                    </Typography>
                                    <Box display="flex" flexDirection="column">
                                        <Box display="flex" alignItems="center">
                                            <form>
                                                <input
                                                    name="password"
                                                    type={this.state.passwordShow ? 'text' : 'password'}
                                                    id="password"

                                                    className={classes.inputStyle}
                                                />
                                            </form>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        id="newPassword"
                                        className={classes.iconBtn}
                                        onClick={this.handleClickPasswordShow}
                                        disableRipple
                                    >
                                        {this.state.passwordShow ?
                                            <EyeIcon />
                                            :
                                            <EyeClosedIcon />
                                        }
                                    </IconButton>
                                </Box>

                                <Box display="flex" alignItems="center" pb={2}>
                                    <Typography className={classes.textStyle}>
                                        새 비밀번호
                                    </Typography>
                                    <Box display="flex" flexDirection="column">
                                        <Box display="flex" alignItems="center">
                                            <form>
                                                <input
                                                    name="againPassword"
                                                    type={this.state.passwordShow2 ? 'text' : 'password'}
                                                    id="againPassword"
                                                    className={classes.inputStyle}
                                                />
                                            </form>

                                        </Box>
                                    </Box>
                                    <IconButton
                                        id="newPassword"
                                        className={classes.iconBtn}
                                        onClick={this.handleClickPasswordShow2}
                                        disableRipple
                                    >
                                        {this.state.passwordShow2 ?
                                            <EyeIcon />
                                            :
                                            <EyeClosedIcon />
                                        }
                                    </IconButton>
                                </Box>

                                <Box display="flex" alignItems="center" pb={2}>
                                    <Typography className={classes.textStyle}>
                                        새 비밀번호 확인
                                    </Typography>
                                    <Box display="flex" flexDirection="column">
                                        <Box display="flex" alignItems="center">
                                            <form>
                                                <input
                                                    name="againPassword"
             Ï                                      type={this.state.passwordShow3 ? 'text' : 'password'}
                                                    id="againPassword"
                                                    className={classes.inputStyle}
                                                />
                                            </form>
                                        </Box>
                                    </Box>
                                    <IconButton
                                        id="newPassword"
                                        className={classes.iconBtn}
                                        onClick={this.handleClickPasswordShow3}
                                        disableRipple
                                    >
                                        {this.state.passwordShow3 ?
                                            <EyeIcon />
                                            :
                                            <EyeClosedIcon />
                                        }
                                    </IconButton>
                                </Box>

                                <Box style={{ marginLeft: '110px' }} className={classes.checkIcon}>
                                    {/*{userStore.newPasswordValidateCombination ? <CheckCircleAgreeOnIcon /> : <CheckCircleAgreeOffIcon />}*/}
                                    <Box>
                                        <CheckCircleIcon />
                                        <Typography className={classes.checkText}>영문, 숫자, 특수문자 중 2가지 이상 조합</Typography>
                                    </Box>
                                    {/*{userStore.newPasswordValidateLength ? <CheckCircleAgreeOnIcon /> : <CheckCircleAgreeOffIcon />}*/}
                                    <Box>
                                        <CheckCircleIcon />
                                        <Typography className={classes.checkText}>10자 이상</Typography>
                                    </Box>
                                </Box>

                            <Button
                                className={classes.buttonStyle}
                            >
                                저장
                            </Button>
                    </Paper>
                </Popper>
            </div>
        );
    }
};

export default withStyles(styles) (ChangePassword);