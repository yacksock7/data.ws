import React, {Component} from 'react';
// import {withStyles} from "@mui/styles";
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/ChangePasswordStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import LoginBackImage3 from "../../common/images/LoginBackImage3.png";
import {ReactComponent as BasicServiceLogin} from "../../common/images/BasicServiceLogin.svg";
import clsx from "clsx";
import {ReactComponent as PasswordIcon} from "../../common/images/PasswordIcon.svg";
import {ReactComponent as EyeIcon} from "../../common/images/EyeIcon.svg";
import {ReactComponent as EyeClosedIcon} from "../../common/images/EyeClosedIcon.svg";
import {ReactComponent as CheckCircleIcon} from "../../common/images/CheckCircleIcon.svg";
import {validatePasswordCombination, validatePasswordLength} from "../../components/common/Validation";
import {inject, observer} from "mobx-react";
import ConfirmDialog from "../dialog/ConfirmDialog";


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showPasswordCheck: false,
            error: false,
            checked: false,
            dialogOpen: false,
            dialogMsg: "",
            passwordValidationState : false,
            passwordLengthState : false,
            passwordConfirmState : false,
        };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowPasswordCheck = () => {
        this.setState(state => ({ showPasswordCheck: !state.showPasswordCheck }));
    };

    handleCloseDialog = () => {
        const {passwordDialogError} = this.props.authStore;

        this.props.authStore.changePasswordDialogOpen(false);
        this.props.authStore.changePasswordDialogMsg("");

        if (!passwordDialogError) {
            this.props.navigate("/login");
        } else {
            this.props.authStore.changePasswordDialogError(false);
        }

    };

    handleChangePassword = (e) => {
        const { newPasswordConfirm } = this.props.authStore;
        const newPassword = e.target.value;

        const passwordValidationState = validatePasswordCombination(newPassword);
        const passwordLengthState = validatePasswordLength(newPassword);
        const passwordConfirmState = newPassword === newPasswordConfirm;
        this.setState({passwordValidationState, passwordLengthState, passwordConfirmState});

        this.props.authStore.changeNewPassword(newPassword);
    }

    handleChangePasswordConfirm = (e) => {
        const { newPassword } = this.props.authStore;
        const newPasswordConfirm = e.target.value;
        const passwordConfirmState = newPassword === newPasswordConfirm;
        this.setState({passwordConfirmState});

        this.props.authStore.changeNewPasswordConfirm(newPasswordConfirm);
    }

    modifyPassword = () => {
        const { token } = this.props.params;
        this.props.authStore.modifyPassword(token);
    }

    render() {
        const {classes} = this.props;
        const {error, passwordValidationState, passwordLengthState, passwordConfirmState} = this.state;
        const {newPassword, newPasswordConfirm,  passwordDialogOpen, passwordDialogMsg} = this.props.authStore;
        return (
            <div className={classes.root}>
                <Box className={classes.leftBox}>
                    <Box style={{width: '85%'}}>
                        <Typography className={classes.leftTitleText}>고품질 언어 데이터를 위한<br/> 강력한 라벨링 플랫폼</Typography>
                        <Box className={classes.imageBox}>
                            <img src={LoginBackImage3} alt='작업 카드 이미지' style={{width:"100%"}}/>
                        </Box>
                    </Box>

                </Box>
                <Box className={classes.rightBox}>
                    <Box className={classes.logoBox}>
                        <BasicServiceLogin/>
                    </Box>
                    <Typography className={classes.titleText}>비밀번호 재설정</Typography>

                    <Typography className={classes.subText}>
                        거의 완료되었습니다.<br/>
                        새로운 비밀번호를 입력해주세요.
                    </Typography>

                    <Box>
                        <Typography className={classes.textStyle}>비밀번호</Typography>
                        <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            type={this.state.showPassword ? 'text' : 'password'}
                            placeholder=''
                            margin="normal"
                            variant="outlined"

                            value={newPassword}
                            onChange={this.handleChangePassword}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPassword}
                                            className={classes.iconButton}
                                            disableRipple
                                        >
                                            {this.state.showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                                        </IconButton>

                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box className={classes.infoMargin}>
                            <Box
                                className={
                                    error ?
                                        clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                        :
                                        passwordValidationState ?
                                            clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)
                                            :
                                            classes.checkInfoTextBox
                                }
                            >
                                <CheckCircleIcon/>
                                <Typography>영문, 숫자, 특수문자 중 2가지 이상 조합</Typography>
                            </Box>
                            <Box
                                className={
                                    error ?
                                        clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                        :
                                        passwordLengthState ?
                                            clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)
                                            :
                                            classes.checkInfoTextBox
                                }
                            >
                                <CheckCircleIcon/>
                                <Typography>10자 이상</Typography>
                            </Box>
                        </Box>

                        <Typography className={classes.textStyle}>비밀번호 확인</Typography>
                        <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            type={this.state.showPasswordCheck ? 'text' : 'password'}
                            placeholder=''
                            margin="normal"
                            variant="outlined"

                            value={newPasswordConfirm}
                            onChange={this.handleChangePasswordConfirm}

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPasswordCheck}
                                            className={classes.iconButton}
                                            disableRipple
                                        >
                                            {this.state.showPasswordCheck ? <EyeIcon /> : <EyeClosedIcon />}
                                        </IconButton>

                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box
                            className={
                                error ?
                                    clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                    :
                                    passwordConfirmState ?
                                        clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)
                                        :
                                        classes.checkInfoTextBox
                            }
                        >
                            <CheckCircleIcon/>
                            <Typography>비밀번호 확인</Typography>
                        </Box>
                    </Box>

                    <Button className={classes.buttonStyle}
                            onClick={this.modifyPassword}
                            disabled={!passwordValidationState || !passwordLengthState || !passwordConfirmState}
                            disableRipple>
                        비밀번호 재설정
                    </Button>

                    <ConfirmDialog
                        open={passwordDialogOpen}
                        title={"비밀번호 변경"}
                        msg={passwordDialogMsg}
                        changeDialogOpen={this.handleCloseDialog}/>
                </Box>
            </div>
        );
    }
}

export default withRouter(
    withStyles(styles) (
        inject('authStore') (
            observer(ChangePassword)
        )
    )
);