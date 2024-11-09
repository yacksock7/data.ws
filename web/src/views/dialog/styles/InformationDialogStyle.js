export const styles = (theme) => ({
    dialogBox:{
        '& .MuiDialog-paper':{
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            boxSizing: 'border-box',
            padding: '12px 11px 22px 20px',
            minWidth: 250,
            maxWidth: 430,
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
    },
    titleBox:{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '1.25rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.6,
            paddingTop: 18
        }
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    contentsBox:{
        paddingRight: 36
    },
    controlBox:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 36,
        marginTop: 18
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            width: '100%',
            height: 40,
            borderRadius: 6,
            color: '#fff',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            boxSizing: 'border-box',
            padding: '0 25px',
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
});


