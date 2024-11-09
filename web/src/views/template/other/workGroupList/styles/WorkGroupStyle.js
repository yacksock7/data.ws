

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
    seachBoxOuter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '26px'

    },
    trigger: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.MuiTabs-root':{
            minHeight: 40
        },
        '& .MuiTabs-flexContainer': {
            width: 248,
            border: '1px solid #bbbbbb',
            borderRadius: 8,
            overflow: 'hidden'
        },
        '& button': {
            width: 124,
            minHeight: 40,
            height: 40,
            position: 'relative',
            fontSize: '0.875rem',
            letterSpacing: '-0.5px',
            color:'#323232',
            boxSizing: 'border-box',
            padding:0,
            background: '#fff',
        },
        '& button.Mui-selected': {
            fontWeight: 600,
            color: '#fff',
            opacity: 1,
            boxSizing: 'border-box',
            background: '#664cff',
            borderRadius: 6
        },
        '& .MuiTabs-indicator':{
            height: 0,
        }
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
    addGroupBtn: {
        '&.MuiButtonBase-root': {
            width: '98px',
            height: '40px',
            background: '#fff',
            borderRadius: '10px',
            border: '1px solid #bfbfbf',
            marginRight: '30px',
            '&:hover': {
                background: '#fff',
            },
            '& .MuiTypography-root': {
                color: '#323232',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                letterSpacing: '-0.5px',
                marginLeft: '3px'
            }
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
                letterSpacing: '-0.5px',
                marginRight: '12px',
                paddingLeft: '28px',
                paddingRight: '48px',
                borderRight: '1px solid #fff'
            }
        }

    },
    popoverBox:{
        '& .MuiPaper-root':{
            width: 220,
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            borderRadius: 6,
            '& ul':{
                padding: '8px 0',
                '& li':{
                    fontSize: '1rem',
                    color: '#323232',
                    letterSpacing: '-0.5px',
                    display: 'flex',
                    justifyContent: 'center',
                    '&:hover':{
                        background: '#eee'
                    },
                    '& span':{
                        marginLeft: 6
                    }
                }
            },
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        }
    },
    buttonBox:{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    popoverButton:{
        '&.MuiButtonBase-root': {
            fontSize: '0.875rem',
            color: '#056cf2',
            textDecoration: 'underline',
            letterSpacing: '-0.5px',
            background: 'transparent',
            padding:0,
            marginBottom: 10,
            marginRight: 16,
            marginTop: 16,
            '&:hover':{
                background: 'transparent',
                textDecoration: 'underline',
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
    groupManageBtn: {
        '&.MuiButtonBase-root':{
            border: '1px solid rgba(119, 119, 119, 0.7)',
            width: '107px',
            height: '29px',
            boxSizing:'border-box',
            background: '#fff',
            '&:hover':{
                background: '#fff'
            },
            '& .MuiTypography-root': {
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#323232',
                letterSpacing: '-0.5px',
                marginLeft: '5px'
            }
        }
    },
    textColor: {
        '&.MuiTableRow-root': {
            background: '#456ea5',
            '& .MuiTableCell-head': {
                color: '#fff !important',
                '& .MuiTypography-root': {
                    color: '#fff !important',

                },
                '& svg': {
                    '& path':{
                        stroke: '#fff'
                    }
                }
            }
        },

    },
    tableBox:{
        // marginTop: '15px',
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
        background:'#fff',
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
    chipBox5:{
        background: '#9d1036',
        '&:before':{
            background:'#ec6287',
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
    detailListBtn: {
        '&.MuiButtonBase-root': {
            border: '1px solid #140cf2',
            color: '#140cf2',
            background: '#fff',
            borderRadius: '6px',
            width: '78px',
            height: '30px',
            boxSizing: 'border-box',
            '&:hover':{
                background: '#fff'
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


    downloadIcon: {
        '&.MuiIconButton-root': {
            border: '1px solid #bfbfbf',
            borderRadius: '10px',
            background: '#fff',
            marginRight: '18px'
        }

    }












});


