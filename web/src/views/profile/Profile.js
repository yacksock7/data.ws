import React, {Component} from 'react';
import {styles} from "./styles/ProfileStyle";
import {withRouter} from "../../components/WithRouter";
import {Box, Typography, Button, Dialog, Popper} from "@mui/material";
import {withStyles} from "@mui/styles";
import ProfileImg from '../../common/images/AvatarImg.jpg';
import {DropzoneArea} from "material-ui-dropzone";
import DeleteAccountTemplate from "../createWork/DeleteAccountTemplate";
import CommonDialog from "../dialog/CommonDialog";
import InformationDialog from "../dialog/InformationDialog";
import ChangePassword from "./ChangePassword";
import {inject, observer} from "mobx-react";
import dayjs from "dayjs";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
        };
    }
    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleCloseDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleClickProfileEdit = () => {
        this.props.navigate('/profileEdit');
    };

    handleChangeNewTemplateName = (e) => {
        this.props.templateStore.changeNewTemplateName(e.target.value);
    };

    render() {
        const {classes} = this.props;
        // const { placement, disablePortal, flip, arrow, arrowRef, anchorEl } = this.state;
        const {loginUser} = this.props.authStore;
        const {userProfile} = this.props.userStore;
        return (
            <div className={classes.root}>
                <Typography className={classes.titleStyle}>프로필</Typography>
                <Box className={classes.content}>
                    <Box className={classes.profileImgBox}>
                        <Box className={classes.avatar}>
                            <img src={ProfileImg} alt={"프로필사진"}/>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <Typography className={classes.subtitleStyle}>기본정보</Typography>
                            <Typography className={classes.bodyStyle}>{loginUser.email}</Typography>
                            <dl className={classes.dlStyle}>
                                <dt>닉네임</dt>
                                <dd>{loginUser.nickname}</dd>
                            </dl>
                            {/*<Button disableRipple variant="text" className={classes.textBtnStyle}>비밀번호 변경</Button>*/}
                            <ChangePassword />
                        </Box>
                        <Box className={classes.boxStyle}>
                        <Typography className={classes.subtitleStyle}>선택정보 </Typography>
                            <dl className={classes.dlStyle}>
                                <dt>성명</dt>
                                <dd>{userProfile? userProfile.name:null}</dd>
                            </dl>
                            <dl className={classes.dlStyle}>
                                <dt>성별</dt>
                                <dd>{userProfile && userProfile.gender ? (userProfile.gender === 'male' ? '남자':'여자'):null}</dd>
                            </dl>
                            <dl className={classes.dlStyle}>
                                <dt>생년월일</dt>
                                <dd>{userProfile? dayjs(userProfile.birth).format("YYYY-MM-DD"):null}</dd>
                            </dl>
                            <dl className={classes.dlStyle}>
                                <dt>소속</dt>
                                <dd>{userProfile? userProfile.organization:'개인'}</dd>
                            </dl>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.activeBtnBox}>
                    <Button disableRipple variant="text" className={classes.textBtnStyle} onClick={this.handleClickOpen}>계정 삭제하기</Button>
                    <Button disableRipple className={classes.buttonStyle} onClick={this.handleClickProfileEdit}>편집</Button>
                </Box>

                <InformationDialog
                    open={this.state.dialogOpen}
                    onClose={this.handleCloseDialog}
                    onClick={this.handleClickOpen}
                    title={<span><b>계정 삭제</b></span>}
                    submitText={'계정 삭제하기'}
                    color={'#7500fa'}
                    hoverColor={'#9d4bfb'}
                    children={<DeleteAccountTemplate />}
                />
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(
    inject('authStore','userStore')(
        observer(Profile)
    )
));

