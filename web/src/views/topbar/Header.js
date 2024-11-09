import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/HeaderStyle";
import clsx from 'clsx';
import {
    AppBar,
    Avatar,
    Box,
    FormControl,
    IconButton,
    MenuItem,
    MenuList,
    Popover, Stack,
    TextField,
    Typography,
    Select,
} from "@mui/material";
import { ReactComponent as BasicServiceLogin } from '../../common/images/BasicServiceLogin.svg';
import { ReactComponent as NotificationsBellIcon } from '../../common/images/NotificationsBellIcon.svg';
import { ReactComponent as QuestionIcon } from '../../common/images/QuestionIcon.svg';
import { ReactComponent as SearchIcon } from '../../common/images/SearchIcon.svg';
import { ReactComponent as ClearIcon } from '../../common/images/ClearIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../common/images/ArrowDownIcon.svg';
import { ReactComponent as TableUserAvatar } from '../../common/images/TableUserAvatar.svg';
import {withRouter} from "../../components/WithRouter";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Notification from "./Notification";
import CommonDialog from "../dialog/CommonDialog";
import NotificationDialog from "./NotificationDialog";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            anchorEl: null,
            state: '1',
            drawer:false,
            notificationDialog:false,
        };
    }

    handleChangeState = event => {
        this.setState({ state : event.target.value });
    };
    handleChangSearch = (e) => {
        this.setState({ search: e.target.value });
    };

    handleChangSearchClear = () => {
        this.setState({ search: '' });
    };

    handleClickPopover = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleClickHome = () => {
        this.props.navigate('/');
    };

    handleClickProfile = () => {
        this.props.navigate('/profile');
    };

    handleClickLogout = () =>
    {
        this.props.authStore.doLogout();
        this.props.userStore.initUserProfile();
    };

    toggleDrawer = (open) => () => {
        this.setState({
            drawer: open,
        });
    };

    handleClickNotificationDialog = () => {
        this.setState({
            notificationDialog: true,
        });
    };

    handleCloseDialog = () => {
        this.setState({
            notificationDialog: false,
        });
    };

    render() {
        const { classes } = this.props;
        const { open, hidden } = this.props.navigateStore;
        const {loginUser} = this.props.authStore;
        const {userProfile} = this.props.userStore;
        const { anchorEl } = this.state;
        const popoverOpen = Boolean(anchorEl);
        const path = this.props.location.pathname;

        return (
            <div className={hidden  ? classes.rootHidden : classes.root }>
                <AppBar
                    position="fixed"
                    className={open ? clsx(classes.appBar, classes.appBarOpen) : classes.appBar}
                >
                    <Box className={classes.toolbar}>
                        <Box className={classes.displayFlex}>
                            {open ?
                                null
                                :
                                <Box className={classes.logoBox} onClick={this.handleClickHome}>
                                    <BasicServiceLogin/>
                                </Box>
                            }
                            <Box>
                                {path === '/create' ?
                                    <Typography className={classes.titleText}>작업 만들기</Typography>
                                    :
                                    <FormControl className={classes.formStyle}>
                                        <TextField id="search"
                                                   name="search"
                                                   label={''}
                                                   variant="filled"
                                                   value={this.state.search}
                                                   onChange={this.handleChangSearch}
                                                   placeholder='검색'
                                                   InputProps={{
                                                       endAdornment:
                                                           this.state.search.length > 0 ?
                                                               <IconButton className={classes.iconButton} onClick={this.handleChangSearchClear} disableRipple>
                                                                   <ClearIcon />
                                                               </IconButton>
                                                               :
                                                               undefined
                                                       ,
                                                       startAdornment: <SearchIcon/>,
                                                   }}
                                        />
                                    </FormControl>
                                }
                            </Box>
                        </Box>

                        <Box className={classes.rightBox}>
                            <IconButton className={classes.iconButton} onClick={this.toggleDrawer(true)} disableRipple>
                                <NotificationsBellIcon/>
                            </IconButton>
                            <Link to="/help" className={classes.underline}>
                                <IconButton className={clsx(classes.iconButton, classes.iconMargin)} disableRipple>
                                    <QuestionIcon/>
                                </IconButton>
                            </Link>

                            <Box
                                aria-owns={popoverOpen ? 'simple-popper' : undefined}
                                className={classes.buttonStyle}
                                onClick={this.handleClickPopover}
                            >
                                <Box>
                                    <Typography className={classes.nameText}>{loginUser.nickname}</Typography>
                                    <Typography className={classes.textStyle}>{(userProfile && userProfile.organization ==='' || userProfile.organization === null || userProfile.organization === undefined)
                                        ? '개인' : userProfile.organization}</Typography>
                                </Box>
                                <Box className={classes.imgBox}>
                                    <TableUserAvatar />
                                </Box>
                                <ArrowDownIcon/>
                            </Box>

                            <Popover
                                id="simple-popper"
                                open={popoverOpen}
                                anchorEl={anchorEl}
                                onClose={this.handleClosePopover}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <Box className={classes.userBox}>
                                    <Box className={classes.userInfoStyle}>
                                        <Box className={classes.imgBox}>
                                            <TableUserAvatar />
                                            <span className={classes.imgBoxState}></span>
                                        </Box>
                                        <Box style={{display:'flex', flexDirection:'column', alignItems:'flex-start', marginLeft:14,}}>
                                            <Typography className={classes.nameText}>{userProfile ? userProfile.name:null}</Typography>
                                            <Typography className={classes.textStyle}>{loginUser ? loginUser.email:null}</Typography>
                                            <Select
                                                value={this.state.state}
                                                onChange={this.handleChangeState}
                                                className={classes.selectBox}
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
                                                        className:classes.selectPopover
                                                    }}
                                                   >
                                                <MenuItem value={1}>온라인</MenuItem>
                                                <MenuItem value={2}>오프라인</MenuItem>
                                            </Select>
                                        </Box>
                                    </Box>
                                    <MenuList className={classes.menuListStyle}>
                                        <MenuItem onClick={this.handleClickLogout}>
                                            로그 아웃
                                        </MenuItem>
                                        <MenuItem className={classes.menuBtnStyle} onClick={this.handleClickProfile}>
                                            프로필 정보
                                        </MenuItem>
                                    </MenuList>
                                </Box>
                            </Popover>
                        </Box>
                    </Box>
                </AppBar>

                <Notification drawer={this.state.drawer} handleClickNotificationDialog={this.handleClickNotificationDialog} toggleDrawer={this.toggleDrawer}/>

                <CommonDialog
                    open={this.state.notificationDialog}
                    onClose={this.handleCloseDialog}
                    title={'공지/알림'}
                    cancel={false}
                    submit={false}
                    children={<NotificationDialog handleCloseDialog={this.handleCloseDialog}/>}
                />

            </div>
        );
    }
}

export default withRouter(
    withStyles(styles) (
        inject('navigateStore','authStore','userStore')(
            observer(Header)
        )
    )
);

