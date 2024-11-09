import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/LoginStyle";
import {withRouter} from "../../components/WithRouter";
import { ReactComponent as CheckCircleIcon } from '../../common/images/CheckCircleIcon.svg';
import {
    Box,
    Button, IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import clsx from "clsx";
import {ReactComponent as PasswordIcon} from "../../common/images/PasswordIcon.svg";
import {ReactComponent as EyeIcon} from "../../common/images/EyeIcon.svg";
import {ReactComponent as EyeClosedIcon} from "../../common/images/EyeClosedIcon.svg";
import LoginDialog from "../dialog/LoginDialog";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showPasswordCheck: false,
            error: false,
            checked: false,
            dialogOpen: false,
        };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowPasswordCheck = () => {
        this.setState(state => ({ showPasswordCheck: !state.showPasswordCheck }));
    };

    handleClickDialog = () => {
        this.setState(state => ({ dialogOpen: true }));
    };

    handleCloseDialog = () => {
        this.setState(state => ({ dialogOpen: false }));
    };

    handleClickLogin = () => {
        this.props.navigate('/login');
        this.setState(state => ({ dialogOpen: false }));
    };

    render() {
        const {classes} = this.props;
        const {error, checked} = this.state;

        return (
           <div>
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
                       value={this.state.title}
                       onChange={this.handleClickTitle}
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
                                    checked ?
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
                                   checked ?
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
                       value={this.state.title}
                       onChange={this.handleClickTitle}
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
               </Box>

               <Button className={clsx(classes.buttonStyle, classes.buttonMargin)} onClick={this.handleClickDialog} disableRipple>
                   비밀번호 재설정
               </Button>

               <LoginDialog
                   open={this.state.dialogOpen}
                   onClose={this.handleCloseDialog}
                   title={'비밀번호 재설정이 완료되었습니다.'}
                   submitText={'로그인'}
                   onClick={this.handleClickLogin}
               />

            </div>
        );
    }
}

export default withRouter(withStyles(styles)(ChangePassword));