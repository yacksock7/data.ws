import React, {Component} from 'react';
import {styles} from "./styles/ProfileEditStyle";
import {withRouter} from "../../components/WithRouter";
import {
    Box,
    Typography,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormControlLabel,
    Radio
} from "@mui/material";
import {withStyles} from "@mui/styles";
import ProfileImg from '../../common/images/AvatarImg.jpg';
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import {ReactComponent as UnRadioIcon} from "../../common/images/UnRadioIcon.svg";
import {ReactComponent as RadioIcon} from "../../common/images/RadioIcon.svg";
import clsx from "clsx";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";
class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: 1,
            email:'',
            domain:'',
            emailDuplicate : true,
            nicknameDuplicate : true,
            nicknameDuplicateCheck : false
        }
    }
    componentDidMount() {
        const domain = this.props.authStore.loginUser.email.slice(this.props.authStore.loginUser.email.indexOf('@')+1);
        console.log('domain' , domain);
        switch (domain){
            case 'naver.com' :
                this.handleChangeFilter(2);
                break;
            case 'gmail.com':
                this.handleChangeFilter(3);
                break;
            case 'nate.com':
                this.handleChangeFilter(4);
                break;
            case 'hanmail.com':
                this.handleChangeFilter(5);
                break;
            case 'hotmail.com':
                this.handleChangeFilter(6);
                break;
            default:
                this.handleChangeFilter(7);
        }

        this.props.authStore.initSignupUser();
        this.props.signUpStore.initBasic();
    }

    handleClickProfile = () => {
        this.props.navigate('/profile');
    };
    handleChangeDomain = (e) =>{
        this.setState({
            domain: e.target.value
        })
    }
    handleChangeSelectFilter = (e) =>{
        this.handleChangeFilter(e.target.value);
    }

    handleChangeFilter = (filterNum) => {
        const domainArr = [null,null,'naver.com','gmail.com','nate.com','hanmail.com','hotmail.com','']
        const domain = domainArr[filterNum];

        this.setState({
            filter : filterNum,
            domain : domain
        })
        //this.props.signUpStore.changeFilter(e.target.value);
    };

    handleChangeRadio = (e) => {
        //this.props.authStore.changeSignupGender(e.target.value);
        this.props.userStore.changeUserProfileGender(e.target.value);
    };

    handleClickEmailDuplicated = async () =>{
        console.log('emailState', this.state.email)
        if(this.state.email.length === 0){
            alert('이메일을 입력하세요.');
            return;
        }else if(this.state.filter > 7 || this.state.filter < 2){
            alert('이메일 도메인을 선택하세요.');
            return;
        }else if(this.state.filter === 7 && this.state.domain.length === 0){
            alert('이메일 도메인을 입력하세요.');
            return;
        }
        const combinedEmail = `${this.state.email}@${this.state.domain}`;
        console.log('email',combinedEmail);
        this.props.authStore.changeSignupEmail(combinedEmail);
        await this.props.authStore.doCheckEmailDuplicate(this.checkMailDuplicate);
        console.log('email',this.state.emailDuplicate);
        if(this.state.emailDuplicate){
            alert('사용할 수 없는 이메일입니다.');
            return;
        }
    }

    checkMailDuplicate = (flag) => {
        this.setState({
            emailDuplicate : flag
        })
    }

    handleClickNicknameDuplicated = async () =>{
        //console.log('NicknameState', this.state.nickname)
        const result = await this.props.authStore.doCheckNicknameDuplicate();
        await this.setState({
            nicknameDuplicate : result
        })
        if(result){
            alert('사용할 수 없는 닉네임 입니다.');
            return
        }
    }

    handleChangeEmail = (e) =>{
        this.setState({
            email : e.target.value
        })
    }

    handleChangeNickname = (e) =>{
        this.props.authStore.changeSignupNickname(e.target.value);
        // this.setState({
        //     nickname : e.target.value
        // })
    }

    handleClickCancel = () =>{
        this.props.navigate('/profile');
    }

    handleClickSave = async () =>{
        const {basic} = this.props.signUpStore;
        const {signupUser,loginUser} = this.props.authStore;
        if(this.state.email === '' && signupUser.nickname === '') {
            //그냥 선택정보 저장
           await this.props.authStore.changeUserProfile(loginUser.id);
        } else if(this.state.email === '' && signupUser.nickname !== ''){
            //닉네임 중복 확인하고 닉네임 업뎃, 선택정보 저장
            if(this.state.nicknameDuplicateCheck === true && this.state.nicknameDuplicate === false){
                await this.props.authStore.changeUserProfile(loginUser.id);
            }
            else if(this.state.nicknameDuplicateCheck === false){
                alert('닉네임 중복 확인을 해주세요.');
                return;
            }
            else if(this.state.nicknameDuplicate === true){
                alert('사용할 수 없는 닉네임 입니다.');
                return;
            }
        } else if(this.state.email !== '' && this.state.nickname === ''){
            //이메일 중복 확인하고 이메일 업뎃, 선택정보 저장
            if(this.state.emailDuplicate === false){
                await this.props.authStore.changeUserProfile(loginUser.id);
            } else{
                alert('이메일 중복 확인을 해주세요.');
                return;
            }
        } else{
            //이메일 닉네임 중복 확인하고 둘 다 업뎃, 선택정보 저장
            if(this.state.emailDuplicate === false && this.state.nicknameDuplicateCheck === true && this.state.nicknameDuplicate === false){
                await this.props.authStore.changeUserProfile(loginUser.id);
            } else if(this.state.nicknameDuplicateCheck === false){
                alert('닉네임 중복 확인을 해주세요.');
                return;
            } else if(this.state.nicknameDuplicate === true){
                alert('사용할 수 없는 닉네임 입니다.');
                return;
            } else if(this.state.emailDuplicate === true){
                alert('이메일 중복 확인을 해주세요.');
                return;
            }
        }
        this.props.navigate('/profile');
    }

    render() {
        const {classes} = this.props;
        const {userProfile} = this.props.userStore;
        const {loginUser,signupUser} = this.props.authStore;
        //const {basic} = this.props.signUpStore;
        const emailId = loginUser.email.slice(0,loginUser.email.indexOf('@'));
        return (
            <div className={classes.root}>
                <Typography className={classes.titleStyle}>프로필</Typography>
                <Box className={classes.content}>
                    <Box className={classes.profileImgBox}>
                        <Box className={classes.avatar}>
                            <img src={ProfileImg} alt={"프로필사진"}/>
                        </Box>
                        <Button disableRipple className={classes.buttonTinyStyle}>사진 편집</Button>
                    </Box>
                    <Box>
                        <Box>
                            <Typography className={classes.subtitleStyle}>기본정보</Typography>
                            <Box className={classes.dlStyle}>
                                <Typography className={clsx(classes.labelStyle, classes.requiredStyle)}>이메일</Typography>
                                <TextField
                                    id="outlined-bare"
                                    className={clsx(classes.textField, classes.textFieldEmail)}
                                    placeholder={emailId}
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.handleChangeEmail}
                                    // onBlur={this.handleFocusout}
                                />
                                <Typography className={classes.emailText}>@</Typography>
                                {this.state.filter === 7 ?
                                    <TextField
                                        id="outlined-bare"
                                        className={clsx(classes.textField, classes.textFieldEmail)}
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.domain}
                                        onChange={this.handleChangeDomain}
                                        //onBlur={this.handleDomainBoxFocusOut}
                                    />
                                    :
                                    <FormControl className={classes.formControl}>
                                            <Select
                                                value={this.state.filter}
                                                onChange={this.handleChangeSelectFilter}
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
                                                // onBlur={this.handleDomainBoxFocusOut2}
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
                                <Button className={classes.nameButton} onClick={this.handleClickEmailDuplicated} disableRipple>중복확인</Button>
                            </Box>
                            <Box className={classes.infoMargin}>
                                <Box className={clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxChecked)}>
                                    <Typography>*사용할 수 있는 닉네임입니다.</Typography>
                                </Box>
                            </Box>
                            <Box className={classes.dlStyle}>
                                <Typography className={clsx(classes.labelStyle, classes.requiredStyle)}>닉네임</Typography>
                                <TextField
                                    className={classes.textField}
                                    placeholder={loginUser.nickname}
                                    onChange={this.handleChangeNickname}
                                    value={signupUser.nickname}>
                                </TextField>
                                <Button className={classes.nameButton} onClick={this.handleClickNicknameDuplicated} disableRipple>중복확인</Button>
                            </Box>
                        </Box>
                        <Box className={classes.boxStyle}>
                        <Typography className={classes.subtitleStyle}>선택정보 </Typography>
                            <Box className={classes.dlStyle}>
                                <Typography className={classes.labelStyle}>성명</Typography>
                                <TextField className={classes.textField} placeholder={userProfile?userProfile.name:''}>
                                </TextField>
                            </Box>
                            <Box className={classes.dlStyle}>
                                <Typography className={classes.labelStyle}>성별</Typography>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={userProfile && userProfile.gender === 'male'}
                                            onChange={this.handleChangeRadio}
                                            value="male"
                                            icon={<UnRadioIcon />}
                                            checkedIcon={<RadioIcon />}
                                            disableRipple
                                        />
                                    }
                                    label="남자"
                                    className={classes.radioBox}
                                />
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={userProfile && userProfile.gender === 'female'}
                                            onChange={this.handleChangeRadio}
                                            value="female"
                                            icon={<UnRadioIcon />}
                                            checkedIcon={<RadioIcon />}
                                            disableRipple
                                        />
                                    }
                                    label="여자"
                                    className={classes.radioBox}
                                />
                            </Box>
                            <Box className={classes.dlStyle}>
                                <Typography className={classes.labelStyle}>생년월일</Typography>
                                <TextField
                                    className={clsx(classes.textField, classes.textFieldBirth)}
                                    placeholder={userProfile && userProfile.birth !==null ? dayjs(userProfile.birth).year():''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={clsx(classes.textField, classes.textFieldBirth)}
                                    placeholder={userProfile && userProfile.birth !==null ? dayjs(userProfile.birth).month()+1:''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={clsx(classes.textField, classes.textFieldBirth)}
                                    placeholder={userProfile && userProfile.birth !==null ? dayjs(userProfile.birth).date():''}
                                    variant="outlined"
                                />
                            </Box>
                            <Box className={classes.dlStyle}>
                                <Typography className={classes.labelStyle}>소속</Typography>
                                <TextField className={classes.textField} placeholder={userProfile ? userProfile.organization:''}>
                                </TextField>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.activeBtnBox}>
                    <Button disableRipple variant="text" className={classes.textBtnStyle} onClick={this.handleClickCancel}>취소</Button>
                    <Button disableRipple className={classes.buttonStyle} onClick={this.handleClickSave}>저장</Button>
                </Box>
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(
    inject('authStore','userStore','signUpStore')(
        observer(ProfileEdit))
    )
);

