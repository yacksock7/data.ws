import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withStyles} from "@mui/styles";
import {styles} from "../styles/CreateTemplateContentsStyle";


import {ReactComponent as ZoomInIcon} from "../../../../common/images/ZoomInIcon.svg";
import {ReactComponent as ZoomOutIcon} from "../../../../common/images/ZoomOutIcon.svg";

import { Box, IconButton, MenuItem, MenuList, Popover } from "@mui/material";
import { Droppable } from 'react-beautiful-dnd';

import TemplateStepButton from "./TemplateStepButton";


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

    handleDelTemplate = (e) => {
        const {template, templateDeleteIndex} = this.props.templateStore;
        if(template.type === 'System') {
            alert("기본 템플릿은 수정 할 수 없습니다.");
            return;
        }
        this.props.templateStore.deleteTemplateStep(templateDeleteIndex);
        this.handleClose();
    }
    render() {
        const {classes, zoomLevel,
            zoomIn, zoomOut} = this.props;
        const { anchorEl, translationFilter, startLanguageFilter, endLanguageFilter } = this.state;
        const open = Boolean(anchorEl);
        const { templateSteps } = this.props.templateStore;

        return (
            <Box className={classes.root} >
                <Box justifyContent='center' style={{width: 'calc(100%)'}}>
                    <Droppable droppableId={"mainContent"}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <Box className={classes.defaultBox}>
                                    {templateSteps && templateSteps.map((step, index) => {
                                        return (
                                            <TemplateStepButton key={`${step.type}_${index}`}
                                                                step={step}
                                                                stepIndex={index}
                                                                anchorEl={anchorEl}
                                                                translationFilter={translationFilter}
                                                                startLanguageFilter={startLanguageFilter}
                                                                endLanguageFilter={endLanguageFilter}
                                                                zoomLevel={zoomLevel}
                                                                handleClick={this.handleClick}
                                                                handleClose={this.handleClose}/>
                                        );
                                    })}
                                </Box>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Popover id="simple-popper"
                             open={open}
                             anchorEl={anchorEl}
                             onClose={this.handleClose}
                             anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                             transformOrigin={{vertical: 'top', horizontal: 'left'}}
                             className={classes.popoverBox}
                             style={{zoom: `${zoomLevel}`}}>
                        <MenuList>
                            <MenuItem style={{zoom: `${zoomLevel}`}} onClick={this.handleDelTemplate}>삭제</MenuItem>
                        </MenuList>
                    </Popover>
                 </Box>

                <Box className={classes.zoomInZoomOutBox}>
                    <IconButton className={classes.iconButton}
                                onClick={zoomIn}
                                disableRipple>
                        <ZoomInIcon/>
                    </IconButton>
                    <IconButton className={classes.iconButton}
                                onClick={zoomOut}
                                disableRipple>
                        <ZoomOutIcon/>
                    </IconButton>
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