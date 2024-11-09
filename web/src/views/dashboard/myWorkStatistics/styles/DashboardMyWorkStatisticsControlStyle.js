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
        marginBottom: 30,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    topBox:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color:'#323232',
            letterSpacing: '-0.44px',
        }
    },
    formControl:{
        '&.MuiFormControl-root':{
            '&:last-child':{
                marginLeft: 20
            }
        },
        '& .MuiInputBase-root':{
            width: 140,
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
                right: -97,
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