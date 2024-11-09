export const styles = (theme) => ({
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
        justifyContent: 'flex-end',
        marginRight: 36,
        marginTop: 18
    },
    cancelButton:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            boxSizing: 'border-box',
            padding: '0 25px',
            color: '#140cf2',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            background: 'transparent',
            marginRight: 20,
            '&:hover':{
                background: 'transparent',
            }
        }
    },
    buttonStyle:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
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


    emailDialogBox:{
        '& .MuiDialog-paper':{
            boxShadow: '0 0 7px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: 6,
            background: '#fff',
            boxSizing: 'border-box',
            padding: '4px 15px 22px 30px',
            minWidth: 250,
            maxWidth: 1000,
            width: 325,
            height: 314,
            '& *': {
                fontFamily: 'Pretendard !important',
            },
        },
    },
    emailTitleText: {
        '&.MuiTypography-root':{
            fontSize: '1.25rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            lineHeight: 1.6,
            paddingTop: 18
        }
    },
    emailControlBox: {
        marginRight: 0,
        marginTop: 40,
    },
    emailButtonStyle:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            boxSizing: 'border-box',
            padding: '0 25px',
            background: '#7500FA',
            color: '#fff',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            marginRight: 10,
            '&:hover':{
                background: '#7500FA',
            }
        }
    },

    groupButtonStyle:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            boxSizing: 'border-box',
            padding: '0 25px',
            background: '#7500FA',
            color: '#fff',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            marginRight: 9,
            '&:hover':{
                background: '#7500FA',
            }
        }
    },
    groupCancelButton:{
        '&.MuiButtonBase-root': {
            minWidth: 100,
            height: 40,
            boxSizing: 'border-box',
            padding: '0 25px',
            color: '#323232',
            fontSize: '0.938rem',
            fontWeight: 'bold',
            letterSpacing: '-0.42px',
            background: 'transparent',
            marginRight: 20,
            '&:hover':{
                background: 'transparent',
            }
        }
    },
    groupContentsBox: {
        marginRight: '9px',
    },
    groupControlBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 18
    }

});


