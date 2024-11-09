export const styles = (theme) => ({
    root:{
        display: 'flex',
        justifyContent:'flex-end',
        position: 'relative',
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover':{
                background: 'transparent'
            }
        }
    },
    tooltipBox:{
        position: 'absolute',
        top: 25,
        right: -20,
        zIndex: 200,
        '& p':{
            fontSize: '0.938rem',
            color: '#fff',
            letterSpacing: '-0.3px'
        },
    },
    tooltipArrow:{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 22
    },
    tooltipBoxIn:{
        position:'relative',
        top: -5,
        borderRadius: 6,
        background: '#4c4851',
        padding: '9px 10px 13px 15px',
        minWidth: 200,
        maxWidth: 290,
        '& ul':{
            margin:0,
            paddingLeft:20,
            paddingRight: 10,
            '& li':{
                fontSize: '0.938rem',
                color: '#fff',
                letterSpacing: '-0.3px',
                marginBottom:5,
                '&::marker':{
                    fontSize: '0.75rem'
                }
            }
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
});


