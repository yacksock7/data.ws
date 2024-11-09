import React, {Component} from 'react';
import {withStyles} from "@mui/styles";
import {styles} from "./styles/TableComponentStyle";
import {
    Box, Button,
    Collapse, IconButton, Table, TableBody,
    TableCell,
    TableRow, Tooltip, Typography,
} from "@mui/material";
import {inject, observer} from "mobx-react";
import {ReactComponent as ArrowsActionIcon} from '../../../common/images/ArrowsActionIcon.svg';
import {ReactComponent as SmallRecIcon} from "../../../common/images/SmallRecIcon.svg";
import {ReactComponent as SmallMachineIcon} from '../../../common/images/SmallMachineIcon.svg';
import {ReactComponent as SmallLabelingIcon} from '../../../common/images/SmallLabelingIcon.svg';
import {ReactComponent as SmallCorrectionIcon} from '../../../common/images/SmallCorrectionIcon.svg';
import {ReactComponent as SmallSwapIcon} from '../../../common/images/SmallSwapIcon.svg';
import {ReactComponent as PlayIcon} from "../../../common/images/PlayIcon.svg";
import {ReactComponent as SoundPauseIcon} from "../../../common/images/SoundPauseIcon.svg";
import clsx from "clsx";
import {ReactComponent as LockIcon} from "../../../common/images/LockIcon.svg";

class TableComponentInspectionRowDetail_Back extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playButton:false,
            rows:[
                {type:'녹음', icon: <SmallRecIcon/>, text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?'},
                {type:'기계', icon: <SmallMachineIcon/>, text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?'},
                {type:'라벨링', icon: <SmallLabelingIcon/>, text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?'},
                {type:'교정', icon: <SmallCorrectionIcon/>, text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?'},
                {type:'정제', icon: <SmallSwapIcon/>, text: '그럼 저녁메뉴는 김치볶음밥으로 하자.냉동실에 치즈 남은거 있어?'},
            ]
        }
    }

    handleClickPlay = () => {
        this.setState({
            playButton: !this.state.playButton
        });
    };

    render() {
        const { classes, open } = this.props;

        return (
            <React.Fragment>
                <TableRow style={open ? {display:'table-row'} : {display: 'none'}} >
                    <TableCell colSpan={3} style={{padding: 0}}>
                        <Collapse in={open} timeout='auto' unmountOnExit>
                            {this.state.rows.map((list, i) => (
                                <Box display='flex' className={classes.detailCellBox} style={{height:48}}>
                                    <Box className={classes.contentsBoxCell}>
                                        <Box display='flex' alignItems='center'>
                                            <Box className={classes.arrowBoxCell}>
                                                <ArrowsActionIcon style={{marginRight: 8}}/>
                                                <Tooltip
                                                    title={
                                                        list.type === '녹음' ?
                                                            '녹음'
                                                            :
                                                            list.type === '기계' ?
                                                                '기계'
                                                                :
                                                                list.type === '라벨링' ?
                                                                    '라벨링'
                                                                    :
                                                                    list.type === '교정' ?
                                                                        '교정'
                                                                        :
                                                                        list.type === '정제' ?
                                                                            '정제'
                                                                            :
                                                                            '검수'
                                                    }
                                                    placement="bottom"
                                                    classes={{
                                                        tooltip: classes.lightTooltip,
                                                    }}
                                                >
                                                    {list.icon}
                                                </Tooltip>
                                            </Box>
                                            <Typography  style={{marginLeft: 20}}>{list.text}</Typography>
                                        </Box>

                                        <Box display='flex' alignItems='center' justifyContent='center' style={{width: 78}}>
                                            {list.type === '녹음' ?
                                                <Tooltip
                                                    title={this.state.playButton ? '재생' : '일시중지'}
                                                    placement="bottom"
                                                    classes={{
                                                        tooltip: classes.lightTooltip,
                                                    }}
                                                >
                                                    <IconButton className={classes.iconButton2} onClick={this.handleClickPlay} disableRipple>
                                                        {this.state.playButton ?
                                                            <PlayIcon/>
                                                            :
                                                            <SoundPauseIcon/>
                                                        }
                                                    </IconButton>
                                                </Tooltip>
                                                :
                                                list.type === '기계' ?
                                                    <Box className={classes.machineBox}>
                                                        <Typography>도착어</Typography>
                                                    </Box>
                                                    :
                                                    <Button
                                                        className={list.type === '라벨링' ?
                                                            classes.contentsButtonCell
                                                            :
                                                            list.type === '교정' ?
                                                                clsx(classes.contentsButtonCell, classes.contentsButtonCellBlue)
                                                                :
                                                                clsx(classes.contentsButtonCell, classes.contentsButtonCellPurple)
                                                        }
                                                        disableRipple
                                                    >
                                                        {list.type === '라벨링' ?
                                                            '라벨링 보기'
                                                            :
                                                            list.type === '교정' ?
                                                                '교정 보기'
                                                                :
                                                                '정제보기'
                                                        }
                                                    </Button>
                                            }

                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
};

export default withStyles(styles)(
    inject('jobStepTaskStore', 'workStore','jobStepStore','jobStepTaskWorkerStore', 'authStore', 'workTemplateStore')(
        observer(TableComponentInspectionRowDetail_Back)
    )
);


