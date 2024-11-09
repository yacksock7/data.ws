import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/BasicInformationStyle";
import {withRouter} from "../../components/WithRouter";
import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ReactComponent as EyeIcon} from "../../common/images/EyeIcon.svg";
import {ReactComponent as EyeClosedIcon} from "../../common/images/EyeClosedIcon.svg";
import clsx from "clsx";
import {ReactComponent as CheckCircleIcon} from "../../common/images/CheckCircleIcon.svg";
import {ReactComponent as ErrorIcon} from "../../common/images/ErrorIcon.svg";
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import {inject, observer} from "mobx-react";

class BasicInformation extends Component {
    constructor(props) {
        super(props);
    }

    handleClickShowPassword = () => {
        this.props.signUpStore.changeShowPassword(!(this.props.signUpStore.basic.showPassword));
    };

    handleChangeFilter = (e) => {
        this.props.signUpStore.changeFilter(e.target.value);
    };

    handleClickAllChecked = () => {
        const {allChecked} = this.props.signUpStore.basic.allChecked;
        this.props.signUpStore.changeAllChecked(!allChecked);
        this.props.signUpStore.changeChecked0(!allChecked);
        this.props.signUpStore.changeChecked1(!allChecked);

    };

    handleClickChecked = (index) => {
         if (index === 0) {
            this.props.signUpStore.changeChecked0(!this.props.signUpStore.basic.checked0);
         } else {
             this.props.signUpStore.changeChecked1(!this.props.signUpStore.basic.checked1);
         }
    };

