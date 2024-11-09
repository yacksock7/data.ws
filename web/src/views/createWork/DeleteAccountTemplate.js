import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/DeleteAccountTemplateStyle";
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {inject, observer} from "mobx-react";
import {ReactComponent as CheckCircleIcon} from "../../common/images/CheckCircleIcon.svg";

class DeleteAccountTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Box className={classes.root}>
                <Typography className={classes.subTitleText}>계정 삭제 전 꼭 확인하세요!</Typography>
                    <Typography className={classes.textStyle}>서비스 계정 삭제하면, <br/>
                    내 계정이 삭제되며 작업한 모든 일감 내역과 데이터가 모두 사라지고 복구가 불가능합니다.<br/>
                    필요하면 계정 삭제 전에 지우거나 수정, 보관해주세요.
                    </Typography>
                    <Box style={{marginBottom:12}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // value="checked0"
                                    icon={<CheckCircleIcon />}
                                    checkedIcon={<CheckCircleIcon className={classes.checkedColor}/>}
                                    disableRipple
                                />
                            }
                            label={<span>이 서비스에서 탈퇴하겠습니다.</span>}
                            className={classes.checkBox}
                        />
                    </Box>
            </Box>
        );
    }
};


export default withStyles(styles) (
    inject('navigateStore') (
        observer(DeleteAccountTemplate)
    )
);