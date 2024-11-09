export const styles = (theme) => ({
    root:{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#eee',
        boxSizing: 'border-box',
        padding: 30,
    },
    boxStyle:{
        minWidth: 640,
        boxShadow: '0 4px 7px 0 rgba(0, 0, 0, 0.25)',
        borderRadius: 14,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 30px',
        boxSizing: 'border-box'
    },
    logoBox:{
        marginBottom: 34,
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '2.125rem',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            color: '#323232',
            marginBottom: 60
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 384,
            height: 58,
            background: '#7500fa',
            borderRadius: 6,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '1.75rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.4,
            marginTop: 30,
            marginBottom: 40,
            '& span':{
                fontWeight: 'bold'
            }
        }
    }
});