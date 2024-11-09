import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateStyle";
import {Box, getTableSortLabelUtilityClass} from "@mui/material";
import CreateTemplateTopBar from "./CreateTemplateTopBar";
import CreateTemplateSideBar from "./CreateTemplateSideBar";
import CreateTemplateContents from "./CreateTemplateContents";
import {inject, observer} from "mobx-react";
import {withRouter} from "../../components/WithRouter";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {ResultType, TemplateStepType} from "../../stores/TemplateStore";

class CreateTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomLevel : 1
        };
        this.zoom=1;
        this.zoomFlag=false;
    }

    // TODO react의 navigation.navigate()는 first rendering에서 사용할 수 없다.
    componentWillMount() {
        const { newWork } = this.props.workStore;

        if (newWork.name === '') {
            window.location.replace('/');
            // this.props.navigate('/');
        }
    }

    componentDidMount() {
        // const {work} = this.props.workStore;
        // //
        // if (work.name === '') {
        //     console.log("test1 work.name : ", work.name);
        //     window.location.replace('/');
        // } else {
        const { templateId } = this.props.params;
        if(templateId ==='new')
        {
            this.props.templateStore.initTemplateSteps();
            let uploadTemplate = {
                name : this.handleMakeName(TemplateStepType.Upload),
                type : TemplateStepType.Upload,
                options : null,
                inputType : ResultType.Text,
                resultType : ResultType.Text
            };
            let exportTemplate = {
                name : this.handleMakeName(TemplateStepType.Export),
                type : TemplateStepType.Export,
                options : null,
                inputType : ResultType.Text,
                resultType : ResultType.Text
            };
            let tempArr=[];
            tempArr.push(uploadTemplate);
            tempArr.push(exportTemplate);
            this.props.templateStore.initTemplate();
            this.props.templateStore.changeTemplateSteps(tempArr);
        }
        else{
            this.props.templateStore.getTemplate(templateId);
            this.props.templateStore.getTemplateSteps(templateId);
        }
        this.props.navigateStore.changeHidden(true);
        // }
    }

    componentWillUnmount() {
        this.props.navigateStore.changeHidden(false);
        this.props.templateStore.initTemplateErrorArr();
        this.props.templateStore.initTemplateSteps();
        this.props.templateStore.initTemplateStepHistoryIndex();
    }

    handleMakeName = (str) =>
    {
        if(str ===TemplateStepType.Upload)
        {
            return '업로드';
        }
        else if(str ===TemplateStepType.Recording)
        {
            return '녹음';
        }
        else if(str ===TemplateStepType.Machine)
        {
            return '기계';
        }
        else if(str ===TemplateStepType.Labeling)
        {
            return '라벨링';
        }
        else if(str ===TemplateStepType.Correction)
        {
            return '교정';
        }
        else if(str ===TemplateStepType.Refine)
        {
            return '정제';
        }
        else if(str ===TemplateStepType.Inspection)
        {
            return '검수';
        }
        else if(str ===TemplateStepType.Export)
        {
            return '추출';
        }
    }

    MakeInputResultType = (template) =>{
        if(template.type ===TemplateStepType.Recording){
            template.inputType = ResultType.Text;
            template.resultType = ResultType.Audio;
        }
        else if(template.type === TemplateStepType.Labeling){
            template.inputType = ResultType.Tag;
            template.resultType = ResultType.Tag;
        }
        else{
            template.inputType = ResultType.Text;
            template.resultType = ResultType.Text;
        }
    }

    handleZoomIn = () =>{
        if((this.state.zoomLevel + 0.1) >= 2)
            return;
        this.zoom = this.state.zoomLevel + 0.1;
        this.setState({
                zoomLevel : this.zoom
            }
        );

    }

    handleZoomOut = () =>{
        if((this.state.zoomLevel - 0.1) <= 0.7)
            return;
        this.zoom = this.state.zoomLevel - 0.1;
        this.setState({ zoomLevel : this.zoom });
    }

    handleClickSidebarButton = (templateStepType) => {
        if(templateStepType === TemplateStepType.Upload || templateStepType === TemplateStepType.Export )
            return;
        let temp = [...this.props.templateStore.templateSteps];
        let templateName = this.handleMakeName(templateStepType);
        let tempTemplate = Object.assign({},temp[0]);
        tempTemplate.type = templateStepType;
        tempTemplate.name = templateName;
        tempTemplate.options = null;
        tempTemplate.options = null;
        this.MakeInputResultType(tempTemplate);
        temp.splice(temp.length-1, 0, tempTemplate);
        this.props.templateStore.changeTemplateSteps(temp);
    }

    render() {
        const { classes } = this.props;
        const { templateSteps } = this.props.templateStore;

        return (
            <Box className={classes.root}>
                <CreateTemplateTopBar/>
                <DragDropContext onDragEnd={(result) => {
                    const {destination, source, draggableId, reason} = result;
                    if (!destination) {
                        console.log(reason);
                    }
                    else if(source.droppableId === 'sideBar'){
                        if(draggableId === TemplateStepType.Upload ||draggableId === TemplateStepType.Export
                        || destination.droppableId === 'sideBar')
                        {
                            return;
                        }
                        let temp = [...templateSteps];
                        let templateName = this.handleMakeName(draggableId);
                        let tempTemplate = Object.assign({},temp[0]);
                        tempTemplate.type = draggableId;
                        tempTemplate.name = templateName;
                        tempTemplate.options = null;
                        this.MakeInputResultType(tempTemplate);
                        if (destination.index === 0) {
                            temp.splice(1, 0, tempTemplate);
                            this.props.templateStore.changeTemplateSteps(temp);
                            return;
                        } else if(destination.index >= (this.props.templateStore.templateSteps.length)) {
                            return;
                        }
                        temp.splice(destination.index, 0, tempTemplate);

                        this.props.templateStore.changeTemplateSteps(temp);
                    }  else if(source.droppableId ==='mainContent') {
                        let temp = [...templateSteps];
                        let tempTemplate = temp[source.index];
                        if(destination.index >= (this.props.templateStore.templateSteps.length-1))
                            return;
                        if(destination.type === 'Export')
                            return;
                        temp.splice(source.index,1);
                        temp.splice(destination.index,0,tempTemplate);

                        this.props.templateStore.changeTemplateSteps(temp);
                    }
                }}
                >
                <Box display='flex' >
                    <CreateTemplateSideBar template={this.props.templateStore.template} zoomFlag={this.zoomFlag} zoomLevel={this.zoom} onButtonClick={this.handleClickSidebarButton}/>
                    <CreateTemplateContents zoomIn={this.handleZoomIn} zoomOut={this.handleZoomOut} zoomLevel={this.zoom}/>
                </Box>
                </DragDropContext>
            </Box>
        );
    }
};


export default withRouter(
    withStyles(styles) (
        inject('workStore', 'navigateStore', 'templateStore') (
            observer(CreateTemplate)
        )
    )
);