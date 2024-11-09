export const styles = (theme) => ({
    titleBox:{
        width: 896,
        border: '1px solid #bbbbbb',
        boxShadow:'0 0 4px 0 rgba(0, 0, 0, 0.15)',
        borderRadius: 6,
        background: '#fff',
        padding: '35px 33px',
        boxSizing: 'border-box',
        marginTop: 160
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            color: '#323232',
            fontWeight: 'bold',
            letterSpacing: '-0.5px'
        }
    },
    textareaBox: {
        width: '100%',
        resize: 'none',
        height: 142,
        border: '1px solid rgba(50, 50, 50, 0.8)',
        borderRadius: 6,
        marginTop: 14,
        fontSize: '1.25rem',
        letterSpacing: '-0.5px',
        color: '#323232',
        padding: 14,
        boxSizing: 'border-box',
        lineHeight: 1.4,
        '&:focus': {
            outline: 'none',
        },
        '&::placeholder': {
            color: '#323232',
            opacity: 0.6
        },
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
    textareaBoxError:{
        border: '1px solid #FF0000',
    },
    textareaError:{
        '&.MuiTypography-root': {
            fontSize: '1.25rem',
            color: '#FF0000',
            marginTop: 5,
        }
    },
    buttonBox:{
        display: 'flex',
        justifyContent:'flex-end',
        marginTop: 20
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 240,
            height: 54,
            borderRadius: 7.5,
            background: '#7500fa',
            color: '#fff',
            padding: 0,
            fontSize: '1.125rem',
            fontWeight: 'bold',
            letterSpacing: '-0.63px',
            '&:hover':{
                background: '#9d4bfb',
            },
            '& svg':{
                marginLeft: 8
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    }
});