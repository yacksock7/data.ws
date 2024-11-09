import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "../../templateList/styles/BuildTemplateStyle";
import {Box, Button, Checkbox, FormControlLabel, IconButton, Popover, TextField, Typography} from "@mui/material";
import { ReactComponent as UserIcon } from '../../../../common/images/UserIcon.svg';
import { ReactComponent as ListDotsSixIcon } from '../../../../common/images/ListDotsSixIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../../common/images/DeleteIcon.svg';
import { ReactComponent as UnCheckedIcon } from '../../../../common/images/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '../../../../common/images/CheckedIcon.svg';
import {ReactComponent as TooltipArrow} from "../../../../common/images/TooltipArrow.svg";
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

class TemplateDialog2 extends Component {
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
                    <Button onClick={this.handleClickRegistration} className={classes.selectButton} sx={{marginBottom: '10px'}} disableRipple>
                        이메일 또는 닉네임으로 검색
                    </Button>
                    <Popover
                        id="simple-popper"
                        open={registrationOpen}
                        anchorEl={registrationAnchorEl}
                        onClose={this.handleClosePopover}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        className={classes.popoverSelectBox2}
                    >
                        <Box>

                            <Box className={classes.dialogBoxOuter}>
                                <Box className={classes.dialogBox}>
                                    <Typography>이름</Typography>
                                    <Typography>이름</Typography>
                                    <Typography>이름</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Popover>
                </Box>

                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    className={classes.textmulti}
                    placeholder='설명 (최대 500자 이내)'
                />


                <Typography className={classes.dialogTitle}>메시지</Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    className={classes.textmulti}
                    placeholder='선택 사항(최대 500자 이내)'
                />


                <Typography className={classes.subTextDialog}>
                    * 작업 및 프로젝트 소개와 초대 하는 목적을 설명할 수 있습니다.<br/>
                    메시지는 초대 받은 사용자가 확인할 수 있습니다.
                </Typography>


            </div>
        );
    }
};

export default withStyles(styles) (
    inject('userStore', 'workUploadUserStore') (
        observer(TemplateDialog2)
    )
);