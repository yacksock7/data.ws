import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/SignUpCompleteStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Button, Typography} from "@mui/material";
import {ReactComponent as BasicServiceLogin} from "../../common/images/BasicServiceLogin.svg";
import {ReactComponent as MessagesChatIcon} from "../../common/images/MessagesChatIcon.svg";

class SignUpComplete extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleClickLogin = () => {
        this.props.navigate('/login');
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.boxStyle}>
                    <Box className={classes.logoBox}>
                        <BasicServiceLogin/>
                    </Box>
                    <Typography className={classes.titleText}>회원가입 완료</Typography>

                    <MessagesChatIcon/>
                    <Typography className={classes.textStyle}>
                        <span>&#123;abc@onthelive.kr - 가입한 이메일 주소&#125;</span><br/>
                        이메일 주소가 인증되었습니다.
                    </Typography>
                    <Button className={classes.buttonStyle} disableRipple onClick={this.handleClickLogin}>
                        로그인
                    </Button>
                </Box>

            </div>
        );
    }
}

export default withRouter(withStyles(styles)(SignUpComplete));