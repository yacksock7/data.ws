

export const styles = (theme) => ({
    stepBoxOuter: {
        padding: '28px 33px',
        background: '#fff',
        borderRadius: '6px',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    boxInner: {
        maxWidth: '180px',
        width: '100%',
        borderRadius: '6px',
        background: 'rgba(238, 238, 238, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '27px 0px',
        boxSizing: 'border-box',
        marginRight: '20px',
        '&:hover': {
          outline: '3px solid #7500fa',
            cursor: 'pointer'
        },
        '&:last-child':{
            marginRight: '0px',
        },
    },
    iconInner: {
        border: '1px solid #cacaca',
        width: '60px',
        height: '60px',
        borderRadius: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px'
    },
    stepText: {
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#777',
            letterSpacing: '-0.5px',
            fontWeight: 'bold'
        }
    },
    stepNum: {
        '&.MuiTypography-root': {
            fontSize: '1.75rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold'
        }
    },










//     조회기간
    searchBoxOuter: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '26px'
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color:'#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px'
        }
    },
    toggleButton:{
        '&.MuiToggleButtonGroup-root':{
            boxSizing:'border-box',
            minHeight: 31,
            height: 31,
            marginLeft: 15,
            '& .MuiButtonBase-root':{
                borderRadius: 6,
                border: '1px solid #bbb',
                boxSizing:'border-box',
                width: 70,
                padding:0,
                fontSize: '0.875rem',
                color:'#323232',
                letterSpacing: '-0.49px',
                background:'#fff',
                borderLeft: '1px solid #bbb !important',
                '&.Mui-selected':{
                    border: '1px solid #39007a !important',
                    background:'#7500fa',
                    color:'#fff',
                    fontWeight: 'bold'
                }
            }
        }
    },
    dateText:{
        '&.MuiTypography-root':{
            fontSize: '0.813rem',
            color:'#7500fa',
            letterSpacing: '-0.5px',
            marginTop: 6
        }
    },
    buildTemplateBtn: {
        '&.MuiButtonBase-root': {
            width: '220px',
            height: '54px',
            background: '#7500fa',
            borderRadius: '6px',
            '&:hover': {
                background: '#7500fa',
            },
            '& .MuiTypography-root': {
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                letterSpacing: '-0.5px'
            }
        }

    },

    // 테이블
    tempalteName: {
        '&.MuiTypography-root': {
            color: '#056cf2'
        }
    },
    selectBox:{
        '& .MuiSelect-select':{
            fontSize:'1rem',
            padding: '5px 10px',
        },
        '& fieldset':{
            border:'rgba(rgba 50 50 50, 0.3)',
        }
    },
    tableBox:{
        marginTop: '15px',
        '&.MuiPaper-root':{
            boxShadow:'none',
            borderRadius: 0,
            '& table':{
                tableLayout: 'fixed'
            },
            '& .MuiTableCell-head':{
                fontSize: '1rem',
                color:'#323232',
                letterSpacing: '-0.5px',
                fontWeight: 'bold',
                padding: '0 5px',
                boxSizing:'border-box',
                height: 42,
                borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
                '& span':{
                    fontSize: '0.875rem',
                    fontWeight: 'normal'
                },
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                    '& span':{
                        fontSize: '0.688rem',
                    }
                },
            },
            '& .MuiTableCell-body':{
                fontSize: '1rem',
                color:'#323232',
                height: 54,
                letterSpacing: '-0.5px',
                padding: '0 5px',
                boxSizing:'border-box',
                borderBottom: '1px solid rgba(119, 119, 119, 0.7)',
                overflow:'hidden',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                },
            }
        }
    },
    borderStyle:{
        '& .MuiTableCell-head':{
            borderBottom: '0 !important',
        },
    },
    showBackground:{
        '& .MuiTableCell-body':{
            background:'#d6e7fd',
            borderBottom: '0',
        }
    },
    tableCellText:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color:'#323232',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginRight: 6,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem',
            },
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            padding: 0,
            background:'transparent',
            '&:hover':{
                background: 'transparent'
            },
            '& p':{
                fontSize: '1rem',
                letterSpacing: '-0.5px',
                color: '#056cf2',
                marginLeft: 6,
                '@media all and (max-width: 1550px)': {
                    fontSize: '0.875rem',
                },
            }
        }
    },
    numberBox:{
        width: 63,
        height: 27,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        background:'#eee',
        boxSizing:'border-box',
        marginRight: 11,
        '& p':{
            fontSize: '0.875rem',
            color:'#777',
            '& span':{
                color:'#7500fa',
                fontWeight: 'bold'
            }
        }
    },
    progressBox:{
        width: 80,
        '& .MuiLinearProgress-root':{
            height:6,
            background:'#eee',
            borderRadius: 3
        },
        '& .MuiLinearProgress-bar':{
            background: '#38cb89'
        }
    },
    progressText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#323232',
            marginLeft: 11,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.75rem',
            },
        }
    },
    chipBox:{
        height: 30,
        background: '#26a646',
        borderRadius: 99,
        boxSizing: 'border-box',
        padding: '0 8px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent:'center',
        '& p':{
            fontSize: '1rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginLeft: 6,
            '@media all and (max-width: 1550px)': {
                fontSize: '0.875rem',
            },
        },
        '&:before':{
            content:"''",
            width: 14,
            height: 14,
            background:'#c9ffd6',
            borderRadius: '50%'
        },
    },
    chipBox2:{
        background: '#d91e50',
        '&:before':{
            background:'#ffc2d3',
        }
    },
    chipBox3:{
        background: '#7500fa',
        '&:before':{
            background:'#dcbdff',
        }
    },
    chipBox4:{
        background: '#ddd',
        '& p':{
            color: '#323232',
        },
        '&:before':{
            background:'#9e9e9e',
        }
    },
    tagBoxCloseIcon: {
        display: 'flex',
        justifyContent: 'right',

        '&.MuiIconButton-root': {
            textAlign: 'right'
        }

    },
    tagBox: {
        '& .MuiBox-root': {
            marginRight: '6px'
        }
    },
    squareChipBox:{
        height: 18,
        padding: '0 5px',
        boxSizing: 'border-box',
        background:'#26a646',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& p':{
            fontSize: '0.688rem',
            color:'#fff',
            letterSpacing: '-0.24px',
            lineHeight: 1
        }
    },
    squareChipBox2:{
        background:'#f25e3d',
    },
    squareChipBox3:{
        background:'#d91e50',
    },
    squareChipBox4:{
        background:'#9552f2',
    },
    squareChipBox5:{
        background:'#140cf2',
    },
    squareChipBox6:{
        background:'#056cf2',
    },
    squareChipBox7:{
        background:'#f2b705',
    },
    arrowButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },


    emptyBox: {
        '& .MuiTableCell-root': {
            '& svg': {
                verticalAlign: 'middle'
            }
        }
    },

    paginationBox:{
        '& .MuiToolbar-root':{
            position: 'relative',
            '& .MuiTablePagination-displayedRows':{
                // position:'absolute',
                // right: 40
            }
        },
        '& .MuiInputBase-root':{
            marginLeft: 0,
            marginRight: 20
        },
        '& .MuiSelect-select':{
            fontSize: '0.75rem',
            color:'#323232',
            '&:focus':{
                background:'transparent'
            }
        },
        '& .MuiTablePagination-selectLabel':{
            fontSize: '0.75rem',
            color:'#323232',
        },
        '& button':{
            padding:0,
            '&:hover':{
                background:'transparent'
            },
        }
    },

    //템플릿 다이얼로그
    workersListBox:{
        width: 300,
        border: '1px solid #777',
        background: '#d9d9d9',
        borderRadius: 6,
        padding:'5px 0 8px 0',
        position: 'relative',
    },
    workersListBoxIn:{
        height: 240,
        boxSizing: 'border-box',
        overflowY: 'scroll',
        padding:'5px 0 0 5px',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#969696',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '3px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },
    listFlex:{
        display: 'flex',
        alignItems: 'center',
        '& svg:nth-child(1)':{
            marginRight: 10
        }
    },
    listText:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#777',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            },
        }
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'9px 0 0'
        },
        '& .MuiButtonBase-root':{
            padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    // textStyle:{
    //     '&.MuiTypography-root':{
    //         fontSize: '0.875rem',
    //         color: '#323232',
    //         letterSpacing: '-0.5px',
    //         marginTop: 50
    //     }
    // },
    tooltipBox:{
        position: 'absolute',
        top: 110,
        left: -15,
        zIndex: 200,
        width:325
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'center',
    },
    tooltipBoxIn:{
        position:'relative',
        top: -7,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px',
        }
    },
    tooltipTitleBox:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        '& p':{
            fontWeight: 'bold',
        },
    },
    tooltipButton:{
        '&.MuiButtonBase-root': {
            background: '#fff',
            borderRadius: 6,
            width: 80,
            height: 32,
            boxSizing: 'border-box',
            padding: 0,
            marginTop: 12,
            display: 'block',
            fontSize: '0.75rem',
            color: '#4c4851',
            fontWeight: 'bold',
            letterSpacing: '-0.41px',
            '&:hover': {
                background: '#fff'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },


    popoverBox:{
        '& .MuiPopover-paper': {
            overflow: 'unset',
            top: '458px !important',
            // left: '930px !important'
        }
    },
    TagBoxOuter: {
        maxWidth: '280px',
        height: '80px',
        border: '1px solid #323232',
        borderRadius: '5px',
        padding: '0px 3px 10px 10px',
        boxSizing:'border-box',
        position: 'relative'
    },
    TagBoxtopIcon: {
        position: 'absolute', top: '-15px', right: '5px'
    },

    selectButton: {
        '&.MuiButton-root': {
            background: '#eee',
            width: '100%',
            display: 'flex',
            justifyContent: 'left',
            fontSize: '0.875rem',
            color: 'rgba(50, 50, 50, 0.6)',
            '&:hover': {
                background: '#eee',
            }
        }
    },
    dialogBoxOuter: {
        width: '480px',
        height: '114px',
        border: '1px solid #bbb',
        borderRadius: '4px',
        padding: '14px 15px',
        boxSizing:'border-box',
        position: 'relative'
    },
    dialogBox: {
        '& .MuiTypography-root': {
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            lineHeight: '21px',
            marginBottom: 11,
        }
    },





    //다이얼로그

    dialog: {
        '& .MuiDialog-paper': {
            width: '520px',
            boxSizing: 'border-box',
        }

    },
    textField:{

        '&.MuiFormControl-root':{
            marginBottom: 20,
        },
        '& .MuiInputBase-root':{
            width: 480,
            height: 30,
            borderRadius: 4,
            boxSizing: 'border-box',
            paddingLeft: 11,
            paddingRight: 11,
            '& input':{
                padding: '8px 13px 8px 0',
                fontSize: '1.125rem',
                letterSpacing: '-0.5px',
                color: '#323232',
                '&::placeholder':{
                    opacity: 1,
                    color: 'rgba(50, 50, 50, 0.6)'
                }
            },
            '@media all and (max-width: 800px)': {
                width: '298px',
            },
        },
        // '& .MuiOutlinedInput-notchedOutline':{
        //     border: '1px solid rgba(50, 50, 50, 0.8)'
        // },
        // '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
        //     border: '2px solid rgba(117, 0, 250, 0.4)'
        // },
        // '& .MuiInputBase-root.Mui-error .MuiOutlinedInput-notchedOutline':{
        //     border: '1px solid #d91e50'
        // },
    },
    textmulti: {
        '&.MuiTextField-root': {
            marginBottom: 20,
            width: 480,
        }
    },
    dialogTitle: {
        '&.MuiTypography-root': {
            fontSize: '1rem',
            fontWeight: 'bold',
            lineHeight: '25px',
            letterSpacing: '-0.5px',
            color: '#323232',
            marginBottom: '10px',
            '& span': {
                color: '#d91e50',
                marginLeft: '3px'
            }
        }
    },
    dialogSeach: {
        width: '100%',
        height: '30px',
        borderRadius: '4px',
        background: '#eee'
    },
    subTextDialog: {
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            color: '#323232',
            lineHeight: '19px'
        }

    },






    emptyText: {
        height: 'calc(100vh - 1000px)',
        display: 'flex',
        flexDirection: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#323232',
            letterSpacing: '-0.5px',

        }
    }












});


