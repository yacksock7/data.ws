import {makeAutoObservable} from "mobx";

const LogPrefix = '[SignUpStore]';

const EmptyBasic = {
    showPassword: false,

    errorNickname: true,
    checkedNickname: false,

    errorCombine: true,
    checkedCombine: false,

    errorOver10: true,
    checkedOver10: false,

    errorEmail:true,
    checkedEmail: 0,//0: 처음 상태, 1: 도메인 미선택, 2: 도메인 직접입력 선택 && 입력 x, 4: 이메일 형식 x, 5: 사용중인 이메일

    filter: 1,
    allChecked: false,
    checked0: false,
    checked1: false,

    emailName:'',
    domainName:''
};

const EmptyBirth={
    birthYear:'',
    birthMonth:'',
    birthDay:''
};


export default class SignUpStore {
    constructor(props) {
        this.basic = Object.assign({}, EmptyBasic);
        this.birth = Object.assign({}, EmptyBirth);
        this.signUpValidationState = true;
        this.signUpValidationMsg = "";

        makeAutoObservable(this);
    }
    initBasic = () =>
    {
        this.basic = Object.assign({}, EmptyBasic);
    }
    initBirth = () =>
    {
        this.birth = Object.assign({}, EmptyBirth);
    }

    changeSignUpValidationState = (state) => {
        this.signUpValidationState = state;
    }

    changeSignUpValidationMsg = (msg) => {
        this.signUpValidationMsg = msg;
    }


    changeBirthYear = (year)=>
    {
        this.birth.birthYear = year;
    }
    changeBirthMonth = (month)=>
    {
        this.birth.birthMonth = month;
    }
    changeBirthDay = (day)=>
    {
        this.birth.birthDay = day;
    }
    changeShowPassword = (flag) =>
    {
        this.basic.showPassword = flag;
    }
    changeErrorNickname = (flag) =>
    {
        this.basic.errorNickname = flag;
    }
    changeCheckedNickname = (flag) =>
    {
        this.basic.checkedNickname = flag;
    }
    changeErrorCombine = (flag) =>
    {
        this.basic.errorCombine = flag;
    }
    changeCheckedCombine = (flag) =>
    {
        this.basic.checkedCombine = flag;
    }
    changeErrorOver10 = (flag) =>
    {
        this.basic.errorOver10 = flag;
    }
    changeCheckedOver10 = (flag) =>
    {
        this.basic.checkedOver10 = flag;
    }
    changeErrorEmail = (flag) =>
    {
        this.basic.errorEmail = flag;
    }
    changeCheckedEmail = (num) =>
    {
        this.basic.checkedEmail = num;
    }
    changeAllChecked = (flag) =>
    {
        this.basic.allChecked = flag;
    }
    changeChecked0 = (flag) =>
    {
        this.basic.checked0 = flag;
    }
    changeChecked1 = (flag) =>
    {
        this.basic.checked1 = flag;
    }
    changeFilter = (filter) =>
    {
        this.basic.filter=filter;
    }
    changeEmailName = (emailName) =>
    {
        this.basic.emailName=emailName;
    }
    changeDomainName = (domainName) =>
    {
        this.basic.domainName=domainName;
    }

}