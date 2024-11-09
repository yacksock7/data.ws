export const styles = (theme) => ({
    waveText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            margin: '0 8px'
        }
    },
    dateBox:{
        '& .MuiStack-root':{
            paddingTop: 0,
            paddingBottom: 28,
            display:'flex',
            alignItems:'center'
        },
        '& .MuiFormControl-root':{
            minWidth: '145px !important',
            maxWidth: '145px !important',
            margin: 0
        },
        '& .MuiInputBase-root':{
            paddingRight: 0,
            borderRadius: 6
        },
        '& .MuiInputBase-input':{
            height: 30,
            boxSizing: 'border-box',
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            fontWeight: 500,
            padding: '0 11px'
        },
        '& .MuiInputAdornment-root':{
            marginLeft: 0,
            '& .MuiButtonBase-root':{
                padding:0,
                marginRight: 5,
                '&:hover':{
                    background:'transparent'
                }
            },
        },
        '& .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
            border: 'solid 1px #bbbbbb',
            borderRadius: 6
        },
    },
    calendarBox:{
        cursor:'pointer',
        width: 20,
        height: 20,
        marginRight: 5
    },
});