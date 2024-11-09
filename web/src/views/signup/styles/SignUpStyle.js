export const styles = (theme) => ({
    root:{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#39007A',
        boxSizing: 'border-box',
        padding: 30,
        '@media all and (max-width: 800px)': {
            padding: 10,
        },
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
        boxSizing: 'border-box',
        '@media all and (max-width: 800px)': {
            minWidth: '100%',
            padding: '30px 15px',
        },
    },
    logoBox:{
        marginBottom: 34,
        cursor:'pointer'
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
            },
            '@media all and (max-width: 800px)': {
                width: '100%',
            },
        }
    },
    bottomBox:{
        width: 384,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        '@media all and (max-width: 800px)': {
            width: '100%',
        },
    },
    loginText:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: 'rgba(50, 50, 50, 0.6)',
            letterSpacing: '-0.5px',
            marginRight: 10
        }
    },
    loginButton:{
        '&.MuiButtonBase-root':{
            background: 'transparent',
            padding:0,
            minWidth: 20,
            color: '#323232',
            fontWeight: 'bold',
            textDecoration: 'underline',
            '&:hover':{
                background: 'transparent',
                textDecoration: 'underline',
            }
        }
    }
});