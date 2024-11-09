import React, {Component} from 'react';
// import {withStyles} from "@mui/styles";
import {withStyles} from "@material-ui/core/styles";
import {styles} from "./styles/LoginStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Typography} from "@mui/material";
import LoginBackImage3 from "../../common/images/LoginBackImage3.png";
import {ReactComponent as BasicServiceLogin} from "../../common/images/BasicServiceLogin.svg";
import Login from "./Login";
import FindPassword from "./FindPassword";


class LoginHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
        };
    }

    handleClickFindPassword = () => {
        this.setState(state => ({
            login: false
        }));
    };

    handleClickLogin = () => {
        this.props.navigate('/login');
        this.setState(state => ({login: true}));
    };

    handleClickSignUp = () => {
        this.props.navigate('/signup');
    };


    render() {
        const {classes} = this.props;
        const {login} = this.state;

        return (
            <div className={classes.root}>
                <Box className={classes.leftBox}>
                    <Box style={{width: '85%'}}>
                        <Typography className={classes.leftTitleText}>고품질 언어 데이터를 위한<br/> 강력한 라벨링 플랫폼</Typography>
                        <Box className={classes.imageBox}>
                            <img src={LoginBackImage3} alt='작업 카드 이미지' style={{width: '100%'}}/>
                        </Box>
                    </Box>

                </Box>
                <Box className={classes.rightBox}>
                    <Box className={classes.logoBox} onClick={this.handleClickLogin}>
                        <BasicServiceLogin/>
                    </Box>

                    {login ?
                        <Login handleClickFindPassword={this.handleClickFindPassword}
                               handleClickSignUp={this.handleClickSignUp}/>
                        :
                        <FindPassword handleClickLogin={this.handleClickLogin}/>
                    }
                </Box>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(LoginHome));