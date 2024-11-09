import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/SignUpStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Button, Typography} from "@mui/material";
import {ReactComponent as BasicServiceLogin} from "../../common/images/BasicServiceLogin.svg";
import SignUpStepperComponent from "./stepper/SignUpStepperComponent";
import BasicInformation from "./BasicInformation";
import SelectInformation from "./SelectInformation";
import EmailAuthentication from "./EmailAuthentication";
import {observer,inject} from "mobx-react";
import ConfirmDialog from "../dialog/ConfirmDialog";

// import * as nodeMailer from 'nodemailer'
//
// const sendMail = async (email) => {
//     const transporter = nodeMailer.createTransport({
//         host : 'smtp.worksmobile.com',
//         port : '587',
//         secure : false,
//         auth:{
//             user : 'jcseo@onthelive.kr',
//             password :'37O8Cr3zq7Ks'
//         },
//         from : 'jcseo@onthelive.kr'
//     })
//     const mailOption = {
//         to: email,
//         subject:'[AI 데이터 저작도구] 이메일 주소 인증',
//         html:`
//       가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
//       <form action="http://localhost:8080/signupComplete/${email}" method="POST">
//         <button>가입확인</button>
//       </form>
//       `,
//     }
//     await transporter.sendMail(mailOption);
// }
//
// const nodemailer = require("nodemailer");
//
// const hostMail = "jcseo@onthelive.kr";
// const hostMailPassword = "37O8Cr3zq7Ks";
//
// const receiverEmail = 'ml9196@naver.com';
// const transport = nodemailer.createTransport({
//     host: "smtp.worksmobile.com",
//     secure: true,
//     port :587,
//     auth: {
//         user: hostMail,
//         pass: hostMailPassword,
//     },
// });
//sendMail('ml9196@naver.com');
// async function sendMail(){
//     try {
//         let info = await transport.sendMail({
//             from: `"온더라이브" <jcseo@onthelive.kr>`,
//             to: 'ml9196@naver.com',
//             subject: '가입완료메일입니다.',
//             html: '<div>HTML형식으로 보낼 때 사용됩니다.</div>',
//             attachments: []
//         });
//     }
//     catch(e){
//         console.log(e);
//     }
// }

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            // error: false,
            // checked: false,
            // errorCombine: false,
            // checkedCombine: false,
            // errorOver10: false,
            // checkedOver10: false,
            //
            //
            // checked0: false,
            // checked1: false,
        };
    }
    componentWillUnmount() {
        this.props.authStore.initSignupUser();
        this.props.signUpStore.initBasic();
        this.props.signUpStore.initBirth();
    }
    componentDidMount() {
        this.props.authStore.initSignupUser();
        this.props.signUpStore.initBirth();
        this.props.signUpStore.initBasic();
    }

    handleCombineBirth = () =>{
        if(this.props.signUpStore.birth.birthYear.length ===4 &&
            this.props.signUpStore.birth.birthMonth.length ===2 &&
            this.props.signUpStore.birth.birthDay.length ===2)
        {
            const birth = `${this.props.signUpStore.birth.birthYear}-${this.props.signUpStore.birth.birthMonth}-${this.props.signUpStore.birth.birthDay}`
            this.props.authStore.changeSignupBirth(birth);
        }
    }
    handleNext = async () => {
        console.log("handleNext Start... this.state.activeStep:",this.state.activeStep);
        const {signupUser} = this.props.authStore;
        const {activeStep} = this.state;
        if(activeStep === 0) {
            await this.checkSignUpParams();
        } else if(activeStep === 1) {
            this.handleCombineBirth();
            this.props.authStore.doSignUp();
        } else if (activeStep === 2 || activeStep === 3) {
            this.props.authStore.resendSignUpEmail(signupUser.id);
        }
        if (this.props.signUpStore.signUpValidationState === true && activeStep < 3) {
            this.setState(state => ({activeStep: state.activeStep + 1}));
        }
    };

    checkSignUpParams = () => {
        const {signupUser} = this.props.authStore;
        const {basic} = this.props.signUpStore;
        if(signupUser.email.length < 1 || basic.errorEmail) {
            this.props.signUpStore.changeSignUpValidationState(false);
            this.props.signUpStore.changeSignUpValidationMsg("이메일을 확인해주세요.");

        } else if ((basic.errorCombine || basic.errorOver10) || !(basic.checkedCombine && basic.checkedOver10)) {
            this.props.signUpStore.changeSignUpValidationState(false);
            this.props.signUpStore.changeSignUpValidationMsg("비밀번호 생성 규칙에 맞지 않습니다.");

        } else if (basic.errorNickname || !basic.checkedNickname) {
            this.props.signUpStore.changeSignUpValidationState(false);
            this.props.signUpStore.changeSignUpValidationMsg("작업 닉네임을 확인 해주세요.");

        } else if (!(basic.checked0 && basic.checked1)) {
            this.props.signUpStore.changeSignUpValidationState(false);
            this.props.signUpStore.changeSignUpValidationMsg("이용약관 및 개인정보 처리방침에 동의해주세요.");
        } else {
            this.props.authStore.doCheckEmailDuplicate(this.doCheckEmailDuplicateCallback);
        }
    }

    doCheckEmailDuplicateCallback = (value) => {
        if (value) {
            this.props.signUpStore.changeSignUpValidationState(false);
            this.props.signUpStore.changeSignUpValidationMsg("이미 사용중인 이메일 입니다.");
        }
    }

    handleBack = () => {
        this.setState(state => ({activeStep: state.activeStep - 1}));
    };

    handleClickLogin = () => {
        this.props.navigate('/login');
    };

    handleCloseConfirmDialog = () => {
        this.props.signUpStore.changeSignUpValidationState(true);
    }

    render() {
        const {classes} = this.props;
        const {signUpValidationState, signUpValidationMsg} = this.props.signUpStore;

        return (
            <div className={classes.root}>
                <Box className={classes.boxStyle}>
                    <Box className={classes.logoBox} onClick={this.handleClickLogin}>
                        <BasicServiceLogin/>
                    </Box>
                    <Typography className={classes.titleText}>회원가입</Typography>
                    <SignUpStepperComponent activeStep={this.state.activeStep} handleBack={this.handleBack}/>

                    {this.state.activeStep === 0 &&
                        <BasicInformation />
                    }

                    {this.state.activeStep === 1 &&
                        <SelectInformation/>
                    }

                    {(this.state.activeStep === 2
                        || this.state.activeStep === 3)
                        && <EmailAuthentication/>
                    }

                    <Button className={classes.buttonStyle} disableRipple onClick={this.handleNext}>
                        {this.state.activeStep === 0 || this.state.activeStep === 1 ?
                            '다음' : '이메일 다시 보내기'
                        }
                    </Button>
                    {/*{this.state.activeStep !== 2 &&*/}
                    <Box className={classes.bottomBox}>
                        <Typography className={classes.loginText}>이미 회원이신가요?</Typography>
                        <Button className={classes.loginButton} onClick={this.handleClickLogin}
                                disableRipple>로그인</Button>
                    </Box>
                    {/*}*/}
                </Box>

                <ConfirmDialog
                    open={!signUpValidationState}
                    title={"알람"}
                    msg={signUpValidationMsg}
                    changeDialogOpen={this.handleCloseConfirmDialog}/>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(
    (inject)('authStore','signUpStore')
    ((observer)((SignUp)))));