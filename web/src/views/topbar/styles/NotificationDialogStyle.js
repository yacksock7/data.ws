export const styles = (theme) => ({
    root:{
        minWidth:  470,
        boxSizing: 'border-box'
    },
    notificationBox:{
        width: 41,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #056cf2',
        background: 'transparent',
        borderRadius: 4,
        marginRight: 7,
        boxSizing: 'border-box',
        '& p':{
            color: '#056cf2',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1
        }
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1rem',
            color: '#0d0d0d',
            fontWeight: 'bold',
            letterSpacing: '-0.15px',
            marginTop: 10,
            marginBottom: 10
        }
    },
    dateText:{
        '&.MuiTypography-root':{
            fontSize: '0.813rem',
            color: '#0d0d0d',
            letterSpacing: '-0.15px',
            paddingBottom: 5,
            marginBottom: 15,
            borderBottom: '1px solid #c2c2c2',
        }
    },
    scrollBox:{
        width: '100%',
        maxHeight: 150,
        overflowY: 'auto',
        marginBottom: 50,
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#DBDBDB',
            borderRadius: '10px',
            backgroundClip: 'padding-box',
            border: '3px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
            marginTop: 5,
        },
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#0d0d0d',
            letterSpacing: '-0.15px',
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 340,
            height: 41,
            background: '#7500fa',
            boxSizing: 'border-box',
            borderRadius: 5,
            fontSize: '1rem',
            fontWeight: 500,
            color: '#fff',
            '&:hover':{
                background: '#9d4bfb',
            },
        }
    }
});
