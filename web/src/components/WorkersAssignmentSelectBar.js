import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkersAssignmentSelectBarStyle";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Popover,
    Popper,
    TextField,
    Typography
} from "@mui/material";
import {ReactComponent as UserIcon} from '../common/images/UserIcon.svg';
import {ReactComponent as GroupIcon} from '../common/images/GroupIcon.svg';
import {ReactComponent as UnCheckedIcon} from "../common/images/UnCheckedIcon.svg";
import {ReactComponent as CheckedIcon} from "../common/images/CheckedIcon.svg";
import {inject, observer} from "mobx-react";
import {AssignType} from "../stores/WorkUploadUserStore";
import {JobTaskStatus} from "../stores/JobStepStore";

class WorkersAssignmentSelectBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectAnchorEl: null,
            selectOpen: false,
            checked0: false,
            checked1: false,
            checked2: false,
            groupAnchorEl: null,
            personAnchorEl: null,

            assigns: [],
            assignCount: 0,
        };
    }

    handleChangSearch = (e) => {
        this.props.userStore.searchUsers(e.target.value);
        // this.setState({ search : e.target.value });
    };

    handleClickSelect = (event) => {
        const {currentTarget} = event;

        if (this.state.assignCount > 0) {
            this.state.assigns.forEach(assign => {
                if (assign.type === AssignType.User) {
                    this.props.jobStepTaskWorkerStore.addSelectedWorkers(assign.obj);
                } else if (assign.type === AssignType.Group) {
                    assign.obj.users.forEach(user => {
                        this.props.jobStepTaskWorkerStore.addSelectedWorkers(user);
                    });
                }
            });
        }

        this.setState(state => ({
            selectAnchorEl: currentTarget,
            selectOpen: !state.selectOpen,
            assignCount: 0,
            assigns: []
        }));
    };

    handleChecked = (type, obj) => {
        const assignIndex = this.state.assigns.findIndex(e => e.type === type && e.id === obj.id);
        if (assignIndex > -1) {
            const {assigns, assignCount} = this.state;
            assigns.splice(assignIndex, 1);
            this.setState({assigns, assignCount: assignCount - 1});
        } else {
            const {assigns, assignCount} = this.state;
            assigns.push({type, obj, id: obj.id});
            this.setState({assigns, assignCount: assignCount + 1});
        }
    }


    handleClickGroupPopover = (e) => {
        e.stopPropagation();
        this.setState({
            groupAnchorEl: e.currentTarget,
        });
    };

    handleClickPersonPopover = (e) => {
        e.stopPropagation();
        this.setState({
            personAnchorEl: e.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            groupAnchorEl: null,
            personAnchorEl: null,
        });
    };

    render() {
        const {classes, selectedWorkers, isShowSelectedBar} = this.props;
        const {selectAnchorEl, selectOpen, groupAnchorEl, personAnchorEl, assigns, assignCount} = this.state;

        const {searchKeyword, searchedUsers, searchedGroups} = this.props.userStore;

        const id = selectOpen ? 'simple-popper' : null;
        const groupOpen = Boolean(groupAnchorEl);
        const personOpen = Boolean(personAnchorEl);

        return (
            <div className={classes.root}>
                <Box className={classes.LeftBox}>
                    <UserIcon/>
                    <Typography>작업자 <span>{selectedWorkers.length}명</span></Typography>
                </Box>

                {isShowSelectedBar &&
                    <>
                        <Button
                            className={assignCount > 0 ? classes.selectButton2 : classes.selectButton}
                            aria-describedby={id}
                            onClick={this.handleClickSelect}
                            buttonRef={node => {
                                this.selectAnchorEl = node;
                            }}
                            disableRipple
                        >
                            {assignCount > 0 ? "+ 선택완료" : "+ 선택"}
                        </Button>

                        <Popper
                            id={id}
                            open={selectOpen}
                            anchorEl={selectAnchorEl}
                            placement={"bottom-end"}
                            className={classes.popoverBox}
                        >
                            <FormControl className={classes.formStyle}>
                                <TextField id="search"
                                           name="search"
                                           label={''}
                                           variant="filled"
                                           value={searchKeyword}
                                           onChange={this.handleChangSearch}
                                           placeholder='작업자 이름, 이메일, 그룹명을 입력하세요.'
                                />
                            </FormControl>

                            {/*{users && users.length > 0 &&*/}
                            <Box>
                                <Box className={classes.selectBox}>
                                    <Typography>아래에서 선택하세요.</Typography>
                                </Box>


                                <Box className={classes.listBox}>
                                    {searchedGroups && searchedGroups.map(group => (
                                        <Box key={`group_${group.id}`} className={classes.listBoxIn}>
                                            <Checkbox
                                                checked={!!assigns.find(e => e.type === AssignType.Group && e.id === group.id)}
                                                // name={assigns.find(e => e.type === AssignType.Group && e.id === group.id)}
                                                onClick={() => this.handleChecked(AssignType.Group, group)}
                                                checkedIcon={<CheckedIcon/>}
                                                icon={<UnCheckedIcon/>}
                                            />
                                            <GroupIcon/>

                                            <Box style={{marginLeft: 10}}>
                                                <Typography className={classes.userIdText}
                                                            noWrap>{group.name}</Typography>

                                                <Box display='flex' alignItems='center'>
                                                    <Typography
                                                        className={classes.infoText}>{group.createdDatetime} • {group.users.length}</Typography>
                                                    <Button className={classes.moreButton}
                                                            aria-owns={groupOpen ? 'simple-popper' : undefined}
                                                            onClick={this.handleClickGroupPopover}
                                                            disableRipple>더보기</Button>
                                                    <Popover
                                                        id="simple-popper"
                                                        open={groupOpen}
                                                        anchorEl={groupAnchorEl}
                                                        onClose={this.handleClosePopover}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'center',
                                                        }}
                                                        className={classes.popoverUserListBox}>

                                                        <Box className={classes.groupUserListScroll}>
                                                            {group.users.map((user, i) => (
                                                                <Box key={`Text-User-${user.id}`}
                                                                     className={classes.groupUserListIn}>
                                                                    <UserIcon/>
                                                                    <Box>
                                                                        <Typography
                                                                            className={classes.groupUserListInText}>{user.nickname}</Typography>
                                                                        <Typography
                                                                            className={classes.groupUserListInText2}>{user.email} • {user.createdDatetime} 가입</Typography>
                                                                    </Box>
                                                                </Box>
                                                            ))}
                                                        </Box>
                                                    </Popover>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}

                                    {searchedUsers.map(user => (
                                        <Box key={`user_${user.id}`} className={classes.listBoxIn}>
                                            <Checkbox
                                                checked={!!assigns.find(e => e.type === AssignType.User && e.id === user.id)}
                                                // name={assigns.find(e => e.type === AssignType.User && e.id === user.id)}
                                                onClick={() => this.handleChecked(AssignType.User, user)}
                                                checkedIcon={<CheckedIcon/>}
                                                icon={<UnCheckedIcon/>}
                                            />
                                            <UserIcon/>
                                            <Box style={{marginLeft: 10}}>
                                                <Typography className={classes.userIdText}
                                                            noWrap>{user.nickname}</Typography>
                                                <Box display='flex' alignItems='center'>

                                                    <Typography className={classes.infoText} noWrap
                                                                style={{maxWidth: 195}}>
                                                        {user.email} {(user.groups && user.groups.length > 0) && " • " + user.groups[0].name}
                                                    </Typography>
                                                    {user.groups && user.groups.length > 1 &&
                                                        <>
                                                            <Button className={classes.moreButton}
                                                                    onClick={this.handleClickPersonPopover}
                                                                    disableRipple>더보기</Button>

                                                            <Popover id="simple-popper"
                                                                     open={personOpen}
                                                                     anchorEl={personAnchorEl}
                                                                     onClose={this.handleClosePopover}
                                                                     anchorOrigin={{
                                                                         vertical: 'bottom',
                                                                         horizontal: 'center',
                                                                     }}
                                                                     transformOrigin={{
                                                                         vertical: 'top',
                                                                         horizontal: 'center',
                                                                     }}
                                                                     className={classes.popoverUserListBox}>

                                                                <Box className={classes.groupUserListScroll}
                                                                     style={{margin: '8px 12px'}}>
                                                                    {user.groups.map(group => {
                                                                        return <Typography
                                                                            key={`Text-Group-${group.id}`}
                                                                            className={classes.groupUserListInText}>{group.name} 작업
                                                                            그룹</Typography>
                                                                    })}
                                                                </Box>
                                                            </Popover>
                                                        </>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            {/*}*/}
                        </Popper>
                    </>
                }
            </div>
        );
    }
};


export default withStyles(styles)(
    inject('userStore', 'jobStepTaskWorkerStore')(
        observer(WorkersAssignmentSelectBar)
    )
);