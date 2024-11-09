export const styles = (theme) => ({
    root:{
        width: '100%',
        height: 136,
        border: '1px solid #bbb',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: 6,
        background:'#fff',
        padding: '13px 12px 14px',
        boxSizing: 'border-box',
        marginBottom: 11,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    topBox:{
        display:'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
        },
        '& button.Mui-selected': {
            fontWeight: 600,
            color: '#fff',
            opacity: 1,
            boxSizing: 'border-box',
            background: '#7500fa',
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
    dateText:{
        '&.MuiTypography-root':{
            fontSize: '0.813rem',
            color:'#7500fa',
            letterSpacing: '-0.5px',
            marginTop: 6
        }
    },
    chipBox:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        '&:before':{
            content:"''",
            width: 14,
            height: 14,
            borderRadius: '50%',
            background:'#7500fa',
            marginRight: 6
        },
        '& p':{
            fontSize: '0.875rem',
            color:'#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            opacity: 0.6
        }
    },
    chipBoxIncomplete:{
        '&:before':{
            background:'#9d1036',
        },
    },
    chipBoxCreated:{
        '&:before':{
            background:'#dddddd',
        },
    },
    chipBoxRejected:{
        '&:before':{
            background:'#d91e50',
        },
    },
    formControl:{
        '& .MuiInputBase-root':{
            width: 200,
            border: 'solid 1px rgba(50, 50, 50, 0.8)',
            borderRadius: 4.7
        },
        '& .MuiSelect-select':{
            padding: '6px 25px 2px 9px !important',
            fontSize: '0.875rem',
            width: 180,
            height:'36px !important',
            boxSizing:'border-box',
            color:'#323232',
            letterSpacing: '-0.39px',
            fontWeight: 500,
            overflow:'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            '& path':{
                stroke: '#fff'
            },
        },
        '& input':{
            width: 100,
            fontSize: '0.875rem',
            color:'#323232',
            letterSpacing: '-0.39px',
            fontWeight: 500,
            background: 'red',
        },
        '& .MuiOutlinedInput-notchedOutline':{
            overflow: 'inherit',
            '&::after':{
                content:"''",
                display: 'block',
                width: 35,
                height: 36,
                background:'#323232',
                borderRadius: '0 4.7px 4.7px 0',
                position: 'relative',
                right: -156,
                top: -6
            }

        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border:'0'
        },
        '& .MuiSelect-icon':{
            right:10,
            zIndex: 100000,
            '& path':{
                stroke: '#fff'
            },
        }
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
        }
    },
});