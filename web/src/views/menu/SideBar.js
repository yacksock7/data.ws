import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/SideBarStyle";
import clsx from "clsx";
import {
    Box,
    Button,
    Drawer,
    FormControl,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { ReactComponent as SideBarArrowIcon } from '../../common/images/SideBarArrowIcon.svg';
import {ReactComponent as ClearIcon} from "../../common/images/ClearIcon.svg";
import {ReactComponent as SearchIcon} from "../../common/images/SearchIcon.svg";
import {ReactComponent as SeachBtnDown} from "../../common/images/SeachBtnDown.svg";
import {ReactComponent as SeachBtnUp} from "../../common/images/SeachBtnUp.svg";
import {ReactComponent as FilterIcon} from "../../common/images/FilterIcon.svg";
import {ReactComponent as SelectCalendarIcon} from "../../common/images/SelectCalendarIcon.svg";
import WorkCard from "./WorkCard";
import {inject, observer} from "mobx-react";
import {withRouter} from "../../components/WithRouter";
import {State} from "../../stores/WorkStore";
import {CircularProgress} from "@material-ui/core";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: 1,
            dateFilter: 1,
            alignment: 'all',
        };
    }

    componentDidMount() {
        const { loginUser } = this.props.authStore;
        console.log("[SideBar] componentDidMount Start... loginUser=",loginUser);
        this.props.workStore.getWorks(loginUser.id, true);
    }

    componentWillUnmount() {
        console.log("[SideBar] componentWillUnmount...");
        this.props.workStore.init();
    }

    handleChangSearch = (e) => {
        const {loginUser} = this.props.authStore;
        this.props.workStore.searchWorks(loginUser.id, e.target.value);
    };

    handleChangSearchClear = () => {
        const {loginUser} = this.props.authStore;
        this.props.workStore.searchWorks(loginUser.id, '');
    };

    handleChangeFilter = event => {
        this.setState({ filter: event.target.value });
    };

    handleChangeDateFilter = event => {
        this.setState({ dateFilter: event.target.value });
    };

    handleAlignment = (event, newAlignment) => {
        this.setState({ alignment: newAlignment });
    };

    render() {
        const {classes, handleDrawerCloseSideMenu, goToCreateWork} = this.props;
        const { open, sideBar, menuValue, cardEmpty } = this.props.navigateStore;
        const { works, searchKeyword, workState } = this.props.workStore;
        const { alignment } = this.state;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawer, {
                            [classes.drawerOpen]: menuValue === 1 || sideBar,
                            [classes.drawerClose]: menuValue !== 1 || !sideBar,
                            [classes.drawerOpen2]: !open,
                        }),
                    }}
                    open={menuValue === 1}
                >
                    <Box className={classes.drawerBoxIn}>
                        <Box className={classes.topBox}>
                            <Typography>작업 목록</Typography>
                            <IconButton className={classes.iconButton} onClick={handleDrawerCloseSideMenu} disableRipple>
                                <SideBarArrowIcon/>
                            </IconButton>
                        </Box>

                        <FormControl className={classes.formStyle}>
                            <TextField id="search"
                                       name="search"
                                       label={''}
                                       variant="filled"
                                       value={searchKeyword}
                                       onChange={this.handleChangSearch}
                                       placeholder='검색'
                                       InputProps={{
                                           endAdornment:
                                               searchKeyword && searchKeyword.length > 0 ?
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

                        {/*<Box className={classes.selectBox}>*/}
                        {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
                        {/*        <Select*/}
                        {/*            id="filter"*/}
                        {/*            value={this.state.filter}*/}
                        {/*            onChange={this.handleChangeFilter}*/}
                        {/*            IconComponent={(props) => (*/}
                        {/*                <Box>*/}
                        {/*                    <ArrowDownIcon  {...props} />*/}
                        {/*                </Box>*/}
                        {/*            )}*/}
                        {/*            MenuProps={{*/}
                        {/*                anchorOrigin: {*/}
                        {/*                    vertical: "bottom",*/}
                        {/*                    horizontal: "left"*/}
                        {/*                },*/}
                        {/*                transformOrigin:{*/}
                        {/*                    vertical: 'top',*/}
                        {/*                    horizontal: 'left',*/}
                        {/*                },*/}
                        {/*                // getContentAnchorEl: null,*/}
                        {/*                className:classes.selectPopover*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <MenuItem value={1}>*/}
                        {/*                전체*/}
                        {/*            </MenuItem>*/}
                        {/*            <MenuItem value={2}>선택1</MenuItem>*/}
                        {/*            <MenuItem value={3}>선택2</MenuItem>*/}
                        {/*        </Select>*/}
                        {/*    </FormControl>*/}

                        {/*    <FormControl variant="outlined" className={clsx(classes.formControl, classes.formControlIcon)}>*/}
                        {/*        <Select*/}
                        {/*            id="filter"*/}
                        {/*            value={this.state.dateFilter}*/}
                        {/*            onChange={this.handleChangeDateFilter}*/}
                        {/*            IconComponent={(props) => (*/}
                        {/*                <Box>*/}
                        {/*                    <ArrowDownIcon  {...props} />*/}
                        {/*                </Box>*/}
                        {/*            )}*/}
                        {/*            MenuProps={{*/}
                        {/*                anchorOrigin: {*/}
                        {/*                    vertical: "bottom",*/}
                        {/*                    horizontal: "left"*/}
                        {/*                },*/}
                        {/*                transformOrigin:{*/}
                        {/*                    vertical: 'top',*/}
                        {/*                    horizontal: 'left',*/}
                        {/*                },*/}
                        {/*                // getContentAnchorEl: null,*/}
                        {/*                className:classes.selectPopover*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <MenuItem value={1}>*/}
                        {/*                오늘*/}
                        {/*            </MenuItem>*/}
                        {/*            <MenuItem value={2}>선택1</MenuItem>*/}
                        {/*            <MenuItem value={3}>선택2</MenuItem>*/}
                        {/*        </Select>*/}
                        {/*    </FormControl>*/}
                        {/*</Box>*/}

                        <Box className={classes.selectBoxBtn} style={{marginTop: 30, paddingBottom: 20,}}>
                            <Box>
                                <Button disableRipple>
                                    <FilterIcon/>
                                    <Typography>전체단계</Typography>
                                    {/*<SeachBtnDown/>*/}
                                    <SeachBtnUp/>
                                </Button>
                            </Box>
                            <Box>
                                <Button disableRipple>
                                    <SelectCalendarIcon/>
                                    <Typography>전체기간</Typography>
                                    <SeachBtnDown/>
                                    {/*<SeachBtnUp/>*/}
                                </Button>
                            </Box>
                        </Box>

                        {workState === State.Pending ?
                            <Box sx={{display: 'flex', justifyContent: 'center', padding: 5}}>
                                <CircularProgress/>
                            </Box>
                            :
                            <Box className={classes.scrollBox}>
                                {works && works.length > 0 ?
                                    works.map(workTransfer => {
                                        return <WorkCard key={`WorkCard-${workTransfer.work.id}`}
                                                         workTransfer={workTransfer}/>
                                    })
                                    :
                                    <Box className={classes.emptyBox}>
                                        <Typography>
                                            등록된 작업이 없습니다.<br/>
                                            지금 템플릿을 만들고 작업을 진행해보세요.
                                        </Typography>
                                        <Button className={classes.templateButton}
                                                onClick={goToCreateWork}
                                                disableRipple>
                                            템플릿 만들기
                                        </Button>
                                    </Box>
                                }
                            </Box>
                        }
                    </Box>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(withStyles(styles) (
        inject('navigateStore', 'authStore', 'workStore')(
            observer(SideBar)
        )
    )
);