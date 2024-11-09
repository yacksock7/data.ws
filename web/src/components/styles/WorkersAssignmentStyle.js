export const styles = (theme) => ({
    root:{

    },
    workersListBox:{
        width: 300,
        border: '1px solid #777',
        background: '#d9d9d9',
        borderRadius: 6,
        padding:'5px 0 8px 0',
        position: 'relative',
    },
    workersListBoxIn:{
        height: 240,
        boxSizing: 'border-box',
        overflowY: 'scroll',
        padding:'5px 0 0 5px',
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
    listFlex:{
        display: 'flex',
        alignItems: 'center',
        '& svg:nth-child(1)':{
            marginRight: 10
        }
    },
    listText:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#777',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    iconButton:{
        '&.MuiButtonBase-root':{
            padding: 0,
            '&:hover':{
                background: 'transparent'
            },
        }
    },
    checkBox:{
        '&.MuiFormControlLabel-root':{
            margin:'9px 0 0'
        },
        '& .MuiButtonBase-root':{
           padding:0
        },
        '& .MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginLeft: 6
        }
    },
    textStyle:{
        '&.MuiTypography-root':{
            fontSize: '0.875rem',
            color: '#323232',
            letterSpacing: '-0.5px',
            marginTop: 50
        }
    },
    tooltipBox:{
        position: 'absolute',
        top: 110,
        left: -15,
        zIndex: 200,
        width:325
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'center',
    },
    tooltipBoxIn:{
        position:'relative',
        top: -7,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px',
        }
    },
    tooltipTitleBox:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        '& p':{
            fontWeight: 'bold',
        },
    },
    tooltipButton:{
        '&.MuiButtonBase-root': {
            background: '#fff',
            borderRadius: 6,
            width: 80,
            height: 32,
            boxSizing: 'border-box',
            padding: 0,
            marginTop: 12,
            display: 'block',
            fontSize: '0.75rem',
            color: '#4c4851',
            fontWeight: 'bold',
            letterSpacing: '-0.41px',
            '&:hover': {
                background: '#fff'
            },
            '&.Mui-disabled': {
                background: '#777',
                color: '#eee'
            }
        }
    },
});


