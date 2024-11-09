import React, {Component} from 'react';
import {styles} from "./styles/DeleteAccountStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Typography, Button} from "@mui/material";
import {withStyles} from "@mui/styles";
import {ReactComponent as BasicServiceLogo} from "../../common/images/BasicServiceLogo.svg";
class DeleteAccount extends Component {


    render() {
        const {classes} = this.props;


        return (
            <div className={classes.root}>
                <Box className={classes.logoBox}><BasicServiceLogo/></Box>
                <Typography variant={"h3"} className={classes.titleStyle}>서비스 계정 삭제 완료되었습니다.</Typography>
                <Typography variant={'body1'} className={classes.bodyStyle}>그동안 서비스를 이용해주셔서 감사합니다.</Typography>
                <Button disableRipple className={classes.buttonStyle}>첫 화면으로 가기</Button>
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(DeleteAccount));

