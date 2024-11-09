import {action, flow, makeAutoObservable, observable} from "mobx";
import * as Validation from '../components/common/Validation';
import axios from "axios";
import {AuthTokenStorageKey} from "../repositories/Repository";
import findPassword from "../views/login/FindPassword";

const LogPrefix = '[AuthStore]';

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const UserAuthType = {
    AUTHENTICATED : 'AUTHENTICATED',
    NOTAUTHENTICATED : 'NOTAUTHENTICATED'
}

export const ErrorMsg = {
    CanNotValidateToken : "유효하지 않는 요청입니다.",
    ExpiredToken : "요청 시간이 만료 되었습니다."
}

export const LocalStorageTokenKey = '_BASIC_AUTHENTICATION_TOKEN_';

const EmptyLogin = {
    email: '',
    password: '',
};

const EmptyUser = {
    id: '',
    email: '',
    password : '',
    nickname: '',
    type: '',
    name: '',
    gender :'',
    birth : '',
    organization : '',
};

const EmptyLoginProcessElement ={
    loginId:'',
    emailError:false,
    loginIdError:false,
    passwordError:false,
    loginError:false,
    loginPasswordShow:false,
    loginButtonActive:false,
    loginSessionMaintain:false
};

const EmptyFindPassword={
    error:false,
    errorMatch:false,
    emailButton:false,
    email:''
}

export default class AuthStore {
    constructor(props) {
        this.authRepository = props.authRepository;
        this.signUpStore = props.signUpStore;

        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginUser = Object.assign({}, EmptyUser);
        this.signupUser = Object.assign({}, EmptyUser);
        this.loginElement = Object.assign({}, EmptyLoginProcessElement);
        this.findPassword = Object.assign({}, EmptyFindPassword);

        this.isEmailAuth = true;
        this.newPassword = '';
        this.newPasswordConform = '';
        this.passwordDialogOpen = false;
        this.passwordDialogMsg = "";
        this.passwordDialogError = false;

        makeAutoObservable(this);
    }
    initFindPasswordEmail = () => {
        this.findPassword = Object.assign({}, EmptyFindPassword);
    }
    initSignupUser = () => {
        this.signupUser = Object.assign({},EmptyUser);
    };
    initLoginElement = () => {
        this.loginElement = Object.assign({}, EmptyLoginProcessElement);
    };

    changePasswordDialogOpen = (value) => {
        this.passwordDialogOpen = value;
    }
    changePasswordDialogMsg = (msg) => {
        this.passwordDialogMsg = msg;
    }
    changePasswordDialogError = (value) => {
        this.passwordDialogError = value;
    }

    changeNewPassword = (newPassword) => {
        this.newPassword = newPassword;
    };
    changeNewPasswordConfirm = (newPasswordConfirm) => {
        this.newPasswordConfirm = newPasswordConfirm;
    };

    changeEmailAuth = (isEmailAuth) => {
        this.isEmailAuth = isEmailAuth;
    }


    changeFindPasswordEmailButton= (flag) =>{
        this.findPassword.emailButton = flag;
    }
    changeFindPasswordError = (flag) =>{
        this.findPassword.error = flag;
    }
    changeFindPasswordErrorMatch = (flag) =>{
        this.findPassword.errorMatch = flag;
    }
    changeFindPasswordEmail= (email) =>{
        this.findPassword.email = email;
    }

    changeLoginElementLoginId=(loginId) =>
    {
        this.loginElement.loginId = loginId;
    };
    changeLoginElementEmailError = (emailError) =>
    {
        this.loginElement.emailError = emailError;
    };
    changeLoginElementLoginIdError = (loginIdError) =>
    {
        this.loginElement.loginIdError = loginIdError;
    };
    changeLoginElementPasswordError = (passwordError) =>
    {
        this.loginElement.passwordError = passwordError;
    };
    changeLoginElementLoginError = (loginError) =>
    {
        this.loginElement.loginError = loginError;
    };
    changeLoginElementLoginPasswordShow = (loginPasswordShow) =>
    {
        this.loginElement.loginPasswordShow = loginPasswordShow;
    };
    changeLoginElementLoginButtonActive = (loginButtonActive) =>
    {
        this.loginElement.loginButtonActive = loginButtonActive;
    };
    changeLoginElementLoginSessionMaintain = (loginSessionMaintain) =>
    {
        this.loginElement.loginSessionMaintain = loginSessionMaintain;
    };

