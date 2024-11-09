import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/LoginStyle";
import {withRouter} from "../../components/WithRouter";
import { ReactComponent as IdUsersIcon } from '../../common/images/IdUsersIcon.svg';
import { ReactComponent as ArrowLanguage } from '../../common/images/ArrowLanguage.svg';
import { ReactComponent as ErrorIcon } from '../../common/images/ErrorIcon.svg';
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import clsx from "clsx";
import {inject, observer} from "mobx-react";
import {validateEmail} from "../../components/common/Validation";

class FindPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: true,
            emailButton: false,
        };
        this.props.authStore.initFindPasswordEmail();
    }

    handleClickEmailButton = () => {
        // user 찾아 없으면 알림 : 있으면 mailSend
        // mailSend 성공 ? 페이지 전환 : 아니면 뭐....
        const {findPassword} = this.props.authStore;
        if (!validateEmail(findPassword.email)) {
            this.props.authStore.changeFindPasswordError(true);
            return;
        }

        this.props.authStore.resendPasswordEmail();
    };

    handleCheckEmailCorrect = (e) => {
        this.props.authStore.changeFindPasswordErrorMatch(false);
        this.props.authStore.changeFindPasswordError(false);
        this.props.authStore.changeFindPasswordEmail(e.target.value);

    }

    render() {
        const {classes, handleClickLogin} = this.props;
        const {findPassword} = this.props.authStore;
        return (
           <div>
               <Box className={classes.backBox}>
                   <Button className={classes.backLoginButton} onClick={handleClickLogin} disableRipple>
                       <ArrowLanguage style={{transform: 'scaleX(-1)'}}/>
                       <span>로그인</span>
                   </Button>
               </Box>

                <Typography className={classes.titleText}>비밀번호 찾기</Typography>

               <Typography className={classes.subText}>
                   가입한 이메일 주소를 입력해주세요.<br/>
                   비밀번호 재설정을 위한 보안 링크를 보내드립니다.
               </Typography>

               {findPassword.emailButton ?
                   <Box>
                       <Typography className={classes.passwordEmailText}>
                           <span>&#123;{findPassword.email}&#125;</span>로<br/> 재설정 링크를 보내드렸습니다.<br/>
                           비밀번호를 재설정 해주세요.
                       </Typography>
                   </Box>
                   :
                   <Box>
                       <Box>
                           <Typography className={classes.textStyle}>이메일</Typography>

                           {/* 참고 : error 일때 -> error 메시지가 '이메일 형식이 잘못되었습니다.' 일때만 textField border -> #d91e50 */}
                           <TextField
                               error={findPassword.error ? true : false}
                               id="outlined-bare"
                               className={classes.textField}
                               placeholder=''
                               margin="normal"
                               variant="outlined"
                               value={findPassword.email}
                               onChange={this.handleCheckEmailCorrect}
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <IdUsersIcon />
                                       </InputAdornment>
                                   )
                               }}
                           />
                       </Box>


                       <Box className={classes.errorBox}>
                           {findPassword.error &&
                               <>
                                   <ErrorIcon/>
                                   <Typography className={classes.errorText}>이메일 형식이 잘못되었습니다.</Typography>
                               </>
                           }
                           {findPassword.errorMatch &&
                               <>
                                   <ErrorIcon/>
                                   <Typography className={classes.errorText}>일치하는 로그인 정보가 없습니다. 다시 확인하여 주시기 바랍니다.</Typography>
                               </>
                           }
                       </Box>
                       <Button className={clsx(classes.buttonStyle, classes.buttonMargin)}
                               onClick={this.handleClickEmailButton}
                               disableRipple>
                           재설정 메일 받기
                       </Button>
                   </Box>
               }
            </div>
        );
    }
}


export default withRouter(withStyles(styles)(
    (inject)('authStore')(
        (observer(FindPassword)
        )
    )));