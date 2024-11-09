import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/EmailAuthenticationStyle";
import {withRouter} from "../../components/WithRouter";
import {ReactComponent as LetterOpenedIcon} from "../../common/images/LetterOpenedIcon.svg";
import {Typography} from "@mui/material";
import {inject, observer} from "mobx-react";

class EmailAuthentication extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <LetterOpenedIcon/>
                <Typography className={classes.textStyle}>
                    환영합니다!<br/>
                    {/*<span>&#123;입력한 이메일 주소&#125;</span>로 보내 드린<br/>*/}
                    <span>{`${this.props.authStore.signupUser.email}`}</span>로 보내 드린<br/>
                    인증 메일을 확인해주세요.
                </Typography>
                <Typography className={classes.textStyle2}>이메일을 받지 못하셨나요?</Typography>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(
    (inject)('authStore')((observer)((EmailAuthentication)))));