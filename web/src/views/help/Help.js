import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/HelpStyle";
import {drawerCloseWidth, drawerOpenWidth, totalDrawerCloseWidth, totalDrawerOpenWidth} from "../../App";
import {inject, observer} from "mobx-react";
import {
    Box, Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {ReactComponent as ArrowDownIcon} from "../../common/images/ArrowDownIcon.svg";
import {ReactComponent as UnCheckedIcon} from "../../common/images/UnCheckedIcon.svg";
import {ReactComponent as CheckedIcon} from "../../common/images/CheckedIcon.svg";
import {ReactComponent as SearchIcon} from "../../common/images/SearchIcon.svg";
import clsx from "clsx";
import HelpAccordion from "./HelpAccordion";

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter:1,
            filter2:1,
            filter3:1,
            hidden:true
        }
    }

    handleChangeFilter = (e) => {
        this.setState({filter: e.target.value});
    };

    handleChangeFilter2 = (e) => {
        this.setState({filter2: e.target.value});
    };

    handleChangeFilter3 = (e) => {
        this.setState({filter3: e.target.value});
    };
    render() {
        const { classes} = this.props;
        const { open, menuValue,  sideBar } = this.props.navigateStore;

        return (
            <div className={classes.root}
                 style={
                     open ?
                         menuValue === 1 && sideBar ? {marginLeft: totalDrawerOpenWidth} : {marginLeft: drawerOpenWidth}
                         :
                         menuValue === 1 && sideBar ? {marginLeft: totalDrawerCloseWidth} : {marginLeft: drawerCloseWidth}
                 }
            >
                <Box className={classes.blurBox}>
                    <Typography>
                        도움말 및 가이드는 준비 중입니다.<br/>
                        문의 사항이 있으시다면 아래 '문의하기'로 언제든지 연락 주십시오.
                    </Typography>
                </Box>

                <Box style={{padding: '0 10px'}}>
                    <Typography className={classes.titleText}>도움말 및 가이드</Typography>
                    <Box display='flex' alignItems='center'>
                        <FormControl className={classes.formControl}>
                            <Select
                                value={this.state.filter}
                                onChange={this.handleChangeFilter}
                                IconComponent={(props) => (
                                    <Box>
                                        <ArrowDownIcon  {...props} />
                                    </Box>
                                )}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "left"
                                    },
                                    transformOrigin:{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    className:classes.selectPopover
                                }}
                                onBlur={this.handleDomainBoxFocusOut2}
                            >
                                <MenuItem value={1}>질문유형</MenuItem>
                                <MenuItem value={2}>가입</MenuItem>
                                <MenuItem value={3}>이용 전반</MenuItem>
                                <MenuItem value={4}>사용법</MenuItem>
                                <MenuItem value={5}>회원</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formStyle}>
                            <TextField id="search"
                                       name="search"
                                       label={''}
                                       variant="filled"
                                       placeholder='질문, 답변 검색'
                                       InputProps={{
                                           startAdornment: <SearchIcon/>,
                                       }}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="checked"
                                    icon={<UnCheckedIcon />}
                                    checkedIcon={<CheckedIcon />}
                                    disableRipple
                                />
                            }
                            label="자주 찾는 질문"
                            className={classes.checkBox}
                        />
                    </Box>


                    <Box>
                        <Box display='flex' justifyContent='flex-end'>
                            <FormControl className={clsx(classes.formControl, classes.formControl2)}>
                                <Select
                                    value={this.state.filter2}
                                    onChange={this.handleChangeFilter2}
                                    IconComponent={(props) => (
                                        <Box>
                                            <ArrowDownIcon  {...props} />
                                        </Box>
                                    )}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: "bottom",
                                            horizontal: "right"
                                        },
                                        transformOrigin:{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        },
                                        className:clsx(classes.selectPopover, classes.selectPopover2)
                                    }}
                                    onBlur={this.handleDomainBoxFocusOut2}
                                >
                                    <MenuItem value={1}>메뉴얼보기</MenuItem>
                                    <MenuItem value={2}>작업 관리자</MenuItem>
                                    <MenuItem value={3}>작업자</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <HelpAccordion/>

                    </Box>

                    <Box display='flex' justifyContent='flex-end'>
                        <FormControl className={clsx(classes.formControl, classes.formControl3)}>
                            <Select
                                value={this.state.filter3}
                                onChange={this.handleChangeFilter3}
                                IconComponent={(props) => (
                                    <Box>
                                        <ArrowDownIcon  {...props} />
                                    </Box>
                                )}
                                MenuProps={{
                                    anchorOrigin: {
                                        vertical: "bottom",
                                        horizontal: "right"
                                    },
                                    transformOrigin:{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    },
                                    className:clsx(classes.selectPopover, classes.selectPopover2)
                                }}
                                onBlur={this.handleDomainBoxFocusOut2}
                            >
                                <MenuItem value={1}>약관 보기</MenuItem>
                                <MenuItem value={2}>이용약관</MenuItem>
                                <MenuItem value={3}>개인정보취급방침</MenuItem>
                                <MenuItem value={3}>제 3자 정보제공</MenuItem>
                                <MenuItem value={3}>유료 서비스 이용약관</MenuItem>
                                <MenuItem value={3}>마케팅 활용 동의</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box className={classes.bottomBox}>
                        <Typography className={classes.textStyle}>문의사항이 더 있으신가요?</Typography>
                        <Typography className={classes.subText}>도입 및 기술 지원, 사용에 대해 언제든 문의하세요.</Typography>
                        <Button target="_blank" href="https://forms.gle/BPPf4J4aWrwSbDdC8" className={classes.buttonStyle} disableRipple>
                            문의하기
                        </Button>
                    </Box>
                </Box>

            </div>
        );
    }
};

export default withStyles(styles) (
    inject( 'navigateStore') (
        observer(Help)
    )
);