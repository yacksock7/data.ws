import React, {Component, useRef} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateContentsStyle";
import {Box, IconButton, MenuItem, MenuList, Popover, Typography} from "@mui/material";
import {ReactComponent as ExtractionIcon} from "../../common/images/ExtractionIcon.svg";
import {ReactComponent as ZoomInIcon} from "../../common/images/ZoomInIcon.svg";
import {ReactComponent as ZoomOutIcon} from "../../common/images/ZoomOutIcon.svg";
import {inject, observer} from "mobx-react";
import TemplateStepButton from "./TemplateStepButton";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class CreateTemplateContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            translationFilter: 0,
            startLanguageFilter: 1,
            endLanguageFilter: 1
        };
    }

    handleClick = (event,index) => {
        this.props.templateStore.templateDeleteIndex = index;
        //console.log( this.props.templateStore.tempalteDeleteIndex);
        this.setState({
            anchorEl: event.currentTarget,
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleDelTemplate = (e) =>
    {
        if(this.props.templateStore.template.type === 'System')
        {
            alert("기본 템플릿은 수정 할 수 없습니다.");
            return;
        }
        this.props.templateStore.deleteTemplateStep(this.props.templateStore.templateDeleteIndex);
        //console.log(e.target);
        this.handleClose();
    }
    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);
        const { templateSteps,templateStepHistoryIndex } = this.props.templateStore;
        const zoomLevel = this.props.zoomLevel;
        return (
            <Box className={classes.root} >
                <Box  justifyContent='center'  style={{width: 'calc(100%)'}}>
                    <Droppable droppableId={"mainContent"} >
                        {(provided)=> (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <Box className={classes.defaultBox} style={{width : '100%'}} display='flex' justifyContent='center' alignItems='center'>
                                {templateSteps &&
                                    templateSteps.map((step, index) => {
                                        return (
                                                <TemplateStepButton
                                                    key={`${step.type}_${index}`}
                                                    step={step}
                                                    stepIndex={index}
                                                    anchorEl={this.state.anchorEl}
                                                    translationFilter={this.state.translationFilter}
                                                    startLanguageFilter={this.state.startLanguageFilter}
                                                    endLanguageFilter={this.state.endLanguageFilter}
                                                    zoomLevel={zoomLevel}
                                                    handleClick={this.handleClick}
                                                    handleClose={this.handleClose}
                                                    //handleChangeTranslationFilter={this.handleChangeTranslationFilter}
                                                    //handleChangeStartLanguageFilter={this.handleChangeStartLanguageFilter}
                                                    //handleChangeEndLanguageFilter={this.handleChangeEndLanguageFilter}
                                                    />
                                        );
                                    })
                                }
                                </Box>
                                {provided.placeholder}
                            </div>)}
                            </Droppable>

                            <Popover
                                id="simple-popper"
                                open={open}
                                anchorEl={anchorEl}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                className={classes.popoverBox}
                                style={{ zoom:`${zoomLevel}`}}
                            >
                                <MenuList>
                                    <MenuItem style={{ zoom:`${zoomLevel}`}} onClick={this.handleDelTemplate}>삭제</MenuItem>
                                </MenuList>
                            </Popover>
                 </Box>

                <Box className={classes.zoomInZoomOutBox}>
                    <IconButton className={classes.iconButton} onClick={this.props.zoomIn} disableRipple><ZoomInIcon/></IconButton>
                    <IconButton className={classes.iconButton} onClick={this.props.zoomOut} disableRipple><ZoomOutIcon/></IconButton>
                </Box>
            </Box>

        );
    }
}

export default withStyles(styles)(
        inject('templateStore')(
            observer(CreateTemplateContents)
        )
);