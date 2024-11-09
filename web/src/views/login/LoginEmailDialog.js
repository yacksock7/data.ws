import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/LoginStyle";
import {Box, Button, Checkbox, FormControlLabel, IconButton, Popover, TextField, Typography} from "@mui/material";
import { ReactComponent as UserIcon } from '../../common/images/UserIcon.svg';
import { ReactComponent as ListDotsSixIcon } from '../../common/images/ListDotsSixIcon.svg';
import { ReactComponent as DeleteIcon } from '../../common/images/DeleteIcon.svg';
import { ReactComponent as UnCheckedIcon } from '../../common/images/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '../../common/images/CheckedIcon.svg';
import {ReactComponent as TooltipArrow} from "../../common/images/TooltipArrow.svg";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import WorkersAssignmentSelectBar from "./WorkersAssignmentSelectBarUpload";
import {inject, observer} from "mobx-react";

const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `작업자 ${k + 1}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    width: '100%',
    height: 46,
    padding: '6px 8px 6px 3px',
    background: '#fbfbfb',
    marginBottom: 2,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...draggableStyle
});

class LoginEmailDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(10),
            checked: false,
            tooltipOpen: false,
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    componentWillUnmount() {
        this.props.workUploadUserStore.init();
        this.props.userStore.init();
    }

    handleChangeChecked = event => {
        this.setState({ checked: event.target.checked });
    };

    handleClickTooltipClose = () => {
        this.setState({
            tooltipOpen: false,
        });
    };

    removeSelectedWorkUploadUser = (userId) => {
        this.props.workUploadUserStore.removeSelectedWorkUploadUser(userId);
    };

    handleClickRegistration = event => {
        this.setState({
            registrationAnchorEl: event.currentTarget,
        });
    };

    handleClosePopover = () => {
        this.setState({
            registrationAnchorEl: null,
            periodAnchorEl: null,
        });
    };




    render() {
        const { classes } = this.props;
        const { selectedWorkUploadUsers } = this.props.workUploadUserStore;
        const { registrationAnchorEl, periodAnchorEl } = this.state;
        const registrationOpen = Boolean(registrationAnchorEl);

        return (
            <div className={classes.dialog}>

                <Box>
                    <Typography className={classes.confirmEmailTitle} >
                        가입한 이메일 주소
                    </Typography>
                    <Typography className={classes.confirmEmailText} >
                        이메일 인증이 완료되지 않은 계정입니다.<br/>
                        먼저 이메일 인증을 완료하신 후 로그인해주세요.
                    </Typography>
                    <Typography className={classes.confirmEmailCheck} >
                        이메일을 받지 못하셨나요?
                    </Typography>
                </Box>
            </div>
        );
    }
};

export default withStyles(styles) (
    inject('userStore', 'workUploadUserStore') (
        observer(LoginEmailDialog)
    )
);