    changeLoginEmail = (email) => {
        this.login.email = email;
    };

    changeLoginPassword = (password) => {
        this.login.password = password;
    };

    changeLoginState = (state) => {
        this.loginState = state;
    }

    handleChangNickName = (nickname) => {
        this.loginUser.nickname = nickname;
    };

    changeSignupNickname = (nickname) => {
        this.signupUser.nickname = nickname;
    };
    changeSignupEmail = (email) => {
        this.signupUser.email = email;
        const result = Validation.validateEmail(email);
        if (result) {
            this.signUpStore.changeErrorEmail(false);
        } else {
            this.signUpStore.changeErrorEmail(true);
            this.signUpStore.changeCheckedEmail(4);
        }
    };
    changeSignupPassword = (password) => {
        this.signupUser.password = password;
    };

    changeSignupName = (name) =>{
        this.signupUser.name =name;
    };
    changeSignupGender = (gender) =>{
        this.signupUser.gender =gender;
    };
    changeSignupBirth = (birth) =>{
        this.signupUser.birth =birth;
    };
    changeSignupOrganization= (organization) =>{
        this.signupUser.organization = organization;
    };
    changeSignupType= (type) =>{
        this.signupUser.type = type;
    };

    invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginUser = Object.assign({}, EmptyUser);
    };

    *doLogin(loginCallback) {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield this.authRepository.signIn(param);

            if (response.user.authType === UserAuthType.AUTHENTICATED) {
                sessionStorage.setItem(AuthTokenStorageKey, response.token);
                this.loginState = State.Authenticated;
                this.loginUser = response.user;
                console.log('response',response);
                loginCallback();
            } else {
                this.loginState = State.NotAuthenticated;
                this.loginUser = response.user;
                this.changeEmailAuth(false);
            }
        } catch (e) {
            this.loginState = State.Failed;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
            console.log('[LoginFailed]',e);
        }
    }

    *checkLogin(checkLoginCallback) {
        const token = sessionStorage.getItem(LocalStorageTokenKey);

        if(token) {
            try {
                const user = yield this.authRepository.signCheck();
                this.loginState = State.Authenticated;
                this.loginUser = user;
                checkLoginCallback();
            } catch(e) {
                this.loginState = State.NotAuthenticated;
                this.loginUser = Object.assign({}, EmptyUser);
                checkLoginCallback();
            }
        }
    }

    *doLogout() {
        sessionStorage.removeItem(LocalStorageTokenKey);

        try {
            yield this.authRepository.signOut();

            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginUser = Object.assign({}, EmptyUser);
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginUser = Object.assign({}, EmptyUser);
        }
    }

    *doCheckNicknameDuplicate(){
        try{
            const result = yield this.authRepository.checkNicknameDuplicate(this.signupUser.nickname);

            if (result) {
                this.signUpStore.changeErrorNickname(true);
                this.signUpStore.changeCheckedNickname(false);
            } else {
                this.signUpStore.changeErrorNickname(false);
                this.signUpStore.changeCheckedNickname(true);
            }
            return result;
        }
        catch(e){
            console.log(LogPrefix, "doCheckNicknameDuplicate Failed. error=", e);
        }
    }

    *doCheckEmailDuplicate(func){
        try{
            const result = yield this.authRepository.getUserByEmail(this.signupUser.email);
            func(result);
        } catch(e){
            console.log(e);
        }
    }

    // *doSignUp(){
    //     try{
    //         const data = {
    //             id: this.signupUser.id,
    //             email: this.signupUser.email,
    //             password : this.signupUser.password,
    //             nickname: this.signupUser.nickname,
    //             type: 'User',
    //         };
    //         const result = yield this.authRepository.signUp(data);
    //         if(result.userId !== null) {
    //             const userProfile = {
    //                 userId: result.userId,
    //                 avatarImageObject : '',
    //                 name : this.signupUser.name,
    //                 gender : this.signupUser.gender,
    //                 birth : this.signupUser.birth,
    //                 organization : this.signupUser.organization
    //             }
    //             yield this.authRepository.createUserProfile(userProfile);
    //         }
    //         return result;
    //     }
    //     catch (e) {
    //         console.log(e);
    //         return false;
    //     }
    // }

    *doSignUp(){
        console.log(LogPrefix, "doSignUp Start... ");
        try{
            const data = {
                id: this.signupUser.id,
                email: this.signupUser.email,
                password : this.signupUser.password,
                nickname: this.signupUser.nickname,
                type: 'User',
                userProfile : {
                    avatarImageObject : '',
                    name : this.signupUser.name,
                    gender : this.signupUser.gender,
                    birth : this.signupUser.birth,
                    organization : this.signupUser.organization
                }
            };
            const result = yield this.authRepository.signUp(data);

            const user = result;
            this.signupUser.id = user.id;
            console.log(LogPrefix, "doSignUp Success!! result : ", result);
        }
        catch (e) {
            console.log(LogPrefix, "doSignUp Failed. error : ", e);
        }
    }

    *resendSignUpEmail(userId){
        console.log(LogPrefix, "resendSignUpEmail Start... userId : ", userId);
        try{
            const result = yield this.authRepository.resendSignUpEmail(userId);
            console.log(LogPrefix, "resendSignUpEmail Success!!");
        }
        catch (e) {
            console.log(LogPrefix, "resendSignUpEmail Failed. error : ", e);
        }
    }

    *resendPasswordEmail(){
        console.log(LogPrefix, "resendPasswordEmail Start...");
        try{

            const email = this.findPassword.email;

            const user = yield this.authRepository.getUserByEmail(email);
            if (user) {
                const result = yield this.authRepository.resendPasswordEmail(user.id);
                this.changeFindPasswordEmailButton(true);
                console.log(LogPrefix, "resendPasswordEmail Success!!");
            } else {
                this.changeFindPasswordErrorMatch(true);
                console.log(LogPrefix, "resendPasswordEmail Failed. error : Can not found User by email.");
            }

        }
        catch (e) {
            console.log(LogPrefix, "resendPasswordEmail Failed. error : ", e);
        }
    }

    *modifyPassword(token, callback){
        console.log(LogPrefix, "changePassword Start...");
        try {
            const params = {
                password : this.newPassword
            };


            const user = yield this.authRepository.modifyPassword(token, params);
            this.changePasswordDialogMsg("비밀번호 재설정이 완료되었습니다.");
            this.changePasswordDialogOpen(true);
            this.changePasswordDialogError(false);
        } catch (e) {

            const {errorCode} = e.response.data;

            const msg = ErrorMsg[errorCode];
            if (msg) {
                this.changePasswordDialogMsg(msg);
                this.changePasswordDialogOpen(true);
                this.changePasswordDialogError(true);
            } else {
                this.changePasswordDialogMsg("알 수 없는 오류입니다. 관리자에게 문의하세요.");
                this.changePasswordDialogOpen(true);
                this.changePasswordDialogError(true);
            }
        }
    }

    *changeUserProfile(userId){
        console.log(LogPrefix, "changeUserProfile Start... ");
        try{
            const param = {
                userId: userId,
                email: this.signupUser.email === "" ? null : this.signupUser.email,
                nickname: this.signupUser.nickname === "" ? null:this.signupUser.nickname,
                userProfile : {
                    id: userId,
                    name : this.signupUser.name,
                    gender : this.signupUser.gender,
                    birth : this.signupUser.birth,
                    organization : this.signupUser.organization
                }
            };
            console.log(LogPrefix, "changeUserProfile param : ", param);
            const result = yield this.authRepository.changeUserProfile(param);

            const user = result;
            this.signupUser.id = user.id;
            console.log(LogPrefix, "changeUserProfile Success!! result : ", result);
        }
        catch (e) {
            console.log(LogPrefix, "changeUserProfile Failed. error : ", e);
        }
    }

}