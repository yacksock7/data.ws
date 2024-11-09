import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/WorkersAssignmentStyle";
import {Box, Button, Checkbox, FormControlLabel, IconButton, Typography} from "@mui/material";
import { ReactComponent as UserIcon } from '../../../../common/images/UserIcon.svg';
import { ReactComponent as ListDotsSixIcon } from '../../../../common/images/ListDotsSixIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../../common/images/DeleteIcon.svg';
import { ReactComponent as UnCheckedIcon } from '../../../../common/images/UnCheckedIcon.svg';
import { ReactComponent as CheckedIcon } from '../../../../common/images/CheckedIcon.svg';
import {ReactComponent as TooltipArrow} from "../../../../common/images/TooltipArrow.svg";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WorkersAssignmentSelectBar from "./WorkersAssignmentSelectBarUpload";
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

class WorkersAssignment extends Component {
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
    }

    render() {
        const { classes } = this.props;
        const { selectedWorkUploadUsers } = this.props.workUploadUserStore;

        return (
            <div className={classes.root}>
                <WorkersAssignmentSelectBar/>

                <Box display='flex' flexDirection='column' alignItems='flex-end'>
                    <Box>
                        <Box className={classes.workersListBox}>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={classes.workersListBoxIn}
                                        >

                                            {selectedWorkUploadUsers.map((user, index) => (
                                                <Draggable key={`Draggable_${user.id}`} draggableId={user.id.toString()} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <Box className={classes.listFlex}>
                                                                <ListDotsSixIcon/>
                                                                <UserIcon/>
                                                                <Typography className={classes.listText}>
                                                                    {user.nickname}
                                                                </Typography>
                                                            </Box>

                                                            <IconButton className={classes.iconButton}
                                                                        onClick={() => this.removeSelectedWorkUploadUser(user.id)}
                                                                        disableRipple>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            {this.state.tooltipOpen &&
                                <Box className={classes.tooltipBox}>
                                    <Box className={classes.tooltipArrow}>
                                        <TooltipArrow/>
                                    </Box>

                                    <Box className={classes.tooltipBoxIn}>
                                        <Box className={classes.tooltipTitleBox} display='flex' justifyContent='space-between' alignItems='center'>
                                            <Typography>작업 배정 순서 변경</Typography>
                                        </Box>
                                        <Typography>
                                            위에서부터 표시되는 순서가 작업자 배정 순서입니다.<br/>
                                            드래그 앤 드롭으로 순서를 이동할 수 있습니다.
                                        </Typography>
                                        <Box display='flex' justifyContent='flex-end'>
                                            <Button className={classes.tooltipButton} onClick={this.handleClickTooltipClose} disableRipple>확인</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            }
                        </Box>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.checked}
                                    onChange={this.handleChangeChecked}
                                    value="checked"
                                    icon={<UnCheckedIcon />}
                                    checkedIcon={<CheckedIcon />}
                                    disableRipple
                                />
                            }
                            label="작업자 배정하지 않음"
                            className={classes.checkBox}
                        />
                    </Box>
                </Box>

                <Typography className={classes.textStyle}>
                    * 작업자를 선택하고 ‘배정하기' 버튼을 누르면, 작업자는 푸시 알림 및 이메일로<br/> 배정 알림을 받을 수 있습니다.
                </Typography>

            </div>
        );
    }
};

export default withStyles(styles) (
    inject('userStore', 'workUploadUserStore') (
        observer(WorkersAssignment)
    )
);