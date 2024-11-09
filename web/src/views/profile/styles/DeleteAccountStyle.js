export const styles = (theme) => ({
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        marginLeft:180,
        minHeight: 'calc(100vh - 70px)',
        boxSizing: 'border-box',
        '@media all and (max-width: 1300px)': {
            justifyContent: 'center'
        },
        '& p.MuiTypography-root':{}
    },
    logoBox:{
        marginRight: 30,
        '& path':{
            fill:'#39007a'
        }
    },
    titleStyle:{
        '&.MuiTypography-root':{
            fontSize:'2.125rem',
            fontWeight:'bold',
            margin:'48px 0 35px',
        }
    },
    bodyStyle:{
        '&.MuiTypography-root':{
            fontSize:'1.125rem',
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 340,
            height: 54,
            background: '#7500fa',
            borderRadius: 6,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginTop: 44,
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
});