    checkPasswordRule= (e) => {
        const password = e.target.value;
        const regexNumber = /[0-9]/;
        const regexLetter = /[a-zA-Z]/;
        const regexSpecial = /[@$!%*#?&]/;

        let count = 0;
        if (regexNumber.test(password)) count++;
        if (regexLetter.test(password)) count++;
        if (regexSpecial.test(password)) count++;

        if(count>=2) {
            this.props.signUpStore.changeErrorCombine(false);
            this.props.signUpStore.changeCheckedCombine(true);
        } else {
            this.props.signUpStore.changeErrorCombine(true);
            this.props.signUpStore.changeCheckedCombine(false);
        }

        if (password.length>=10) {
            this.props.signUpStore.changeErrorOver10(false);
            this.props.signUpStore.changeCheckedOver10(true);
        } else {
            this.props.signUpStore.changeErrorOver10(true);
            this.props.signUpStore.changeCheckedOver10(false);
        }
        this.props.authStore.changeSignupPassword(password);
        return count >= 2;
    };

    handleChangeNickname = (e) => {
        this.props.authStore.changeSignupNickname(e.target.value);
        this.props.signUpStore.changeErrorNickname(true);
        this.props.signUpStore.changeCheckedNickname(false);
    };

    handleCheckNickname = () => {
        this.props.authStore.doCheckNicknameDuplicate();
    };

    handleClickSelect = () => {
        this.props.signUpStore.changeFilter(1);
        this.props.signUpStore.changeErrorEmail(true);
        this.props.signUpStore.changeCheckedEmail(2);
        this.props.signUpStore.changeDomainName("");
        let emailCombine = this.props.signUpStore.basic.emailName+'@'+this.props.signUpStore.basic.domainName;
        this.props.authStore.changeSignupEmail(emailCombine);
    };

    handleFocusout = () => {
        if (this.props.signUpStore.basic.emailName.length === 0) {
            //나중에 이메일 입력해주세요 요청있으면 여기에 emailName
            this.props.signUpStore.changeErrorEmail(true);

        } else if (this.props.signUpStore.basic.emailName.length !== 0 && this.props.signUpStore.basic.filter=== 1) {
            this.props.signUpStore.changeCheckedEmail(1);

        } else if (this.props.signUpStore.basic.filter === 7) {
            let emailCombine = this.props.signUpStore.basic.emailName+'@'+this.props.signUpStore.basic.domainName;
            this.props.authStore.changeSignupEmail(emailCombine);
            this.props.authStore.doCheckEmailDuplicate(this.checkMailDuplicate);

        } else if (this.props.signUpStore.basic.filter !== 1)  {
            //중복시 '사용할 수 없는 이메일입니다.'
            let domainName = ['','','naver.com','gmail.com','nate.com','hanmail.com','hotmail.com'];
            let emailCombine = this.props.signUpStore.basic.emailName+'@'+domainName[this.props.signUpStore.basic.filter];
            this.props.authStore.changeSignupEmail(emailCombine);
            this.props.authStore.doCheckEmailDuplicate(this.checkMailDuplicate);
        }
    }

    checkMailDuplicate = (flag) => {
        this.props.signUpStore.changeCheckedEmail(5);
        this.props.signUpStore.changeErrorEmail(flag);
    }
    handleDomainBoxFocusOut = () =>{
        //직접입력 박스
        //console.log("####Domain focusout")

        const {basic} = this.props.signUpStore;
        if(basic.emailName.length !== 0) {
            let emailCombine = basic.emailName+'@'+basic.domainName;
            this.props.authStore.changeSignupEmail(emailCombine);
            if (!basic.errorEmail) {
                this.props.authStore.doCheckEmailDuplicate(this.checkMailDuplicate);
            }
        } else {
            this.props.signUpStore.changeCheckedEmail(2);//직접 입력선택,입력x
        }
    }
    handleDomainBoxFocusOut2 = () =>{
        //메뉴 선택 박스
        //console.log("####Domain focusout22")
        const {basic} = this.props.signUpStore;
        if (basic.emailName.length !== 0) {
            let domainName = ['','','naver.com','gmail.com','nate.com','hanmail.com','hotmail.com'];
            let emailCombine = basic.emailName+'@'+domainName[basic.filter];
            this.props.authStore.changeSignupEmail(emailCombine);
            if (!basic.errorEmail) {
                this.props.authStore.doCheckEmailDuplicate(this.checkMailDuplicate);
            }
        } else {
            this.props.signUpStore.changeCheckedEmail(1);//도메인 선택x
        }
    }

    handleChangeEmail = (e) => {
        this.props.signUpStore.changeEmailName(e.target.value);
    }
    handleChangeDomain = (e) => {
        this.props.signUpStore.changeDomainName(e.target.value);
    }


    render() {
        const {classes} = this.props;
        const {signupUser} = this.props.authStore;
        const {basic} = this.props.signUpStore;
    const {errorNickname, checkedNickname, errorCombine,checkedCombine,errorOver10,checkedOver10} = basic;

        return (
            <div className={classes.root}>
                <Box>
                    <Typography className={classes.textStyle}>이메일</Typography>
                    {basic.filter === 7 &&
                        <Box display='flex' justifyContent='flex-end'>
                            <Button className={classes.selectViewBtn} onClick={this.handleClickSelect} disableRipple>다시선택</Button>
                        </Box>
                    }
                    <Box display='flex' alignItems='center'>
                        <TextField
                            id="outlined-bare"
                            className={clsx(classes.textField, classes.textFieldEmail)}
                            placeholder=''
                            margin="normal"
                            variant="outlined"
                            value={basic.emailName}
                            onChange={this.handleChangeEmail}
                            onBlur={this.handleFocusout}
                        />
                        <Typography className={classes.emailText}>@</Typography>
                        {basic.filter === 7 ?
                            <TextField
                                id="outlined-bare"
                                className={clsx(classes.textField, classes.textFieldEmail)}
                                placeholder=''
                                margin="normal"
                                variant="outlined"
                                value={basic.domainName}
                                onChange={this.handleChangeDomain}
                                onBlur={this.handleDomainBoxFocusOut}
                            />
                            :
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={basic.filter}
                                    onChange={this.handleChangeFilter}
                                    IconComponent={(props) => (
                                        <Box>
                                            <ArrowDownIcon  {...props} />
                                        </Box>
                                    )}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "right"
                                        },
                                        transformOrigin:{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        },
                                        // getContentAnchorEl: null,
                                        className:classes.selectPopover
                                    }}
                                    onBlur={this.handleDomainBoxFocusOut2}
                                >
                                    <MenuItem disabled={true} value={1}>선택해주세요</MenuItem>
                                    <MenuItem value={2}>naver.com</MenuItem>
                                    <MenuItem value={3}>gmail.com</MenuItem>
                                    <MenuItem value={4}>nate.com</MenuItem>
                                    <MenuItem value={5}>hanmail.com</MenuItem>
                                    <MenuItem value={6}>hotmail.com</MenuItem>
                                    <MenuItem value={7}>직접 입력</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    </Box>
                    <Box className={classes.infoMargin}>
                        <Box className={clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)}>
                            {((basic.checkedEmail === 1) && basic.errorEmail)&&
                                <>
                                    <ErrorIcon/>
                                    <Typography>이메일 도메인을 선택하세요.</Typography>
                                </>
                            }
                            {(basic.checkedEmail === 2)&& basic.errorEmail &&
                                <>
                                    <ErrorIcon/>
                                    <Typography>이메일 도메인을 입력하세요.</Typography>
                                </>
                            }
                            {(basic.checkedEmail === 4) && basic.errorEmail &&
                                <>
                                    <ErrorIcon/>
                                    <Typography>이메일 형식을 확인하세요.</Typography>
                                </>
                            }
                            {(basic.checkedEmail === 5) && basic.errorEmail &&
                                <>
                                    <ErrorIcon/>
                                    <Typography>이미 사용중인 이메일 입니다.</Typography>
                                </>
                            }
                            {/*{!basic.errorEmail &&*/}
                            {/*    <>*/}
                            {/*        <CheckCircleIcon/>*/}
                            {/*        <Typography>사용할 수 있는 이메일입니다.</Typography>*/}
                            {/*    </>*/}
                            {/*}*/}

                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography className={classes.textStyle}>비밀번호</Typography>
                    <TextField
                        id="outlined-bare"
                        className={classes.textField}
                        type={basic.showPassword ? 'text' : 'password'}
                        placeholder=''
                        margin="normal"
                        variant="outlined"
                        value={signupUser.password}
                        onChange={this.checkPasswordRule}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.handleClickShowPassword}
                                        className={classes.iconButton}
                                        disableRipple
                                    >
                                        {basic.showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                                    </IconButton>

                                </InputAdornment>
                            ),
                        }}
                        style={{width: '100%'}}
                    />

                    <Box className={classes.infoMargin}>
                        <Box
                            className={
                                errorCombine ?
                                    clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                    :
                                    checkedCombine ?
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
                                errorOver10 ?
                                    clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                    :
                                    checkedOver10 ?
                                        clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)
                                        :
                                        classes.checkInfoTextBox
                            }
                        >
                            <CheckCircleIcon/>
                            <Typography>10자 이상</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Typography className={classes.textStyle}>작업 닉네임</Typography>
                    <Box display='flex' alignItems='center'>
                        <TextField
                            id="outlined-bare"
                            className={clsx(classes.textField, classes.textFieldName)}
                            placeholder=''
                            margin="normal"
                            variant="outlined"
                            value={signupUser.nickname}
                            onChange={this.handleChangeNickname}
                            inputProps={{ maxLength: 49 }}
                        />

                        <Button className={classes.na인meButton} onClick={this.handleCheckNickname} disableRipple>중복확인</Button>
                    </Box>

                    <Box className={classes.infoMargin}>
                        <Box
                            className={
                                errorNickname ?
                                    clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)
                                    :
                                    clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)

                            }
                        >
                            {errorNickname &&
                                <>
                                    <ErrorIcon/>
                                    <Typography>중복 확인을 해주세요.</Typography>
                                    {/*<Typography>사용할 수 없는 닉네임입니다.</Typography>*/}
                                    {/*<Typography>이용약관 및 개인정보 처리방침에 동의해주세요.</Typography>*/}
                                </>
                            }

                            {checkedNickname &&
                                <>
                                    <CheckCircleIcon/>
                                    <Typography>사용할 수 있는 닉네임입니다.</Typography>
                                </>
                            }

                        </Box>
                    </Box>
                </Box>

                <Box className={classes.lineStyle}/>

                <Box className={classes.formGroupBox}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={basic.allChecked}
                                onChange={this.handleClickAllChecked}
                                value="checked"
                                icon={<CheckCircleIcon/>}
                                checkedIcon={<CheckCircleIcon className={classes.checkedColor} />}
                                disableRipple
                            />
                        }
                        label="전체 약관동의"
                        className={clsx(classes.checkBox, classes.checkBoxAll)}
                    />
                    <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={basic.checked0}
                                    onChange={() => this.handleClickChecked(0)}
                                    value="checked0"
                                    icon={<CheckCircleIcon />}
                                    checkedIcon={<CheckCircleIcon className={classes.checkedColor}/>}
                                    disableRipple
                                />
                            }
                            label={<span><span className={classes.textColor}>[필수]</span> 서비스 이용약관</span>}
                            className={classes.checkBox}
                        />

                        <Button className={classes.viewButton} disableRipple>보기</Button>
                    </Box>

                    <Box display='flex' justifyContent='space-between' alignItems='flex-end'>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={basic.checked1}
                                    onChange={() => this.handleClickChecked(1)}
                                    value="checked1"
                                    icon={<CheckCircleIcon />}
                                    checkedIcon={<CheckCircleIcon className={classes.checkedColor}/>}
                                    disableRipple
                                />
                            }
                            label={<span><span className={classes.textColor}>[필수]</span> 개인정보 수집 및 처리방침</span>}
                            className={classes.checkBox}
                        />
                        <Button className={classes.viewButton} disableRipple>보기</Button>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(
    (inject)('authStore','signUpStore')(
        (observer)(BasicInformation))));