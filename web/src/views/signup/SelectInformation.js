import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/SelectInformationStyle";
import {withRouter} from "../../components/WithRouter";
import {
    Box,
    Button, Checkbox, FormControlLabel, Radio,
    TextField,
    Typography
} from "@mui/material";
import clsx from "clsx";
import { ReactComponent as ErrorIcon } from '../../common/images/ErrorIcon.svg';
import {ReactComponent as UnRadioIcon} from "../../common/images/UnRadioIcon.svg";
import {ReactComponent as RadioIcon} from "../../common/images/RadioIcon.svg";
import {observer,inject} from "mobx-react";

class SelectInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: 'a',
            year: '',
            month: '',
            day: '',
        };
    }

    handleChangeRadio = (e) => {
        this.props.authStore.changeSignupGender(e.target.value);
    };

    handleChangeYear = (e) => {
        const year = e.target.value.replace(/[^0-9]/g, '');

        this.props.signUpStore.changeBirthYear(year);
    }

    handleChangeMonth = (e) => {
        const month = e.target.value.replace(/[^0-9]/g, '');

        this.props.signUpStore.changeBirthMonth(month);
    }

    handleChangeDay = (e) => {
        const day = e.target.value.replace(/[^0-9]/g, '');

        this.props.signUpStore.changeBirthDay(day);
    }

    handleChangeName = (e) =>{
        this.props.authStore.changeSignupName(e.target.value);
    }

    handleChangeOrganization = (e) =>
    {
        this.props.authStore.changeSignupOrganization(e.target.value);
    }
    render() {
        const {classes} = this.props;
        const {signupUser} = this.props.authStore;
        const {birth} = this.props.signUpStore;
        return (
            <div className={classes.root}>
                <Box>
                    <Typography className={classes.textStyle}>성명</Typography>
                    <TextField
                        id="outlined-bare"
                        className={classes.textField}
                        placeholder=''
                        margin="normal"
                        variant="outlined"
                        inputProps={{ maxLength: 49 }}
                        onChange={this.handleChangeName}
                        style={{width: '100%'}}
                    />
                </Box>
                <Box>
                    <Typography className={classes.textStyle}>성별</Typography>
                    <FormControlLabel
                        control={
                            <Radio
                                checked={signupUser.gender === 'male'}
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
                                checked={signupUser.gender  === 'female'}
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
                <Box>
                    <Typography className={classes.textStyle}>생년월일</Typography>

                    <Box className={classes.birthdayBox}>
                        <TextField
                            id="outlined-bare"
                            className={classes.birthdayTextField}
                            placeholder=' YYYY'
                            margin="normal"
                            variant="outlined"
                            inputProps={{ maxLength: 4 }}
                            onChange={this.handleChangeYear}
                            value={birth.birthYear}
                        />
                        <Typography style={{fontSize: '1.125rem', opacity:0.3, fontWeight: 500, color:'#323232', margin: '0 10px'}}>/</Typography>
                        <TextField
                            id="outlined-bare"
                            className={clsx(classes.birthdayTextField, classes.birthdayTextFieldWidth)}
                            placeholder=' MM'
                            margin="normal"
                            variant="outlined"
                            inputProps={{ maxLength: 2 }}
                            onChange={this.handleChangeMonth}
                            value={birth.birthMonth}

                        />
                        <Typography style={{fontSize: '1.125rem', opacity:0.3, fontWeight: 500, color:'#323232', margin: '0 10px'}}>/</Typography>
                        <TextField
                            id="outlined-bare"
                            className={clsx(classes.birthdayTextField, classes.birthdayTextFieldWidth)}
                            placeholder='DD'
                            margin="normal"
                            variant="outlined"
                            inputProps={{ maxLength: 2 }}
                            onChange={this.handleChangeDay}
                            value={birth.birthDay}

                        />

                    </Box>


                    <Box className={classes.infoMargin}>
                        {/*<Box className={clsx(classes.checkInfoTextBox, classes.checkInfoTextBoxError)}>*/}
                        {/*    <ErrorIcon/>*/}
                        {/*    <Typography>태어난 년도 4자리를 정확하게 입력해주세요.</Typography>*/}
                        {/*    /!*<Typography>태어난 월을 정확하게 입력해주세요.</Typography>*!/*/}
                        {/*    /!*<Typography>태어난 일을 정확하게 입력해주세요.</Typography>*!/*/}
                        {/*</Box>*/}
                    </Box>
                </Box>
                <Box>
                    <Typography className={classes.textStyle}>소속(회사)</Typography>
                    <TextField
                        id="outlined-bare"
                        className={classes.textField}
                        placeholder=''
                        margin="normal"
                        variant="outlined"
                        inputProps={{ maxLength: 49 }}
                        onChange={this.handleChangeOrganization}
                        value={signupUser.organization}
                        style={{width: '100%'}}
                    />

                    <Typography className={classes.infoText}>
                        선택 정보는 노출되지 않습니다.<br/>
                        입력한 정보를 바탕으로 맞춤형 작업을 배정하는데 활용됩니다.
                    </Typography>
                </Box>
            </div>
        );
    }
}

export default  withRouter(withStyles(styles)(
    (inject)('authStore','signUpStore')((observer)((SelectInformation)))));