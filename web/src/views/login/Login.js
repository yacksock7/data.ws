import React, {Component} from 'react';
// import {withStyles} from "@mui/styles";
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/LoginStyle";
import {withRouter} from "../../components/WithRouter";
import { ReactComponent as IdUsersIcon } from '../../common/images/IdUsersIcon.svg';
import { ReactComponent as PasswordIcon } from '../../common/images/PasswordIcon.svg';
import { ReactComponent as EyeIcon } from '../../common/images/EyeIcon.svg';
import { ReactComponent as EyeClosedIcon } from '../../common/images/EyeClosedIcon.svg';
import { ReactComponent as ErrorIcon } from '../../common/images/ErrorIcon.svg';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {ReactComponent as UnCheckedIcon} from "../../common/images/UnCheckedIcon.svg";
import {ReactComponent as CheckedIcon} from "../../common/images/CheckedIcon.svg";
import {inject,observer} from 'mobx-react'
import {State} from "../../stores/AuthStore";
import ConfirmDialog from "../dialog/ConfirmDialog";
import LoginEmailDialog from "./LoginEmailDialog";
import EmailDialog from "../dialog/EmailDialog";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            error: false,
        };
    }

    componentDidMount() {
        if(this.props.authStore.loginState !== State.Authenticated) {
            this.props.authStore.changeLoginState(State.NotAuthenticated);
            this.props.authStore.initLoginElement();
        }
    }

    handleClickShowPassword = () => {
        this.props.authStore.changeLoginElementLoginPasswordShow(!(this.props.authStore.loginElement.loginPasswordShow));
        //this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickSignIn = () =>{

        const {loginElement} = this.props.authStore;
        if(loginElement.emailError === true) {
            return;
        }

        this.props.authStore.doLogin(this.loginCallback);

    }

    loginCallback = () => {
        const {loginState} = this.props.authStore;
        if(loginState === State.Authenticated) {
            this.props.navigate('/');
            this.props.userStore.getUserProfile(this.props.authStore.loginUser.id);
        }
    }

    handleChangeLoginEmail = (e) => {
        this.props.authStore.changeLoginElementLoginId(e.target.value);
        this.handleCheckEmailFormat(this.props.authStore.loginElement.loginId);
        if(e.target.value.length>0 && this.props.authStore.login.password.length>0)
            this.props.authStore.changeLoginElementLoginButtonActive(true);
        else
            this.props.authStore.changeLoginElementLoginButtonActive(false);
    }

    handleChangeLoginPassword = (e) => {
        this.props.authStore.changeLoginPassword(e.target.value);
        if(e.target.value.length>0 && this.props.authStore.login.email.length>0)
            this.props.authStore.changeLoginElementLoginButtonActive(true);
        else
            this.props.authStore.changeLoginElementLoginButtonActive(false);
    }

    handleCheckEmailFormat = (str) =>
    {
        if(str.indexOf('@') !== -1)
        {//메일 형식
            this.handleCheckEmailCorrect(str);
        }
        else
        {//닉네임 형식
            this.props.authStore.changeLoginElementEmailError(false);
            this.props.authStore.changeLoginEmail(str);
        }
    }

    handleCheckEmailCorrect = (str) =>
    {
        const emailFormat = /\S+@\S+\.\S+/;
        if(emailFormat.test(str))
        {//메일 형식 맞음
            this.props.authStore.changeLoginElementEmailError(false);
            this.props.authStore.changeLoginEmail(str);
        }
        else
        {//메일 형식 틀림
            this.props.authStore.changeLoginElementEmailError(true);
        }
    }
    handleChangeChecked = (e) =>
    {
        this.props.authStore.changeLoginElementLoginSessionMaintain(e.target.checked);
    }

    handleResendEmail = () => {
        const {loginUser} = this.props.authStore;
        this.props.authStore.resendSignUpEmail(loginUser.id);
    }

    handleCloseConfirmDialog = () => {
        this.props.authStore.changeEmailAuth(true);
    }

    handleClickEmailDialog = () => {
        this.setState({emailDialogOpen: true});
    };

    render() {
        const {classes, handleClickFindPassword, handleClickSignUp} = this.props;
        const {loginState, login, loginElement, isEmailAuth} = this.props.authStore;

        return (
            <div>
                <Typography className={classes.titleText}>로그인</Typography>
                <Box>
                    <Typography className={classes.textStyle}>이메일 또는 닉네임</Typography>
                    <TextField
                        error={(loginState===State.Failed) ? true : false}
                        id="outlined-bare"
                        className={classes.textField}
                        placeholder=''
                        margin="normal"
                        variant="outlined"
                        value={loginElement.loginId}
                        onChange={this.handleChangeLoginEmail}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IdUsersIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>
                {(loginElement.emailError === true)  &&
                    <Box className={classes.errorBox}>
                        <ErrorIcon/>
                        <Typography className={classes.errorText}>이메일 형식이 잘못되었습니다.</Typography>
                    </Box>
                }
                <Box className={classes.marginTop}>
                    <Typography className={classes.textStyle}>비밀번호</Typography>
                    <TextField
                        error={(loginState===State.Failed) ? true : false}
                        id="outlined-bare"
                        className={classes.textField}
                        type={this.props.authStore.loginElement.loginPasswordShow ? 'text' : 'password'}
                        placeholder=''
                        margin="normal"
                        variant="outlined"
                        value={login.password}
                        onChange={this.handleChangeLoginPassword}
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
                                        {this.props.authStore.loginElement.loginPasswordShow ? <EyeIcon /> : <EyeClosedIcon />}
                                    </IconButton>

                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={loginElement.loginSessionMaintain}
                                onChange={this.handleChangeChecked}
                                value="checked"
                                icon={<UnCheckedIcon />}
                                checkedIcon={<CheckedIcon />}
                                disableRipple
                            />
                        }
                        label="로그인 상태 유지"
                        className={classes.checkBox}
                    />
                </Box>

                { (loginState===State.Failed)  &&
                    <Box className={classes.errorBox}>
                        <ErrorIcon/>
                        {/*<Typography className={cl식sses.errorText}>이메일 형식이 잘못되었습니다.</Typography>*/}
                        {/*<Typography className={classes.errorText}>일치하는 로그인 정보가 없습니다. 이메일을 다시 입력해주세요.</Typography>*/}
                        {/*<Typography className={classes.errorText}>일치하는 로그인 정보가 없습니다. 비밀번호를 다시 입력해주세요.</Typography>*/}
                        <Typography className={classes.errorText}>일치하는 로그인 정보가 없습니다. 다시 확인하여 주시기 바랍니다.</Typography>
                    </Box>
                }

                <Button className={classes.buttonStyle} onClick={this.handleClickSignIn} disabled={!loginElement.loginButtonActive} disableRipple>
                    로그인
                </Button>
                <Box className={classes.bottomBox}>
                    <Box className={classes.joinButtonBox}>
                        <Typography>회원이 아니신가요?</Typography>
                        <Button className={classes.joinButton} onClick={handleClickSignUp} disableRipple>회원가입</Button>
                    </Box>

                    <Button className={classes.passwordFindButton} onClick={handleClickFindPassword} disableRipple>비밀번호 찾기</Button>
                </Box>

                <ConfirmDialog
                    open={!isEmailAuth}
                    title={"이메일 미인증"}
                    msg={<Button onClick={this.handleResendEmail}>인증 이메일 다시 보내기</Button>}
                    changeDialogOpen={this.handleCloseConfirmDialog}/>


                {/*Todo 이메일 미인증 계정일때 - Button은 임의로 만들었습니다. 이메일 미인증 시 다이얼로그 노출 입니다.*/}
                {/*<Button onClick={this.handleClickEmailDialog} disableRipple>이메일 미인증 계정 일때</Button>*/}
                {/*<EmailDialog*/}
                {/*    open={this.state.emailDialogOpen}*/}
                {/*    onClose={this.handleCloseDialog}*/}
                {/*    title={<span><b>미인증</b> 계정</span>}*/}
                {/*    submitText={'이메일 다시 보내기'}*/}
                {/*    onClick={this.saveWorkUploadUsers}*/}
                {/*    children={<LoginEmailDialog/>}*/}
                {/*/>*/}


            </div>
        );
    }
}

export default withRouter(withStyles(styles)(
    (inject)('authStore','userStore')(
   (observer(Login)
   )
)));