import React from "react";
import {Routes, Route} from "react-router-dom";
import {withStyles} from "@mui/styles";
import {inject, observer} from "mobx-react";
import MenuBar from "./views/menu/MenuBar";
import Header from "./views/topbar/Header";
import Empty from "./views/empty/Empty";
import CreateWork from "./views/createWork/CreateWork";
import {withRouter} from "./components/WithRouter";
import CreateTemplate from "./views/createWork/CreateTemplate";
import Work from "./views/stepTranslation/Work";
import Template from "./views/template/Template";
import TemplateCreatePage from "./views/template/create/TemplateCreatePage";
import Dashboard from "./views/dashboard/Dashboard";
import LoginHome from "./views/login/LoginHome";
import SignUp from "./views/signup/SignUp";
import ChangePassword from "./views/changepassword/ChangePassword";
import SignUpComplete from "./views/signup/SignUpComplete";
import {State, State as AuthState} from "./stores/AuthStore";
import Main from "./views/signup/Main";
import DashboardDetail from "./views/dashboard/detail/DashboardDetail";
import Profile from "./views/profile/Profile";
import ProfileEdit from "./views/profile/ProfileEdit";
import DashboardMyWorkStatistics from "./views/dashboard/myWorkStatistics/DashboardMyWorkStatistics";
import Help from "./views/help/Help";

const styles = theme => ({
    root: {
        '& *': {
            fontFamily: 'Pretendard !important',
        },
    },
});

export const drawerOpenWidth = 230;
export const drawerCloseWidth = 60;
export const drawerSideOpenWidth = 300;
export const totalDrawerOpenWidth = drawerOpenWidth + drawerSideOpenWidth;
export const totalDrawerCloseWidth = drawerCloseWidth + drawerSideOpenWidth;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            menuValue: 1,
            sideBar: false,
            cardEmpty: false
        };
    }

    componentDidMount() {
        this.props.authStore.checkLogin(this.checkLoginCallback);
    }

    checkLoginCallback=()=>{
        const { loginState, loginUser } = this.props.authStore
        if(loginState === State.Authenticated) {
            this.props.userStore.getUserProfile(loginUser.id);
        }else{
            this.props.userStore.initUserProfile();
        }
    }

    render() {
      const { classes } = this.props;
      const { open } = this.props.navigateStore;
      const { loginState } = this.props.authStore;

      return(
            <div className={classes.root}>
                {loginState === AuthState.Authenticated ? (
                    <>
                        <Header open={open} />
                        <MenuBar/>
                        <Routes>
                            <Route path="/template" element={<Template/>}/>
                            <Route path="/template/:actionType" element={<TemplateCreatePage/>}/>
                            <Route path="/template/:actionType/:templateId" element={<TemplateCreatePage/>}/>

                            <Route path="/workTemplate/:actionType" element={<TemplateCreatePage/>}/>
                            <Route path="/workTemplate/:actionType/:templateId" element={<TemplateCreatePage/>}/>

                            <Route path="/work" element={<Work/>}/>
                            <Route path="/work/create" element={<CreateWork/>}/>



                            <Route path="/" element={<Work/>} />
                            <Route path="*" element={<Work />}/>
                        </Routes>
                    </>
                    ) : (
                    <Routes>
                        <Route path="/login" element={<LoginHome />}/>
                        <Route path="/signup" element={<SignUp />}/>
                        <Route path="/signupComplete" element={<SignUpComplete />}/>
                        <Route path="/password/:token" element={<ChangePassword />}/>
                        <Route path="/main" element={<Main />}/>
                        <Route path="/" element={<Main />}/>
                        <Route path="*" element={<Main />}/>
                    </Routes>
                    )}
            </div>
        )
    }
}

export default withRouter(
    withStyles(styles)(
        inject('authStore', 'navigateStore','userStore')(
            observer(App)
        )
    )
);

