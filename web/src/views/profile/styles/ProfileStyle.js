export const styles = (theme) => ({
    root:{
        marginLeft:180,
        maxWidth:1240,
        marginTop: 70,
        minHeight: 'calc(100vh - 70px)',
        padding: '30px 106px',
        boxSizing: 'border-box',
        '@media all and (max-width: 1300px)': {
            justifyContent: 'center'
        },
    },
    titleStyle:{
        '&.MuiTypography-root': {
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#323232',
            marginBottom:40,
        }
    },
    subtitleStyle: {
        '&.MuiTypography-root': {
            fontSize: '0.938rem',
            fontWeight: 600,
            color: '#323232',
            marginBottom: 10,
        }
    },
    content:{
        display:'flex',
    },
    profileImgBox:{
        width:'320px',
        display:'flex',
        justifyContent : 'center',
    },
    avatar:{
        display:'flex',
        alignItems:'center',
        justifyContent : 'center',
        width:155,
        height:155,
        overflow : 'hidden',
        borderRadius:42,
        border:'1px solid #C2C2C2',
        '& > img':{
            width:'100%',
        }
    },
    bodyStyle:{
        '&.MuiTypography-root':{
            fontSize:'1.5rem',
            fontWeight:'600',
        }
    },
    textBtnStyle:{
        '&.MuiButton-root': {
            padding:0,
            fontSize:'1rem',
            fontWeight:400,
            color: '#7500FA',
            textDecoration: 'underline',
            '&:hover':{
                color: '#7500FA',
                textDecoration: 'underline',
                backgroundColor:'transparent',
            },
        }
    },
    activeBtnBox:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:40,
        '& > .MuiButton-text':{
            color:'#B7BCD6',
            fontWeight:300,
            '&:hover':{
                color:'#B7BCD6',
            },
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root':{
            width: 220,
            height: 54,
            background: '#7500fa',
            borderRadius: 6,
            fontSize: '1.25rem',
            color: '#fff',
            letterSpacing: '-0.5px',
            fontWeight: 'bold',
            marginTop: 20,
            '&:hover':{
                background: '#9d4bfb'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
    boxStyle:{
        marginTop:60,
        '& > dl':{
            margin:'1.75rem 0',
        }
    },
    dlStyle:{
        display:'flex',

        color:'#323232',
        '& > dt':{
           minWidth:120,
           fontSize:'1.125rem',
           fontWeight:'600',
        },
        '& > dd':{
            fontSize:'1.25rem',
        }
    },
    dialogBox:{
        '& .MuiDialog-paper':{
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            boxSizing: 'border-box',
            padding: '12px 11px 22px 20px',
            minWidth: 250,
            maxWidth: 1000,
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
    },
});