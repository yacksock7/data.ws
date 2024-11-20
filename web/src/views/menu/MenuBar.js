import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/MenuBarStyle";
import clsx from "clsx";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { ReactComponent as BasicServiceLogo } from '../../common/images/BasicServiceLogo.svg';
import { ReactComponent as MenuOpenArrowIcon } from '../../common/images/MenuOpenArrowIcon.svg';
import { ReactComponent as AddIcon } from '../../common/images/AddIcon.svg';
import { ReactComponent as NotesListIcon } from '../../common/images/NotesListIcon.svg';
import { ReactComponent as TemplateIcon } from '../../common/images/TemplateIcon.svg';
import { ReactComponent as WorkGroup } from '../../common/images/WorkGroup.svg';
import { ReactComponent as HelpIcon } from '../../common/images/HelpIcon.svg';
import { ReactComponent as UpgradeIcon } from '../../common/images/UpgradeIcon.svg';
import { ReactComponent as DashboardIcon } from '../../common/images/DashboardIcon.svg';
import SideBar from "./SideBar";
import {withRouter} from "../../components/WithRouter";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

class MenuBar extends Component {
    handleOptions = (sideBar, menuValue) => {
        this.props.navigateStore.changeSideBar(sideBar);
        this.props.navigateStore.changeMenuValue(menuValue);
        const { loginUser } = this.props.authStore;
        this.props.workStore.getWorks(loginUser.id);
    }

    handleChangeSideBar = () => {
        const sideBar = !this.props.navigateStore.sideBar;
        this.props.navigateStore.changeSideBar(sideBar);
    }

    handleChangeOpen = () => {
        const open = this.props.navigateStore.open;
        this.props.navigateStore.changeOpen(!open);
    }
    handleClickHome = () => {
        this.props.navigate('/');
    };

    goToCreateWork = () => {
        this.props.navigateStore.changeSideBar(false);
        this.props.navigateStore.changeMenuValue(0);
        this.props.workStore.init();
        this.props.navigate('/create');
    }

    render() {
        const {classes} = this.props;
        const { open, sideBar, menuValue, cardEmpty, hidden } = this.props.navigateStore;

        return (
            <div className={hidden  ? classes.rootHidden : classes.root}>
                <Drawer variant="permanent"
                        open={open}
                        classes={{
                            paper: clsx(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}>

                    <Box className={open ? classes.toolbar : clsx(classes.toolbar, classes.toolbarClose)}>
                        {open &&
                            <Box display='flex' alignItems='center' style={{cursor: 'pointer'}} onClick={this.handleClickHome}>
                                <BasicServiceLogo/>
                            </Box>
                        }

                        <IconButton className={classes.iconButton}
                                    onClick={this.handleChangeOpen}
                                    disableRipple>
                            <MenuOpenArrowIcon style={open ? null : {transform: 'rotate(180deg)'}}/>
                        </IconButton>
                    </Box>

                    <Box className={open ? classes.listBox : clsx(classes.listBox, classes.listBoxOpen)}>
                        <Link to="/work/create" className={classes.underline}>
                            <ListItem className={menuValue === 0 ? classes.listBoxSelect : null}
                                      onClick={this.goToCreateWork}>
                                <ListItemIcon><AddIcon/></ListItemIcon>
                                <ListItemText primary={'작업 만들기'} />
                            </ListItem>
                        </Link>

                        {/*<Link to="/dashboard" className={classes.underline}>*/}
                        {/*    <ListItem className={menuValue === 5 ? classes.listBoxSelect : null}*/}
                        {/*              onClick={() => this.handleOptions(false, 5)}>*/}
                        {/*        <ListItemIcon><DashboardIcon/></ListItemIcon>*/}
                        {/*        <ListItemText primary={'대시보드'} />*/}
                        {/*    </ListItem>*/}
                        {/*</Link>*/}

                        <Link to="/work" className={classes.underline}>
                            <ListItem className={menuValue === 1 ? classes.listBoxSelect : null}
                                      onClick={() => this.handleOptions(true, 1)}>
                                <ListItemIcon><NotesListIcon/></ListItemIcon>
                                <ListItemText primary={'작업'} />
                            </ListItem>
                        </Link>

                        <Link to="/template" className={classes.underline}>
                            <ListItem className={menuValue === 2 ? classes.listBoxSelect : null}
                                      onClick={() => this.handleOptions(false, 2)}>
                                <ListItemIcon><TemplateIcon/></ListItemIcon>
                                <ListItemText primary={'템플릿'} />
                            </ListItem>
                        </Link>

                        {/*<Link to="/workGroup" className={classes.underline}>*/}
                        {/*    <ListItem className={menuValue === 3 ? classes.listBoxSelect : null}*/}
                        {/*              onClick={() => this.handleOptions(false, 3)}>*/}
                        {/*        <ListItemIcon><WorkGroup/></ListItemIcon>*/}
                        {/*        <ListItemText primary={'작업 그룹'} />*/}
                        {/*    </ListItem>*/}
                        {/*</Link>*/}

                        {/*<Link to="/help" className={classes.underline}>*/}
                        {/*    <ListItem className={menuValue === 4 ? classes.listBoxSelect : null}*/}
                        {/*              onClick={() => this.handleOptions(false, 4)}>*/}
                        {/*        <ListItemIcon><HelpIcon/></ListItemIcon>*/}
                        {/*        <ListItemText primary={'Help'} />*/}
                        {/*    </ListItem>*/}
                        {/*</Link>*/}
                    </Box>

                    {/*<Box className={classes.upgradeBox}>*/}
                    {/*    {open ?*/}
                    {/*        <Button className={classes.upgradeButton} disableRipple>*/}
                    {/*            Upgrade*/}
                    {/*        </Button>*/}
                    {/*        :*/}
                    {/*        <IconButton className={classes.iconButton} disableRipple>*/}
                    {/*            <UpgradeIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    }*/}
                    {/*</Box>*/}
                </Drawer>

                <SideBar
                    open={open}
                    cardEmpty={cardEmpty}
                    menuValue={menuValue}
                    sideBar={sideBar}
                    handleDrawerCloseSideMenu={this.handleChangeSideBar}
                    goToCreateWork={this.goToCreateWork}
                />
            </div>
        );
    }
}

export default withRouter(
    withStyles(styles) (
            inject('authStore', 'workStore', 'navigateStore')(
                observer(MenuBar)
            )
    )
);