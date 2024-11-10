import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withStyles} from "@mui/styles";
import clsx from "clsx";

import {styles} from "./styles/CreateTemplateSideBarStyle";

import {ReactComponent as InfoIcon} from "../../../common/images/InfoIcon.svg";
import {ReactComponent as TooltipArrow} from "../../../common/images/TooltipArrow.svg";
import {ReactComponent as UploadIcon} from "../../../common/images/UploadIcon.svg";
import {ReactComponent as TemplateRecIcon} from "../../../common/images/TemplateRecIcon.svg";
import {ReactComponent as MachineTranslationIcon} from "../../../common/images/MachineTranslationIcon.svg";
import {ReactComponent as TagIcon} from "../../../common/images/TagIcon.svg";
import {ReactComponent as CorrectionIcon} from "../../../common/images/CorrectionIcon.svg";
import {ReactComponent as RefineIcon2} from "../../../common/images/RefineIcon2.svg";
import {ReactComponent as InspectionIcon} from "../../../common/images/InspectionIcon.svg";
import {ReactComponent as ExtractionIcon} from "../../../common/images/ExtractionIcon.svg";
import {ReactComponent as DotsSix} from "../../../common/images/DotsSix.svg";

import {Box, Button, IconButton, Typography} from "@mui/material";
import { Droppable, Draggable } from 'react-beautiful-dnd';

import {TemplateStepType} from "../../../stores/TemplateStore";
import CardTooltip from "./common/CardTooltip";

const TEMPLATE_STEP_CARDS = [
    {icon: <UploadIcon/>, text: '업로드', tooltip: '일감을 파일 단위로 업로드 합니다.', tooltip2: '',textId:TemplateStepType.Upload },
    {icon: <CorrectionIcon/>, text: '교정', tooltip: '텍스트 (원시 데이터)를 작업자가 직접 교정', tooltip2: '',textId:TemplateStepType.Correction},

    {icon: <TemplateRecIcon/>, text: '녹음', tooltip: '문장별 텍스트 데이터를 오디오롤 변환 또는 추가하는 작업 (1) 녹음 기능으로 직접 녹음 (2) 오디오 파일을 업로드', tooltip2: '',textId:TemplateStepType.Recording },
    {icon: <MachineTranslationIcon/>, text: '기계', tooltip: '템플릿에서 선택한 기계 작업 옵션이 자동 실행되어 결과물 출력 (1) STT: 음성을 텍스트로 변환 (2) 기계번역: 선택한 번역기로 자동 번역 (3) 문법교정기: 선택한 문법교정기에서 자동 검사 및 교정', tooltip2: '',textId:TemplateStepType.Machine},
    {icon: <TagIcon/>, text: '라벨링', tooltip: '오류 및 데이터를 가장 잘 설명하는 태그 중 하나를 선택하여 붙이는 과정', tooltip2: '',textId:TemplateStepType.Labeling },
    {icon: <RefineIcon2/>, text: '정제', tooltip: '텍스트로 변환된 오디오 (원시 데이터)를 작업자가 직접 교정', tooltip2: '',textId:TemplateStepType.Refine },
    {icon: <InspectionIcon/>, text: '검수', tooltip: '이전 단계의 결과 데이터를 작업자가 검수 진행', tooltip2: '반려 가능하며 이전 단계를 지정하여 해당 단계 작업자에게 재작업을 요청',textId:TemplateStepType.Inspection},
    {icon: <ExtractionIcon/>, text: '추출', tooltip: '모든 단계 작업이 완료되어 추출된 결과물 (Json 등)을 다운로드', tooltip2: '',textId:TemplateStepType.Export},
];

class CreateTemplateSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: null,
            cardSelect: null,
        };
    }

    handleOpenTooltip = (e, value) => {
        e.stopPropagation();

        const {tooltipOpen} = this.state;
        if (tooltipOpen === value) {
            value = null;
        }

        this.setState({ tooltipOpen: value });
    };

    handleClickCard = (value) => {
        const { template } = this.props.templateStore;

        this.setState({cardSelect: value});
        if(template.type !== "Private") return;
        if(value === TemplateStepType.Recording || value === TemplateStepType.Labeling) return;

        this.props.onButtonClick(value);
    };

    render() {
        const { classes } = this.props;
        const { template, zoomLevel } = this.props;
        const { tooltipOpen, cardSelect } = this.state;
        const systemFlag = (template.type !== "Private");

        return (
            <Box className={classes.root}>

                <Box className={classes.topBox}>
                    <Typography className={classes.titleText}>작업 단계 유형</Typography>
                    <Box display='flex' justifyContent='center' alignItems='center' style={{position: 'relative'}}>
                        <IconButton onClick={(e) => this.handleOpenTooltip(e, "total")} className={classes.iconButton} disableRipple>
                            <InfoIcon/>
                        </IconButton>

                        {tooltipOpen === "total" &&
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
                                        <Button className={classes.tooltipButton}
                                                onClick={(e) => this.handleOpenTooltip(e, "total")}
                                                disableRipple>
                                            확인
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        }
                    </Box>
                </Box>


                <Droppable droppableId={"sideBar"}>
                    {(provided) => (
                        <div ref={provided.innerRef}>
                            {provided.placeholder}
                            <Box display='flex' flexWrap='wrap'>
                                {TEMPLATE_STEP_CARDS.map((list, i) => (
                                    <Draggable key={list.text} draggableId={list.textId} index={i}
                                               isDragDisabled={(systemFlag || (list.text === '업로드' || list.text === '추출'))}
                                               disableInteractiveElementBlocking>

                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef}
                                                 {...provided.draggableProps}
                                                 {...provided.dragHandleProps}>

                                                <Box key={i}
                                                     onClick={() => this.handleClickCard(list.textId)}
                                                     className={cardSelect === list.textId ? clsx(classes.cardBox, classes.cardBoxSelect) : classes.cardBox}
                                                     style={snapshot.isDragging ? {zoom: `${zoomLevel}`} : null}>
                                                    <Box display='flex' justifyContent='flex-end'
                                                         style={{position: 'relative'}}>
                                                        <IconButton
                                                            onClick={(e) => this.handleOpenTooltip(e, list.textId)}
                                                            className={classes.iconButton} disableRipple>
                                                            <InfoIcon/>
                                                        </IconButton>

                                                        {tooltipOpen === list.textId &&
                                                            <CardTooltip list={list} handleOpenTooltip={this.handleOpenTooltip}/>
                                                        }
                                                    </Box>

                                                    <Box display='flex'
                                                         flexDirection='column'
                                                         alignItems='center'
                                                         justifyContent='flex-end'
                                                         style={{height: 'calc(100% - 18px)'}}>
                                                        {list.icon}
                                                        <Typography className={classes.cardText}>
                                                            {list.text}
                                                        </Typography>
                                                        <DotsSix/>
                                                    </Box>

                                                </Box>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </Box>
                        </div>
                    )}
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