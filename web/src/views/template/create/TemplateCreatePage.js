import React from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "../../../components/WithRouter";

import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateStyle";

import {Box} from "@mui/material";
import { DragDropContext } from 'react-beautiful-dnd';
import {ResultType, TemplateStepType, TemplateStepTypeLabel} from "../../../stores/TemplateStore";

import CreateTemplateSideBar from "./sidebar/CreateTemplateSideBar";
import CreateTemplateContents from "./content/CreateTemplateContents";
import TemplateCreateTopBar from "./topbar/TemplateCreateTopBar";
import {DEFAULT_STEP_OBJECT} from "./DefaultObject";


class TemplateCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomLevel : 1
        };
        this.zoom=1;
        this.zoomFlag=false;
    }

    componentDidMount() {
        const { templateId } = this.props.params;

        if(!templateId) {
            this.props.templateStore.initTemplateSteps();
            this.props.templateStore.initTemplate();

            let tempArr= [DEFAULT_STEP_OBJECT.Upload, DEFAULT_STEP_OBJECT.Export];
            this.props.templateStore.changeTemplateSteps(tempArr);
        } else {
            this.props.templateStore.getTemplate(templateId);
        }
        this.props.navigateStore.changeHidden(true);
    }

    componentWillUnmount() {
        this.props.navigateStore.changeHidden(false);
        this.props.templateStore.initCreateTemplate();
    }

    makeInputResultType = (template) =>{
        if (template.type === TemplateStepType.Recording) {
            template.inputType = ResultType.Text;
            template.resultType = ResultType.Audio;
        }
        else if (template.type === TemplateStepType.Labeling) {
            template.inputType = ResultType.Tag;
            template.resultType = ResultType.Tag;
        } else {
            template.inputType = ResultType.Text;
            template.resultType = ResultType.Text;
        }
    }


    handleZoomIn = () =>{
        const { zoomLevel } = this.state;
        if((zoomLevel + 0.1) >= 2) {
            return;
        }

        this.zoom = zoomLevel + 0.1;
        this.setState({ zoomLevel : this.zoom });
    }

    handleZoomOut = () =>{
        const { zoomLevel } = this.state;
        if((zoomLevel - 0.1) <= 0.7) {
            return;
        }

        this.zoom = zoomLevel - 0.1;
        this.setState({ zoomLevel : this.zoom });
    }

    handleClickSidebarButton = (templateStepType) => {
        if (templateStepType === TemplateStepType.Upload
            || templateStepType === TemplateStepType.Export ) {
            return;
        }

        const step = DEFAULT_STEP_OBJECT[templateStepType];
        this.props.templateStore.addStepByTemplate(step);
    }

    onDragEnd = (result) => {
        const {templateSteps, changeTemplateSteps} = this.props.templateStore;
        const {destination, source, draggableId, reason} = result;

        if (!destination) {
            console.log(reason);
            return;
        } else if (draggableId === TemplateStepType.Upload
            || draggableId === TemplateStepType.Export
            || destination.droppableId === 'sideBar') {
            return;
        }

        if (source.droppableId === 'sideBar') {
            let temp = [...templateSteps];
            let templateName = TemplateStepTypeLabel[draggableId];
            let tempTemplate = Object.assign({}, temp[0]);
            tempTemplate.type = draggableId;
            tempTemplate.name = templateName;
            tempTemplate.options = null;
            this.makeInputResultType(tempTemplate);
            if (destination.index === 0) {
                temp.splice(1, 0, tempTemplate);
                changeTemplateSteps(temp);
                return;
            } else if (destination.index >= (templateSteps.length)) {
                return;
            }
            temp.splice(destination.index, 0, tempTemplate);
            changeTemplateSteps(temp);

        } else if (source.droppableId === 'mainContent') {
            let temp = [...templateSteps];
            let tempTemplate = temp[source.index];
            if (destination.index >= (templateSteps.length - 1))
                return;
            if (destination.type === 'Export')
                return;
            temp.splice(source.index, 1);
            temp.splice(destination.index, 0, tempTemplate);
            changeTemplateSteps(temp);
        }
    }

    render() {
        const { purpose, actionType } = this.props.params;
        const { template } = this.props.templateStore;


        return (
            <Box>
                <TemplateCreateTopBar template={template}
                                      purpose={purpose}
                                      actionType={actionType}/>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Box display='flex' >
                        <CreateTemplateSideBar template={template}
                                               zoomFlag={this.zoomFlag}
                                               onButtonClick={this.handleClickSidebarButton}/>
                        <CreateTemplateContents zoomIn={this.handleZoomIn}
                                                zoomOut={this.handleZoomOut}
                                                zoomLevel={this.zoom}/>
                    </Box>
                </DragDropContext>
            </Box>
        );
    }
};


export default withRouter(
    withStyles(styles) (
        inject('workStore', 'navigateStore', 'templateStore') (
            observer(TemplateCreatePage)
        )
    )
);