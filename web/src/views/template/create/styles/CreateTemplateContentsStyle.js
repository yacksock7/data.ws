export const styles = (theme) => ({
    root:{
        width: 'calc(100% - 324px)',
        height: 'calc(100vh - 70px)',
        background: '#eee',
        boxSizing: 'border-box',
        padding: 10,
        position:'relative',
        overflow:'auto'
    },
    defaultBox:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        //margin: '0 20px'
    },
    cardBox:{
        display: 'flex',
        alignItems:'center',
        '&:before':{
            content:"''",
            width: 36,
            height: 36,
            marginRight: 8
        }
    },
    cardBoxAfter:{
        '&:after':{
            content:"''",
            width: 36,
            height: 36,
            marginLeft: 8
        }
    },
    cardBoxIn:{
        boxSizing: 'border-box',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        width: 214,
        height:62,
        borderRadius:1,
        background: '#fff',
        border:'1px solid #bbb',
        display: 'flex',
        alignItems: 'center'
    },
    lineColor:{
        width: 8,
        height: '100%',
        marginRight: 12
    },
    lineColorBlue:{
        background: '#056cf2',
    },
    lineColorPurple:{
        background: '#5d00c7'
    },
    lineColorYellow:{
        background: '#f2b705'
    },
    lineColorNavy:{
        background: '#140CF2'
    },
    lineColorOrange:{
        background: '#f25e3d'
    },
    lineColorRed:{
        background: '#d91e50'
    },
    lineColorGreen:{
        background: '#26A646'
    },
    lineColorLightPurple: {
        background: '#8a52f2'
    },

    boxIn:{
        display: 'flex',
        alignItems: 'center',
        '& svg':{
            width: 38,
            height: 38
        }
    },
    lineStyle:{
        width: 1.5,
        height: 38,
        opacity: 0.4,
        background: '#bbb',
        margin: '0 12px'
    },
    lineStyle2:{
        width: 2,
        height: 96,
        background: '#777',
        opacity: 0.6,
        margin: '20px 0'
    },
    boxText:{
        '&.MuiTypography-root':{
            fontSize: '1.563rem',
            fontWeight: 'bold',
            color: '#323232',
            letterSpacing: '-0.5px'
        }
    },
    addBox:{
        width: 170,
        height: 44,
        border: '2px dotted #9d4bfb',
        background: '#fff',
        borderRadius: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& p':{
            fontSize: '1.25rem',
            color: '#9d4bfb',
            fontWeight: 'bold',
        }
    },
    endBox:{
        display: 'flex',
        alignItems: 'center',
        '& svg':{
            width: 24,
            height: 24,
            '& path':{
                stroke: '#777'
            }
        },
        '& p':{
            fontSize: '1.25rem',
            color: '#777',
            fontWeight: 'bold',
            marginLeft: 8
        }
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover': {
                background: 'transparent'
            }
        }
    },
    iconMargin:{
        marginLeft: 8
    },
    popoverBox:{
        '& .MuiPaper-root':{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            background: '#fff',
            border: '1px solid #bbb',
            borderRadius: 4
        },
        '& ul':{
            padding: '9px 0',
            '& li':{
                fontSize: '0.875rem',
                color:'#323232',
                '&:hover':{
                    background: '#eee'
                }
            }
        },
        '& *': {
            fontFamily: 'Pretendard !important',
        },
    },
    zoomInZoomOutBox:{
        position: 'fixed',
        bottom: 19,
        right: 24,
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.25)',
        border: '1px solid #bbb',
        background: '#fff',
        borderRadius: 3,
        boxSizing: 'border-box',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        '& button:last-child':{
            marginLeft: 14
        }
    },
    optionBox:{
        marginTop: 15,
    },
    displayFlex:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginTop:{
        marginTop: 20
    },
    translationText:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#f2b705',
            letterSpacing: '-0.39px',
            marginLeft: 6,
            marginRight: 8
        }
    },
    recText: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#d91e50',
            letterSpacing: '-0.39px',
            marginLeft: 6,
            marginRight: 8
        }
    },
    uploadText: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#056cf2',
            letterSpacing: '-0.39px',
            marginLeft: 6,
            marginRight: 8
        }
    },
    labelingText: {
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#3A974C',
            letterSpacing: '-0.39px',
            marginLeft: 6,
            marginRight: 8
        }
    },

    formControl:{
        '& .MuiSelect-select':{
            padding: '2px 25px 2px 13px !important',
            fontSize: '0.875rem',
            width: 150,
            height:'36px !important',
            boxSizing:'border-box',
            color:'rgba(50, 50, 50, 0.6)',
            background: '#fff',
            letterSpacing: '-0.39px',
            display:'flex',
            alignItems: 'center',
            fontWeight: 500,
            overflow:'hidden',
            '& path':{
                stroke: '#fff'
            }
        },
        '& input':{
            fontSize: '0.875rem',
            color:'rgba(50, 50, 50, 0.6)',
            letterSpacing: '-0.39px',
            fontWeight: 500,
        },
        '& .MuiOutlinedInput-notchedOutline':{
            overflow: 'inherit',
            '&::after':{
                content:"''",
                display: 'block',
                width: 35,
                height: 34,
                background:'#323232',
                borderRadius: '0 4.7px 4.7px 0',
                position: 'relative',
                right: -106,
                top: -5
            }
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
            borderRadius: 4.7
        },
        '& .MuiSelect-icon':{
            right:10,
            zIndex: 100000,
            '& path':{
                stroke: '#fff'
            },
        }
    },
    formControlColor:{
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #f2b705',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            '&::after':{
                background:'#f2b705',
            }
        },
    },

    formControlColorUpload:{
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #056CF2',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            '&::after':{
                background:'#056CF2',
            }
        },
    },
    formControlColorInspection:{
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #F25E3D',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            '&::after':{
                background:'#F25E3D',
            }
        },
    },
    formControlColorLabeling:{
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #3A974C',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            '&::after':{
                background:'#3A974C',
            }
        },
    },

    formControlColorRecording:{
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #3A974C',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            '&::after':{
                background:'#d91e50',
            }
        },
    },

    selectPopover:{
        '& .MuiPaper-root':{
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            boxSizing:'border-box',
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
        '& .MuiMenuItem-root':{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color:'#323232',
            padding: '0 12px',
            boxSizing: 'border-box',
            height: 28,
            '&:hover':{
                background: '#eee'
            },
            '&.Mui-selected':{
                background: '#eee'
            },
            '&.Mui-disabled': {
                opacity: 1,
                '& svg':{
                    pointerEvents: 'auto'
                }
            },
            '&:first-child':{
                display:'none'
            }
        }
    },
    formControlLanguage:{
        '& .MuiSelect-select':{
            minWidth: 74,
            padding: '2px 25px 2px 6px !important',
            fontSize: '0.875rem',
            height:26,
            boxSizing:'border-box',
            color:'#323232',
            letterSpacing: '-0.5px',
            display:'flex',
            alignItems: 'center',
            background: '#fff'
        },
        '& input':{
            fontSize: '0.875rem',
            color:'#323232',
            letterSpacing: '-0.5px'
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #f2b705',
            borderRadius: 4
        },
    },
    lightTooltip: {
        '&.MuiTooltip-tooltip':{
            backgroundColor: '#FFFFF5',
            color: '#000',
            border: '1px solid #000',
            fontSize: '0.688rem',
            borderRadius: 0,
            letterSpacing: '-0.5px',
        }
    },
    defaultText: {
        border: '1px dotted #6C5DD3',
        width: 170,
        height: 44,
        background: '#fff',
        '& .MuiTypography-root': {
            fontSize: '1.25rem',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '40px',
            color: '#6C5DD3'
        }
    }
});