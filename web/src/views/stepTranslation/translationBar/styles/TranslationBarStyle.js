export const styles = (theme) => ({
    root:{

    },
    displayFlex:{
        display: 'flex',
        alignItems: 'center',
    },
    buttonTextStyle:{
        '&.MuiTypography-root': {
            fontSize: '1rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            marginRight: 10
        }
    },
    formControl:{
        '&.MuiFormControl-root ':{
            margin: '0 40px 0 10px'
        },
        '& .MuiSelect-select':{
            minWidth: 160,
            height:40,
            padding: '7px 25px 7px 12px !important',
            fontSize: '1rem',
            boxSizing:'border-box',
            color:'#777',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            display:'flex',
            alignItems: 'center',
            background: '#fff',
            border: 'solid 2px #f2b705',
            borderRadius: '6px !important',
            '& span':{
                marginLeft: 3
            }
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 0,
            borderRadius: 6,
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
            fontSize: '1rem',
            color:'#777',
            fontWeight: 'bold',
            boxSizing: 'border-box',
            '& span':{
                marginLeft: 3
            },
            '&:hover':{
                background: '#eee !important'
            },
            '&.Mui-selected':{
                background: '#eee'
            },
        }
    },
    iconMargin:{
        margin: '0 14px',
        display: 'flex',
        alignItems: 'center',
    },
    languageText:{
        '&.MuiTypography-root': {
            fontSize: '1.125rem',
            color: '#056cf2',
            letterSpacing: '-0.5px',
            fontWeight: 500,
        }
    },
});