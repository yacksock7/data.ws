import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./MainStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Button, Typography} from "@mui/material";
import {ReactComponent as BasicServiceLogin} from "../../common/images/BasicServiceLogin.svg";
import MainLogoIconMo from "../../common/images/MainLogoIconMo.png";
import clsx from "clsx";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
        };
        this.handleNext = this.handleNext.bind();
        this.handleBack = this.handleBack.bind();
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleClickLogin = () => {
        this.props.navigate('/login');
    };

    handleClickFree = () => {
        this.props.navigate('/signup');
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Box className={classes.headerBox} style={{}}>
                    <Box className={classes.pcOnly}><BasicServiceLogin/></Box>
                    <Box className={classes.mobileOnly}>
                        {/*<MainLogoIconMo/>*/}
                        <img src={MainLogoIconMo} alt='작업 카드 이미지'/>
                    </Box>
                    <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box style={{marginRight: 40,}}>
                            <Button onClick={this.handleClickLogin} style={{padding: 0, minWidth: 'auto'}} disableRipple>
                                <Typography style={{color: '#323232', fontWeight: 700, letterSpacing: '-0.5px'}}>로그인</Typography>
                            </Button>
                        </Box>
                        <Box>
                            <Button style={{background: '#7500fa', width: 140, height: 40, borderRadius: 6,}}>
                                <Typography onClick={this.handleClickFree} style={{color: '#fff', fontWeight: 700, letterSpacing: '-0.5px'}}>무료로 시작하기</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.textWrap} >
                    <Typography className={classes.mainTitle}>고품질 언어 데이터를 위한<br/> 강력한 라벨링 플랫폼</Typography>
                    <Typography className={clsx(classes.mainSubTitle, classes.pcOnly)}>레이블 지정, 언어 찾기 및 수정, 신뢰도 높은 번역으로 다양한 형태의<br/>
                        병렬말뭉치 저작을 위한 하나의 도구입니다.</Typography>
                    <Typography className={clsx(classes.mainSubTitle, classes.mobileOnly)}>레이블 지정, 언어 찾기 및 수정, 신뢰도 높은 번역으로 다양한 형태의
                        병렬말뭉치 저작을 위한 하나의 도구입니다.</Typography>
                    <Box className={classes.freeStartBtn}>
                        <Button onClick={this.handleClickFree} disableRipple>
                            <Typography>무료로 시작하기</Typography>
                        </Button>
                    </Box>
                    <Box  className={clsx(classes.infoText, classes.pcOnly)}>
                        <Typography>출발어와 도착어의 쌍으로 데이터를 효율적으로 생성,<br/>
                            관리할 수 있는<span> ANNOTATION BASIC TOOL</span></Typography>
                    </Box>
                    <Box className={clsx(classes.infoText, classes.mobileOnly)}>
                        <Typography>출발어와 도착어의 쌍으로 데이터를 효율적으로 생성,
                            관리할 수 있는<span> ANNOTATION BASIC TOOL</span></Typography>
                    </Box>
                    <Box className={clsx(classes.infoText, classes.infoTextMargin)} style={{}}>
                        <Typography>더 나은 인공지능 학습용 데이터를 구축해보세요.</Typography>
                    </Box>
                    <Typography className={classes.copyRight}>© AI 데이터 센터 2023 All rights reserved</Typography>
                </Box>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Main));