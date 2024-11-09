export const styles = (theme) => ({
    root:{
        width: '100%',
        background: '#fff',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        padding: '10px 24px',
        height: 70,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 200
    },
    logoBox:{
        marginRight: 30,
        '& svg': {
            width: '141px'
        }
        // '& path':{
        //     fill:'#39007a'
        // }
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    titleBox:{
        marginLeft: 30
    },
    editButton:{
        '&.MuiButtonBase-root': {
            minWidth: 30,
            padding:0,
            fontSize: '0.75rem',
            color:'#6C5DD3',
            lineHeight: 1.3,
            textTransform: 'none',
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1.5rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            lineHeight: 1.3,
        }
    },
    saveButton:{
        '&.MuiButtonBase-root': {
            width: 80,
            height: 44,
            padding:0,
            border: '1px solid #7500FA',
            boxSizing: 'border-box',
            borderRadius: 7.5,
            background: '#fff',
            fontSize: '1rem',
            color: '#7500FA',
            fontWeight: 'bold',
            letterSpacing: '-0.5px',
            marginLeft: 16,
            '&:hover':{
                background: 'rgba(117, 0, 250, 0.1)'
            },
            '&.Mui-disabled': {
                color: '#777',
                border: '1px solid #777',
            }
        }
    },
    textField:{
        '&.MuiFormControl-root':{
            margin:0
        },
        '& .MuiInputBase-root':{
            width: 450,
            height: 44,
            borderRadius: 6,
            boxSizing: 'border-box',
            '& input':{
                padding: '10px 13px',
                fontSize: '1rem',
                letterSpacing: '-0.5px',
                fontWeight: 500,
                color: '#323232',
                '&::placeholder':{
                    opacity: 1,
                    color: 'rgba(50, 50, 50, 0.6)'
                }
            }
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline':{
            border: '1px solid #323232'
        }
    },
    iconMargin:{
        '&.MuiButtonBase-root': {
            margin: '0 30px 0 24px'
        }
    },
    buttonStyle:{
        width: 160,
        height: 44,
        background: '#7500fa',
        borderRadius: 7.5,
        display: 'flex',
        alignItems: 'center',
        '&:hover':{
            background: '#9d4bfb'
        },
    },
    buttonBoxIn:{
        '&.MuiButtonBase-root': {
            margin : '0 auto',
            fontSize: '1rem',
            color: '#fff',
            '&:hover':{
                background:'transparent'
            }
        }
    },
    buttonInLine:{
        width: 1,
        height: 24,
        background: '#fff',
        opacity: 0.6
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
    iconButtonBoxIn:{
        '&.MuiButtonBase-root': {
            width: 30,
            height: 44,
            padding:0,
            boxSizing: 'border-box',
            background: 'transparent',
            '&:hover':{
                background: 'transparent'
            },
            '& svg':{
                '& path':{
                    stroke: '#fff'
                }
            }

        }
    },
    popoverBox:{
        '& .MuiPaper-root':{
            width: 198,
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)',
            border: '1px solid #bbb',
            boxSizing: 'border-box',
            '& ul':{
                padding: '8px 0',
                '& li':{
                    fontSize: '1rem',
                    color: '#323232',
                    letterSpacing: '-0.5px',
                    '&:hover':{
                        background: '#eee'
                    },
                }
            },
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        }
    }
});