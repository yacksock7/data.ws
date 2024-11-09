export const styles = (theme) => ({
    root:{
        display: 'flex',
        flexDirection: 'column'
    },
    cardBox:{
        width: '100%',
        borderRadius: 6,
        boxSizing: 'border-box',
        padding: '11px 8px 10px',
        background: '#fff',
        cursor:'pointer',
        marginBottom: 12,
    },
    topBox:{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 26
    },
    stepBox:{
        minWidth: 29,
        height: 18,
        background: '#eee',
        padding: 0,
        marginRight: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& p':{
            color: 'rgba(50, 50, 50, 0.6)',
            fontSize: '0.75rem',
            letterSpacing: '-0.24px'
        },
        '&:last-child':{
            marginRight: 0
        }
    },
    titleText:{
        '&.MuiTypography-root':{
            fontSize: '0.938rem',
            color: '#323232',
            fontWeight: 'bold',
            textAlign: 'left',
            letterSpacing: '-0.5px',
            margin: '12px 5px 2px 26px'
        }
    },
    contentsBox:{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    flexCenter:{
        display: 'flex',
        alignItems: 'center'
    },
    iconBox:{
        marginRight: 8,
        display: 'flex',
        alignItems: 'center'
    },
    iconButton:{
        '&.MuiButtonBase-root': {
            padding: 0,
            '&:hover': {
                background: 'transparent'
            }
        }
    },
    textStyle:{
        '&.MuiTypography-root': {
            fontSize: '0.875rem',
            color: '#777',
            textAlign: 'left',
            letterSpacing: '-0.5px',
        }
    },
    textStyle1:{
        '&.MuiTypography-root': {
            fontSize: '0.75rem',
            marginLeft: 26
        }
    },
    popoverBox:{
        '& li':{
            fontSize: '0.875rem'
        },
        '& *': {
            fontFamily: 'Pretendard !important',
        },
    }
});