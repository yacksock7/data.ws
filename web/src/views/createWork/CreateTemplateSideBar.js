import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/CreateTemplateSideBarStyle";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {ReactComponent as InfoIcon} from "../../common/images/InfoIcon.svg";
import {ReactComponent as TooltipArrow} from "../../common/images/TooltipArrow.svg";
import {ReactComponent as UploadIcon} from "../../common/images/UploadIcon.svg";
import {ReactComponent as TemplateRecIcon} from "../../common/images/TemplateRecIcon.svg";
import {ReactComponent as TranslationIcon} from "../../common/images/TranslationIcon.svg";
import {ReactComponent as MachineTranslationIcon} from "../../common/images/MachineTranslationIcon.svg";
import {ReactComponent as TagIcon} from "../../common/images/TagIcon.svg";
import {ReactComponent as CorrectionIcon} from "../../common/images/CorrectionIcon.svg";
import {ReactComponent as RefineIcon2} from "../../common/images/RefineIcon2.svg";
import {ReactComponent as InspectionIcon} from "../../common/images/InspectionIcon.svg";
import {ReactComponent as ExtractionIcon} from "../../common/images/ExtractionIcon.svg";
import {ReactComponent as DotsSix} from "../../common/images/DotsSix.svg";
import {ReactComponent as TooltipCloseIcon} from "../../common/images/TooltipCloseIcon.svg";
import clsx from "clsx";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {TemplateStepType} from "../../stores/TemplateStore";
import {inject, observer} from "mobx-react";

class CreateTemplateSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            cardValue: '',
            cardSelect: '',
            cardList:[
                {icon: <UploadIcon/>, text: '업로드', tooltip: '일감을 파일 단위로 업로드 합니다.', tooltip2: '',textId:TemplateStepType.Upload },
                {icon: <TemplateRecIcon/>, text: '녹음', tooltip: '문장별 텍스트 데이터를 오디오롤 변환 또는 추가하는 작업 (1) 녹음 기능으로 직접 녹음 (2) 오디오 파일을 업로드', tooltip2: '',textId:TemplateStepType.Recording },
                {icon: <MachineTranslationIcon/>, text: '기계', tooltip: '템플릿에서 선택한 기계 작업 옵션이 자동 실행되어 결과물 출력 (1) STT: 음성을 텍스트로 변환 (2) 기계번역: 선택한 번역기로 자동 번역 (3) 문법교정기: 선택한 문법교정기에서 자동 검사 및 교정', tooltip2: '',textId:TemplateStepType.Machine},
                {icon: <TagIcon/>, text: '라벨링', tooltip: '오류 및 데이터를 가장 잘 설명하는 태그 중 하나를 선택하여 붙이는 과정', tooltip2: '',textId:TemplateStepType.Labeling },
                {icon: <CorrectionIcon/>, text: '교정', tooltip: '텍스트 (원시 데이터)를 작업자가 직접 교정', tooltip2: '',textId:TemplateStepType.Editing},
                {icon: <RefineIcon2/>, text: '정제', tooltip: '텍스트로 변환된 오디오 (원시 데이터)를 작업자가 직접 교정', tooltip2: '',textId:TemplateStepType.Refine },
                {icon: <InspectionIcon/>, text: '검수', tooltip: '이전 단계의 결과 데이터를 작업자가 검수 진행', tooltip2: '반려 가능하며 이전 단계를 지정하여 해당 단계 작업자에게 재작업을 요청',textId:TemplateStepType.Inspection},
                {icon: <ExtractionIcon/>, text: '추출', tooltip: '모든 단계 작업이 완료되어 추출된 결과물 (Json 등)을 다운로드', tooltip2: '',textId:TemplateStepType.Export},

            ]
        };
    }

    handleClickTooltip = (e) => {
        e.stopPropagation();
        this.setState({ tooltipOpen: true });
    };

    handleClickInfoTooltip = (e, value) => {
        e.stopPropagation();
        this.setState({
            cardValue: value,
        });
    };

    handleClickCard = (i,value) => {
        this.setState({
            cardSelect: i,
        });
        if(this.props.templateStore.template.type !== "Private")
            return;
        if(value === TemplateStepType.Recording || value === TemplateStepType.Labeling)
            return;
        this.props.onButtonClick(value);
    };

    handleClickTooltipClose = () => {
        this.setState({
            tooltipOpen: false,
            cardValue: '',
        });
    };



    handleDragEnd = (result) =>{
        return;
        const {source, destination} = result;
        const  reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0 , removed);
        }
        if(destination && source.index !== destination.index)
        {
            const items = reorder(this.state.items, source.index, destination.index);
            this.setState({
                items,
            });
        }
    };

    render() {
        const { classes } = this.props;
        const { template,zoomFlag,zoomLevel } = this.props;
        //console.log(template.type);
        const systemFlag = (template.type !== "Private");
        return (
            <Box className={classes.root}>

                <Box className={classes.topBox}>
                    <Typography className={classes.titleText}>작업 단계 유형</Typography>
                    <Box display='flex' justifyContent='center' alignItems='center' style={{position: 'relative'}}>
                        <IconButton onClick={this.handleClickTooltip} className={classes.iconButton} disableRipple>
                            <InfoIcon/>
                        </IconButton>

                        {this.state.tooltipOpen &&
                            <Box className={classes.tooltipBox}>
                                <Box className={classes.tooltipArrow}>
                                    <TooltipArrow style={{transform: 'rotate( 270deg )'}}/>
                                </Box>

                                <Box className={classes.tooltipBoxIn}>
                                    <Box className={classes.tooltipTitleBox}>
                                        <Typography className={classes.tipText}>Tip</Typography>
                                        <Typography>작업 단계 선택</Typography>
                                    </Box>
                                    <Typography>
                                        작업 단계를 순서 대로 추가하기 위해 유형을 드래그하세요.
                                    </Typography>
                                    <Box display='flex' justifyContent='flex-end'>
                                        <Button className={classes.tooltipButton} onClick={this.handleClickTooltipClose} disableRipple>
                                            확인
                                        </Button>
                                    </Box>

                                </Box>
                            </Box>
                        }
                    </Box>
                </Box>

                    <Droppable droppableId={"sideBar"}>
                        {(provided)=> (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {provided.placeholder}
                <Box display='flex' flexWrap='wrap'>
                    {this.state.cardList.map((list, i) => (


                        <Draggable key={list.text} draggableId={list.textId} index={i}  isDragDisabled={(systemFlag || (list.text === '업로드' || list.text === '추출'|| list.text === '녹음'|| list.text === '라벨링'))}
                                   disableInteractiveElementBlocking>
                        {(provided,snapshot)=> (
                            <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                             >

                        <Box
                            key={i}
                            onClick={() => this.handleClickCard(i,list.textId)}
                            className={this.state.cardSelect  === i ? clsx(classes.cardBox, classes.cardBoxSelect) : classes.cardBox}
                            style={snapshot.isDragging ?{zoom: `${zoomLevel}`}:null}
                           >
                            <Box display='flex' justifyContent='flex-end' style={{position: 'relative'}}>
                                <IconButton onClick={(e) => this.handleClickInfoTooltip(e, i)} className={classes.iconButton} disableRipple>
                                    <InfoIcon/>
                                </IconButton>

                                {this.state.cardValue  === i &&
                                    <Box className={clsx(classes.tooltipBox, classes.tooltipBox2)}>
                                        <Box className={classes.tooltipArrow}>
                                            <TooltipArrow style={{transform: 'rotate( 270deg )'}}/>
                                        </Box>

                                        <Box className={classes.tooltipBoxIn}>
                                            <Box display='flex' justifyContent='space-between' alignItems='center' className={classes.tooltipTitleBox}>
                                                <Typography>[{list.text}]</Typography>
                                                <IconButton className={classes.iconButton} onClick={this.handleClickTooltipClose} disableRipple>
                                                    <TooltipCloseIcon/>
                                                </IconButton>
                                            </Box>
                                            <ul>
                                                <li>{list.tooltip}</li>
                                                {list.tooltip2 !== '' &&
                                                    <li>{list.tooltip2}</li>
                                                }
                                            </ul>
                                        </Box>
                                    </Box>
                                }
                            </Box>

                            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end' style={{height: 'calc(100% - 18px)'}}>
                                {list.icon}
                                <Typography className={classes.cardText}>{list.text}</Typography>
                                <DotsSix/>
                            </Box>
                        </Box>
                        </div>)}
                        </Draggable>


                    ))
                    }
                </Box>
                </div>)}
                </Droppable>

            </Box>
        );
    }
}

export default withStyles(styles)(
    inject('templateStore')(
        observer(CreateTemplateSideBar)
    )
);