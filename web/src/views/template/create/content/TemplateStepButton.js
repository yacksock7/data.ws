import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "../../../../components/WithRouter";

import {withStyles} from "@mui/styles";
import clsx from "clsx";
import {styles} from "../styles/CreateTemplateContentsStyle";

import {ReactComponent as UploadIcon} from "../../../../common/images/UploadIcon.svg";
import {ReactComponent as UploadFileIcon} from "../../../../common/images/UploadFileIcon.svg";
import {ReactComponent as TranslationIcon} from "../../../../common/images/TranslationIcon.svg";
import {ReactComponent as LabelingSetIcon} from "../../../../common/images/LabelingSetIcon.svg";
import {ReactComponent as MoreIcon} from "../../../../common/images/MoreIcon.svg";
import {ReactComponent as TypeIcon} from "../../../../common/images/TypeIcon.svg";
import {ReactComponent as TemStepMicrophone} from "../../../../common/images/TemStepMicrophone.svg";
import {ReactComponent as ArrowDownIcon} from "../../../../common/images/ArrowDownIcon.svg";
import {ReactComponent as LockIcon} from "../../../../common/images/LockIcon.svg";
import {ReactComponent as LanguageArrowIcon} from "../../../../common/images/LanguageArrowIcon.svg";
import {ReactComponent as CorrectionIcon} from "../../../../common/images/CorrectionIcon.svg";
import {ReactComponent as InspectionIcon} from "../../../../common/images/InspectionIcon.svg";
import {ReactComponent as InspectionLayers} from "../../../../common/images/InspectionLayers.svg";
import {ReactComponent as ExtractionIcon} from "../../../../common/images/ExtractionIcon.svg";
import {ReactComponent as TemTagIcon} from "../../../../common/images/TemTagIcon.svg";
import {ReactComponent as TemplateRecIcon} from "../../../../common/images/TemplateRecIcon.svg";
import {ReactComponent as TemRefineIcon} from "../../../../common/images/TemRefineIcon.svg";

import {Box, FormControl, IconButton, MenuItem, Select, Tooltip, Typography} from "@mui/material";
import {Draggable} from 'react-beautiful-dnd';

import {
    FileUploadType,
    InspectionType,
    MachineType,
    RecordType,
    TemplateStepType
} from "../../../../stores/TemplateStore";
import {MachineDetail} from "../../../../common/MachineStepOptions";

class TemplateStepButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            optionCheck: false
        };
    }

    componentDidMount() {
        if (this.props.step.type && this.props.step.type === TemplateStepType.Export) {
            this.props.templateStore.checkTemplateIO();
        }
    }

    handleChangeMTEngine = (e, index) => {
        this.props.templateStore.changeMachineTranslationEngine(e.target.value, index);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeMTSourceLang = (e, index) => {
        const {step} = this.props;
        if (!step.options || !step.options.engine) {
            alert('번역기 종류를 선택해주세요.');
            return;
        }

        if (step.options && step.options.machineType !== MachineType.MachineTranslation) {
            this.props.templateStore.changeMachineTranslationSourceLang(e.target.value, index);
            this.props.templateStore.changeMachineTranslationTargetLang(e.target.value, index, false);
        } else {
            if (step.options.targetLang === e.target.value) {
                this.props.templateStore.changeMachineTranslationSourceTargetLang(e.target.value, step.options.sourceLang, index);
            } else {
                this.props.templateStore.changeMachineTranslationSourceLang(e.target.value, index);
            }
        }
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeMTTargetLang = (e, index) => {
        const {step} = this.props;
        if (!step.options || !step.options.engine) {
            alert('번역기 종류를 선택해주세요.');
            return;
        }
        this.props.templateStore.changeMachineTranslationTargetLang(e.target.value, index, true);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeMachineType = (e, index) => {
        const {template} = this.props.templateStore;
        const systemFlag = (template.type !== "Private");
        if (!systemFlag) {

            this.props.templateStore.changeMachineType(e.target.value, index);
            this.setState(prevState => ({
                optionCheck: !prevState.optionCheck
            }));
        }
    }

    handleChangeInspectionType = (e, index) => {
        console.log(e.target.value);
        const systemFlag = (this.props.templateStore.template.type !== "Private");
        if (systemFlag)
            return;
        this.props.templateStore.changeInspectionType(e.target.value, index);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeFileUploadType = (e, index) => {
        console.log(e.target.value);

        const systemFlag = (this.props.templateStore.template.type !== "Private");
        if (systemFlag)
            return;

        this.props.templateStore.changeUploadType(e.target.value, index);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeRecordType = (e, index) => {
        this.props.templateStore.changeRecordType(e.target.value, index);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    handleChangeTagType = (e, index) => {
        this.props.templateStore.changeTagType(e.target.value, index);
        this.setState(prevState => ({
            optionCheck: !prevState.optionCheck
        }));
    }

    render() {
        const {classes, step, key, stepIndex, zoomLevel, handleClick} = this.props;
        const {templateErrorArr, template} = this.props.templateStore;
        const dragKey = step.type + '_' + stepIndex;
        const boxAlarmStyle = {backgroundColor: templateErrorArr.includes(stepIndex) ? 'rgb(240,120,120)' : ''}
        const systemFlag = (template.type !== "Private");

        return (
            <>
                {/*기존의 업로드 대신 옵션이 있는 업로드 추가*/}
                {(step.type && step.type === TemplateStepType.Upload) &&
                    <Box className={classes.defaultBox} display='flex' justifyContent='center' alignItems='center'>
                        <Box key={key}>
                            <Box className={classes.cardBox} style={{zoom: `${zoomLevel}`}}>
                                <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                    <Box className={clsx(classes.lineColor, classes.lineColorBlue)}/>
                                    <Box className={classes.boxIn}>
                                        <UploadIcon/>
                                        <Box className={classes.lineStyle}/>
                                        <Typography className={classes.boxText}>업로드</Typography>
                                    </Box>
                                </Box>
                                <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                            onClick={e => handleClick(e, stepIndex)} disableRipple>
                                    <MoreIcon/>
                                </IconButton>

                            </Box>

                            <Box className={classes.optionBox}>
                                <Box className={classes.displayFlex} justifyContent='center' alignItems='center'>
                                    <UploadFileIcon style={{zoom: `${zoomLevel}`}}/>
                                    <Typography className={classes.uploadText}
                                                style={{zoom: `${zoomLevel}`}}>파일</Typography>
                                    <FormControl variant="outlined"
                                                 className={(!step.options || !step.options.fileUploadType || step.options.fileUploadType === 0) ? classes.formControl : clsx(classes.formControl, classes.formControlColorUpload)}>
                                        <Select
                                            id="filter"
                                            value={step.options && step.options.fileUploadType ? step.options.fileUploadType : 0}
                                            onChange={(e) => this.handleChangeFileUploadType(e, stepIndex)}
                                            IconComponent={(props) => (
                                                <ArrowDownIcon  {...props} />
                                            )}
                                            style={{zoom: `${zoomLevel}`}}
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                },
                                                className: classes.selectPopover,
                                                style: {zoom: `${zoomLevel}`}
                                            }}
                                        >
                                            <MenuItem value={0}>옵션 선택</MenuItem>
                                            <MenuItem value={FileUploadType.Excel}>
                                                엑셀 파일
                                            </MenuItem>
                                            <MenuItem value={FileUploadType.Audio}>
                                                오디오 파일
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={classes.lineStyle2} style={{zoom: `${zoomLevel}`}}/>
                    </Box>
                }

                {(step.type && step.type === TemplateStepType.Editing) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center' style={{zoom: `${zoomLevel}`}}>

                                    <Box key={key} className={classes.cardBox}>
                                        <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                            <Box className={clsx(classes.lineColor, classes.lineColorNavy)}/>
                                            <Box className={classes.boxIn}>
                                                <CorrectionIcon/>
                                                <Box className={classes.lineStyle}/>
                                                <Typography className={classes.boxText}>교정</Typography>
                                            </Box>
                                        </Box>
                                        <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                    onClick={e => handleClick(e, stepIndex)} disableRipple>
                                            <MoreIcon/>
                                        </IconButton>
                                    </Box>

                                    <Box className={classes.lineStyle2}
                                         style={snapshot.isDragging ? {opacity: '0'} : null}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {/*녹음 추가*/}
                {(step.type && step.type === TemplateStepType.Recording) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center'>
                                    <Box key={key}>
                                        <Box className={classes.cardBox} style={{zoom: `${zoomLevel}`}}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorRed)}/>
                                                <Box className={classes.boxIn}>
                                                    <TemplateRecIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>녹음</Typography>
                                                </Box>
                                            </Box>
                                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                        onClick={e => handleClick(e, stepIndex)} disableRipple>
                                                <MoreIcon/>
                                            </IconButton>
                                        </Box>

                                        <Box className={classes.optionBox}>
                                            <Box className={classes.displayFlex}>
                                                <TemStepMicrophone style={{zoom: `${zoomLevel}`}}/>
                                                <Typography className={classes.recText}
                                                            style={{zoom: `${zoomLevel}`}}>방식</Typography>
                                                <FormControl variant="outlined"
                                                             className={(!step.options || !step.options.recordType || step.options.recordType === 0) ? classes.formControl : clsx(classes.formControl, classes.formControlColorRecording)}>
                                                    <Select
                                                        id="filter"
                                                        value={step.options && step.options.recordType ? step.options.recordType : 0}
                                                        onChange={(e) => this.handleChangeRecordType(e, stepIndex)}
                                                        IconComponent={(props) => (
                                                            <ArrowDownIcon  {...props} />
                                                        )}
                                                        style={{zoom: `${zoomLevel}`}}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            },
                                                            transformOrigin: {
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            },
                                                            // getContentAnchorEl: null,
                                                            className: classes.selectPopover,
                                                            style: {zoom: `${zoomLevel}`}
                                                        }}
                                                    >
                                                        <MenuItem value={0}>옵션 선택</MenuItem>
                                                        <MenuItem value={RecordType.Internal}>
                                                            내부 녹음
                                                        </MenuItem>

                                                        <MenuItem value={RecordType.External}>
                                                            외부 녹음
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.lineStyle2} style={snapshot.isDragging ? {
                                        opacity: '0',
                                        zoom: `${zoomLevel}`
                                    } : {zoom: `${zoomLevel}`}}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {/*기존의 번역 대신 기계로 대체*/}
                {(step.type && step.type === TemplateStepType.Machine) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center'>
                                    <Box key={key}>
                                        <Box className={classes.cardBox} justifyContent='center' alignItems='center'
                                             style={{zoom: `${zoomLevel}`}}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorYellow)}/>
                                                <Box className={classes.boxIn}>
                                                    <TranslationIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>기계</Typography>
                                                </Box>
                                            </Box>
                                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                        onClick={e => handleClick(e, stepIndex)} disableRipple>
                                                <MoreIcon/>
                                            </IconButton>
                                        </Box>

                                        <Box className={classes.optionBox}>
                                            <Box className={classes.displayFlex}
                                                 style={step.options && step.options.machineType === MachineType.MachineTranslation ? {marginLeft: `${365 * zoomLevel}px`} : {marginLeft: `${252.5 * zoomLevel}px`}}>
                                                <TypeIcon style={{zoom: `${zoomLevel}`}}/>
                                                <Typography className={classes.translationText}
                                                            style={{zoom: `${zoomLevel}`}}>종류</Typography>
                                                <FormControl variant="outlined"
                                                             className={(!step.options || !step.options.machineType || step.options.machineType === 0) ?
                                                                 classes.formControl : clsx(classes.formControl, classes.formControlColor)}>
                                                    <Select
                                                        id="filter"
                                                        value={step.options && step.options.machineType ? step.options.machineType : 0}
                                                        onChange={(e) => this.handleChangeMachineType(e, stepIndex)}
                                                        IconComponent={(props) => (<ArrowDownIcon  {...props} />)}
                                                        style={{zoom: `${zoomLevel}`}}
                                                        MenuProps={{
                                                            anchorOrigin: {vertical: "bottom", horizontal: "left"},
                                                            transformOrigin: {vertical: 'top', horizontal: 'left'},
                                                            className: classes.selectPopover,
                                                            style: {zoom: `${zoomLevel}`}
                                                        }}
                                                    >
                                                        <MenuItem value={0}>옵션 선택</MenuItem>

                                                        <MenuItem value={MachineType.STT}>
                                                            STT
                                                        </MenuItem>

                                                        <MenuItem component='button'
                                                                  value={MachineType.MachineTranslation}>
                                                            기계번역
                                                        </MenuItem>

                                                        <MenuItem component='button'
                                                                  disabled={true}

                                                                  value={MachineType.GrammarCorrector}>
                                                            문법교정기
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <FormControl variant="outlined"
                                                             className={(!step.options || !step.options.engine || step.options.engine === 0) ? classes.formControl : clsx(classes.formControl, classes.formControlColor)}
                                                             style={{margin: '0 10px 0 20px'}}>
                                                    <Select
                                                        id="filter"
                                                        value={step.options && step.options.engine ? step.options.engine : 0}
                                                        onChange={(e) => this.handleChangeMTEngine(e, stepIndex)}
                                                        IconComponent={(props) => (<ArrowDownIcon  {...props} />)}
                                                        style={{zoom: `${zoomLevel}`}}
                                                        MenuProps={{
                                                            anchorOrigin: {vertical: "bottom", horizontal: "left"},
                                                            transformOrigin: {vertical: 'top', horizontal: 'left'},
                                                            className: classes.selectPopover,
                                                            style: {zoom: `${zoomLevel}`}
                                                        }}
                                                    >
                                                        <MenuItem value={0}>기계엔진 선택</MenuItem>
                                                        {step.options
                                                            && step.options.machineType
                                                            && MachineDetail[step.options.machineType].engine.map(engine =>
                                                                <MenuItem component='button'
                                                                          value={engine.type}
                                                                          disabled={!engine.isOpen}>
                                                                    <img src={engine.image} alt={engine.type}/>
                                                                    {!engine.isOpen &&
                                                                        <Tooltip
                                                                            title="현재는 사용할수 없는 번역기 입니다."
                                                                            placement="bottom"
                                                                            classes={{tooltip: classes.lightTooltip}}
                                                                            PopperProps={{style: {zoom: `${zoomLevel}`}}}>
                                                                            <LockIcon/>
                                                                        </Tooltip>
                                                                    }
                                                                </MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>


                                                <Box className={classes.displayFlex}>
                                                    <FormControl variant="outlined"
                                                                 className={classes.formControlLanguage}>
                                                        <Select id="filter"
                                                                value={step.options && step.options.sourceLang ? step.options.sourceLang : 0}
                                                                onChange={(e) => this.handleChangeMTSourceLang(e, stepIndex)}
                                                                IconComponent={(props) => (
                                                                    <Box>
                                                                        <ArrowDownIcon  {...props} />
                                                                    </Box>
                                                                )}
                                                                style={{zoom: `${zoomLevel}`}}
                                                                MenuProps={{
                                                                    anchorOrigin: {
                                                                        vertical: "bottom",
                                                                        horizontal: "left"
                                                                    },
                                                                    transformOrigin: {
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    },
                                                                    // getContentAnchorEl: null,
                                                                    className: classes.selectPopover,
                                                                    style: {zoom: `${zoomLevel}`}
                                                                }}
                                                        >
                                                            <MenuItem value={0}>
                                                                출발어
                                                            </MenuItem>

                                                            {step.options
                                                                && step.options.engine
                                                                && MachineDetail[step.options.machineType].engine.find(e => e.type === step.options.engine).lang.map(lang =>
                                                                    <MenuItem value={lang.type}>{lang.name}</MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>

                                                    <Box display='flex' alignItems='center' justifyContent='center'
                                                         style={step.options && step.options.machineType === MachineType.MachineTranslation ? {margin: '0 8px'} : {display: 'none'}}>
                                                        <LanguageArrowIcon/>
                                                    </Box>

                                                    <FormControl variant="outlined"
                                                                 className={classes.formControlLanguage}
                                                                 style={step.options && step.options.machineType === MachineType.MachineTranslation ? null : {display: 'none'}}>
                                                        <Select
                                                            id="filter"
                                                            value={step.options && step.options.targetLang ? step.options.targetLang : 0}
                                                            onChange={(e) => this.handleChangeMTTargetLang(e, stepIndex)}
                                                            IconComponent={(props) => (
                                                                <Box>
                                                                    <ArrowDownIcon  {...props} />
                                                                </Box>
                                                            )}
                                                            style={{zoom: `${zoomLevel}`}}
                                                            MenuProps={{
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                },
                                                                transformOrigin: {
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                },
                                                                // getContentAnchorEl: null,
                                                                className: classes.selectPopover,
                                                                style: {zoom: `${zoomLevel}`}
                                                            }}
                                                        >
                                                            <MenuItem value={0}>
                                                                도착어
                                                            </MenuItem>
                                                            {step.options
                                                                && step.options.engine
                                                                && MachineDetail[step.options.machineType].engine.find(e => e.type === step.options.engine)
                                                                    .lang.map(lang =>
                                                                        <MenuItem value={lang.type}
                                                                                  disabled={step.options && (step.options.sourceLang === lang.type)}>
                                                                            {lang.name}

                                                                            {step.options
                                                                                && (step.options.sourceLang === lang.type)
                                                                                && <Tooltip
                                                                                    title="번역기에 출발어와 도착어가 같을 수 없습니다."
                                                                                    placement="bottom"
                                                                                    classes={{tooltip: classes.lightTooltip}}
                                                                                    PopperProps={{style: {zoom: `${zoomLevel}`}}}>
                                                                                    <LockIcon/>
                                                                                </Tooltip>
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.lineStyle2}
                                         style={snapshot.isDragging ? {opacity: '0', zoom: `${zoomLevel}`} : {zoom: `${zoomLevel}`}}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {/*라벨링 추가 임시*/}
                {(step.type && step.type === TemplateStepType.Labeling) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center'>
                                    <Box key={key}>
                                        <Box className={classes.cardBox} style={{zoom: `${zoomLevel}`}}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorGreen)}/>
                                                <Box className={classes.boxIn}>
                                                    <TemTagIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>라벨링</Typography>
                                                </Box>
                                            </Box>
                                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                        onClick={e => handleClick(e, stepIndex)} disableRipple>
                                                <MoreIcon/>
                                            </IconButton>
                                        </Box>
                                        <Box className={classes.optionBox}>
                                            <Box className={classes.displayFlex} justifyContent='center'
                                                 alignItems='center'>
                                                <LabelingSetIcon style={{zoom: `${zoomLevel}`}}/>
                                                <Typography style={{zoom: `${zoomLevel}`}}
                                                            className={classes.labelingText}>태깅셋</Typography>
                                                <FormControl variant="outlined"
                                                             className={(!step.options || !step.options.tagType || step.options.tagType === 0) ? classes.formControl : clsx(classes.formControl, classes.formControlColorLabeling)}>
                                                    <Select
                                                        id="filter"
                                                        value={step.options && step.options.tagType ? step.options.tagType : 0}
                                                        onChange={(e) => this.handleChangeTagType(e, stepIndex)}
                                                        IconComponent={(props) => (
                                                            <ArrowDownIcon  {...props} />
                                                        )}
                                                        style={{zoom: `${zoomLevel}`}}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            },
                                                            transformOrigin: {
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            },
                                                            className: classes.selectPopover,
                                                            style: {zoom: `${zoomLevel}`}
                                                        }}
                                                    >
                                                        <MenuItem value={0}>옵션 선택</MenuItem>
                                                        <MenuItem value={'InSide'}>
                                                            라벨링1
                                                        </MenuItem>

                                                        <MenuItem value={'OutSide'}>
                                                            라벨링2
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.lineStyle2} style={snapshot.isDragging ? {
                                        opacity: '0',
                                        zoom: `${zoomLevel}`
                                    } : {zoom: `${zoomLevel}`}}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {/*정제 추가*/}
                {(step.type && step.type === TemplateStepType.Refine) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center'>
                                    <Box key={key}>
                                        <Box className={classes.cardBox} style={{zoom: `${zoomLevel}`}}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorLightPurple)}/>
                                                <Box className={classes.boxIn}>
                                                    <TemRefineIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>정제</Typography>
                                                </Box>
                                            </Box>
                                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                        onClick={e => handleClick(e, stepIndex)} disableRipple>
                                                <MoreIcon/>
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box className={classes.lineStyle2} style={snapshot.isDragging ? {
                                        opacity: '0',
                                        zoom: `${zoomLevel}`
                                    } : {zoom: `${zoomLevel}`}}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {/*기존 검수에서 옵션 있는 검수로 대체*/}
                {(step.type && step.type === TemplateStepType.Inspection) &&
                    <Draggable key={dragKey} draggableId={dragKey} index={stepIndex} isDragDisabled={systemFlag}
                               disableInteractiveElementBlocking>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                     alignItems='center'>
                                    <Box key={key}>
                                        <Box className={classes.cardBox} style={{zoom: `${zoomLevel}`}}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorOrange)}/>
                                                <Box className={classes.boxIn}>
                                                    <InspectionIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>검수</Typography>
                                                </Box>
                                            </Box>
                                            <IconButton className={clsx(classes.iconButton, classes.iconMargin)}
                                                        onClick={e => handleClick(e, stepIndex)} disableRipple>
                                                <MoreIcon/>
                                            </IconButton>
                                        </Box>
                                        <Box className={classes.optionBox}>
                                            <Box className={classes.displayFlex} justifyContent='center'
                                                 alignItems='center'>
                                                <InspectionLayers style={{zoom: `${zoomLevel}`}}/>
                                                <Typography style={{zoom: `${zoomLevel}`}}
                                                            className={classes.recText}>단계</Typography>
                                                <FormControl variant="outlined"
                                                             className={(!step.options || !step.options.inspectionType || step.options.inspectionType === 0) ? classes.formControl : clsx(classes.formControl, classes.formControlColorInspection)}>
                                                    <Select
                                                        id="filter"
                                                        value={step.options && step.options.inspectionType ? step.options.inspectionType : 0}
                                                        onChange={(e) => this.handleChangeInspectionType(e, stepIndex)}
                                                        IconComponent={(props) => (
                                                            <ArrowDownIcon  {...props} />
                                                        )}
                                                        style={{zoom: `${zoomLevel}`}}
                                                        MenuProps={{
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            },
                                                            transformOrigin: {
                                                                vertical: 'top',
                                                                horizontal: 'left',
                                                            },
                                                            className: classes.selectPopover,
                                                            style: {zoom: `${zoomLevel}`}
                                                        }}
                                                    >
                                                        <MenuItem value={0}>옵션 선택</MenuItem>

                                                        <MenuItem component='button'
                                                                  value={InspectionType.Record}>
                                                            녹음 검수
                                                        </MenuItem>
                                                        <MenuItem component='button'
                                                                  value={InspectionType.Label}>
                                                            라벨링 검수
                                                        </MenuItem>
                                                        <MenuItem component='button'
                                                                  value={InspectionType.Inspection}>
                                                            교정 검수
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className={classes.lineStyle2} style={snapshot.isDragging ? {
                                        opacity: '0',
                                        zoom: `${zoomLevel}`
                                    } : {zoom: `${zoomLevel}`}}/>
                                </Box>
                            </div>)}
                    </Draggable>
                }

                {(step.type && step.type === TemplateStepType.Export) &&
                    <>
                        {/*업로드, 추출만 존재할때 있는 작업 유형 추가 아이콘*/}
                        {(this.props.stepIndex === 1) &&
                            <Box className={classes.defaultBox} display='flex' justifyContent='center'
                                 alignItems='center' style={{zoom: `${zoomLevel}`}}>
                                <Box className={classes.defaultText}>
                                    <Typography>작업 유형 추가</Typography>
                                </Box>
                                <Box className={classes.lineStyle2}/>
                            </Box>
                        }
                        <Draggable key={dragKey}
                                   index={stepIndex}
                                   draggableId={dragKey}
                                   isDragDisabled={true}
                                   disableInteractiveElementBlocking>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Box className={classes.defaultBox}
                                         display='flex'
                                         justifyContent='center'
                                         alignItems='center' style={{zoom: `${zoomLevel}`}}>

                                        <Box key={key} className={clsx(classes.cardBox, classes.cardBoxAfter)}>
                                            <Box className={classes.cardBoxIn} style={boxAlarmStyle}>
                                                <Box className={clsx(classes.lineColor, classes.lineColorPurple)}/>
                                                <Box className={classes.boxIn}>
                                                    <ExtractionIcon/>
                                                    <Box className={classes.lineStyle}/>
                                                    <Typography className={classes.boxText}>추출</Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box className={classes.lineStyle2} style={{height: 50, zoom: `${zoomLevel}`}}/>
                                    </Box>
                                    <Box className={classes.endBox} justifyContent='center' alignItems='center'
                                         style={{zoom: `${zoomLevel}`}}>
                                        <ExtractionIcon/>
                                        <Typography>작업 종료</Typography>
                                    </Box>
                                </div>
                            )}
                        </Draggable>
                    </>
                }
            </>
        );
    }
};

export default withRouter(
    withStyles(styles)(
        inject('navigateStore', 'templateStore')(
            observer(TemplateStepButton)
        )
    )
);